import { useState, useEffect, useRef } from "react";
import css from './App.module.css';
import './commons/globalSweetAlert2.css';
import { checkPrevLogin } from './commons/commonsFunc';
import { useSelector } from 'react-redux';
import { Route, Routes, useMatch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import CardsMapper from "./components/CardsMapper/CardsMapper";
import GoogleAuth from './components/GoogleAuth/GoogleAuth';
import Detail from "./components/Detail/Detail";
import GoBack from "./components/GoBack/GoBack";
import Paginate from "./components/Paginate/Paginate";
import NavBar from "./components/NavBar/NavBar";
import GoUp from "./components/GoUp/GoUp";
import ServerStatus from "./components/ServerStatus/ServerStatus";
import Error from './components/Error/Error';
import MyRecipe from "./components/MyRecipe/MyRecipe";
import About from "./components/About/About";
import { userDataI } from './interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { setScrollPosition } from './actions';
import $ from 'jquery';

function App() {

  const dispatch = useDispatch()
  const showHelpBG = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  const landingHiddenState = useSelector((state: { landingHidden: boolean }) => state.landingHidden)
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)

  const [ userData, setUserData ] = useState<userDataI>({
    email: '',
    fd_tkn: ''
  })

  const [ recipeCreatedOrEdited, setRecipeCreatedOrEdited ] = useState<boolean>(false)

  const retrieveRecipeCreatedOrEdited = (response: boolean) => setRecipeCreatedOrEdited(response)

  const tabsArrREF: any = useRef()
  const tabIDREF = useRef(0)
  const castBC = new BroadcastChannel("cast_BC");
  const feedbackBC = new BroadcastChannel("feedback_BC");

  useEffect(() => { // FIRST ONLY-ONE-TIME AUTO-CHECK USER (CHECK USER TOKEN)

    checkPrevLogin({ setUserData, userData })

    feedbackBC.onmessage = (e) => {
      if (e.data.subscribe.length > tabsArrREF.current.subscribe.length) {
      tabsArrREF.current.subscribe = e.data.subscribe
      }
    }

    const tabID = Math.floor(100000 + Math.random() * 900000)
    tabIDREF.current = tabID
    castBC.postMessage({ subscribe: [tabID] });
    tabsArrREF.current = { subscribe: [tabID] }

    castBC.onmessage = (e) => {
      if (e.data.unsubscribe && e.data.unsubscribe.length !== 0) {
        let current = tabsArrREF.current.subscribe
        let incomming = e.data.unsubscribe[0]
        let result = current.filter((e:any) => e !== incomming)
        tabsArrREF.current.subscribe = result
        return
      }
      if (e.data.subscribe && e.data.subscribe.length !== 0 && !e.data.subscribe.includes(tabIDREF.current)) {
        tabsArrREF.current.subscribe.push(e.data.subscribe[0])
        feedbackBC.postMessage({ subscribe: tabsArrREF.current.subscribe})
      }
    };

    sessionStorage.setItem('tabID', JSON.stringify(tabID))

    //console.log("AUTO-CHECK")
    fetch(`${process.env.REACT_APP_SV}/user`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then((res) => res.json())
    .then((res) => {
      //console.log("RES APP", res)
      setUserData({ email: res.email, fd_tkn: res.fd_tkn })
    })
    .catch(rej => console.log(rej))
  },[])

  useEffect(() => { // FIRED WHEN WINDOW IS CLOSED OR REFRESH
    const onBeforeUnload = () => {
      castBC.postMessage({ unsubscribe: [tabIDREF.current] })
      if (tabsArrREF.current.subscribe.length === 1) localStorage.removeItem('landingHidden')
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  },[])

  window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER
    checkPrevLogin({ setUserData, userData })
    console.log("FOCUSED FOCUSED APP APP APP")
  }

  let { width, height } = window.screen
  let orientation = window.matchMedia("(orientation: portrait)").matches
  const [ paginateAmount, setPaginateAmount ] = useState<number>(((width < 425 && orientation) || (height < 425 && !orientation)) ? 45 : 90)

  useEffect(() => {
    function handleResize() {
      let { width, height } = window.screen
      let orientation = window.matchMedia("(orientation: portrait)").matches
      if ((width < 425 && orientation) || (height < 425 && !orientation)) setPaginateAmount(45)
      else setPaginateAmount(90)
    }
    function scrollHandler() { dispatch(setScrollPosition($(window).scrollTop() as number)) }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollHandler);
    }
  })

  let root = document.getElementById('root')
  root && (
  landingHiddenState ? // HIDES LANDING OVERFLOW
  root.style.overflowY = "unset" :
  root.style.overflowY = "hidden" )

  return (
    <div className={css.background}>
      <div
        className={css.wallpaperNav}
        style={{
          display: showHelpBG ? 'flex' : 'none',
          clipPath: menuShown ? 'polygon(0% 0, 100% 0%, 100% 150px, 0 150px)' : 'polygon(0% 0, 100% 0%, 100% 100px, 0 100px)'
        }}
      />
      <div className={css.wallpaperBody} />
      <Landing setUserData={setUserData} userData={userData} />
      <Routes>
        <Route path="/" element={<>
          <GoogleAuth
            paginateAmount={paginateAmount}
            setUserData={setUserData}
            userData={userData}
          />
          <ServerStatus />
          <NavBar />
          <Paginate paginateAmount={paginateAmount} />
          <CardsMapper
            paginateAmount={paginateAmount}
            setUserData={setUserData}
            userData={userData}
          />
          <GoUp />
        </>}/>
        <Route path="/:recipeId" element={<>
          <NavBar />
          <GoogleAuth
            paginateAmount={paginateAmount}
            setUserData={setUserData}
            userData={userData}
          />
          <ServerStatus />
          <Detail
            setUserData={setUserData}
            userData={userData}
          />
        </>}/>
        <Route path="/MyRecipe" element={<>
          <NavBar
            paginateAmount={paginateAmount}
            recipeCreatedOrEdited={recipeCreatedOrEdited}
          />
          <GoogleAuth
            paginateAmount={paginateAmount}
            setUserData={setUserData}
            userData={userData}
          />
          <ServerStatus />
          <MyRecipe
            paginateAmount={paginateAmount}
            setUserData={setUserData}
            userData={userData}
            retrieveRecipeCreatedOrEdited={retrieveRecipeCreatedOrEdited}
            recipeCreatedOrEdited={recipeCreatedOrEdited}
          />
        </>}/>
        <Route path="/About" element={<>
          <About />
        </>}/>
        <Route path="/*" element={<>
          <GoBack />
          <Error />
        </>}/>
      </Routes>
    </div>
  )
}

export default App;