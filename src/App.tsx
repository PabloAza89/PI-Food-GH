import { useState, useEffect, useRef } from "react";
import css from './App.module.css';
import './commons/globalSweetAlert2.css';
import { checkPrevLogin } from './commons/commonsFunc';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
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
import { userDataObjI } from './interfaces/interfaces';
import { useDispatch } from 'react-redux';
import {
  fetchRecipesFromAPI, allRecipesLoaded,
  setCurrentWidth, setHeight, setPercentageResizedHeight, setWidth,
  setScrollWidth, setHasScroll, setScrollPosition,
  getDietsFromDB, viewPort, landingHidden, /* multiple */
} from './actions';
import store from './store/store';
import $ from 'jquery';

function App() {

  const dispatch = useDispatch()
  const showHelpBG = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)
  const landingHiddenState = useSelector((state: { landingHidden: boolean }) => state.landingHidden)

  useEffect(() => {
    $(function() {
      var scrollDiv = document.createElement("div"); // Creates the div
      scrollDiv.className = "scrollbar-measure";
      document.body.appendChild(scrollDiv);
      $(`.scrollbar-measure`)
        .css("overflowY", "scroll") // Creates a ScrollBar
        .css("width", "fit-content") // Set width to auto considering the ScrollBar width
      typeof scrollDiv.offsetWidth === 'number' ? dispatch(setScrollWidth(scrollDiv.offsetWidth)) : dispatch(setScrollWidth(0))
      document.body.removeChild(scrollDiv); // Delete the div
    })
  },[dispatch])

  const [isLoading, setIsLoading] = useState({
    main: true,
    refresh: false
  });

  const [ userData, setUserData ] = useState<userDataObjI>({
    email: '',
    fd_tkn: ''
  })

  const retrieveLogin = (props: any) => setUserData({
    email: props.email,
    fd_tkn: props.fd_tkn
  })

  const [ recipeCreatedOrEdited, setRecipeCreatedOrEdited ] = useState<boolean>(false)

  const retrieveRecipeCreatedOrEdited = (response: boolean) => setRecipeCreatedOrEdited(response)

  const tabsArrREF: any = useRef()
  const tabIDREF = useRef(0)
  const castBC = new BroadcastChannel("cast_BC");
  const feedbackBC = new BroadcastChannel("feedback_BC");

  useEffect(() => { // FIRST ONLY-ONE-TIME AUTO-CHECK USER (CHECK USER TOKEN)

    checkPrevLogin({ retrieveLogin, userData })

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

    console.log("AUTO-CHECK")
    fetch(`http://localhost:3001/user`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log("RES APP", res)
      setUserData({ email: res.email, fd_tkn: res.fd_tkn })
    })
    .catch(rej => console.log(rej))

    // return () => {
    //   //if (recipeCreated.current) clearHandler() // FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
    // }
  },[])

  // let windowScreenWidth = window.screen.width
  // let windowScreenHeight = window.screen.height

  useEffect(() => {
    console.log("target ejecutado")
    console.log("target ejecutado window.screen.width", window.screen.width)
    //console.log("target ejecutado window.innerWidth", window.innerWidth)
    function scrollHandler() { dispatch(setScrollPosition($(window).scrollTop() as number)) }
    function handleResize() {
      let windowScreenWidth = window.screen.width
      let windowScreenHeight = window.screen.height
      //let windowInnerWidth = window.innerWidth
      if (window.matchMedia("(orientation: portrait)").matches) {
        if (windowScreenWidth < 425) dispatch(viewPort(`smaPort`))
        else if (windowScreenWidth > 825) dispatch(viewPort(`larPort`))
        else dispatch(viewPort(`medPort`))
      } else {
        if (windowScreenHeight < 425) dispatch(viewPort(`smaLand`))
        else if (windowScreenHeight > 825) dispatch(viewPort(`larLand`))
        else dispatch(viewPort(`medLand`))
      }
    }
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", handleResize);
    }
  //},[dispatch]);
  },[window.screen.width]);

  // useEffect(() => {
  //   console.log("target ejecutado window.screen.width", window.screen.width)
  // })
  

  useEffect(() => {
    // console.log("target ejecutado")
    // console.log("target ejecutado window.screen.width", window.screen.width)
    
    let windowScreenWidth = window.screen.width
    let windowScreenHeight = window.screen.height
    //let windowInnerWidth = window.innerWidth
    if (window.matchMedia("(orientation: portrait)").matches) {
      if (windowScreenWidth < 425) dispatch(viewPort(`smaPort`))
      else if (windowScreenWidth > 825) dispatch(viewPort(`larPort`))
      else dispatch(viewPort(`medPort`))
    } else {
      if (windowScreenHeight < 425) dispatch(viewPort(`smaLand`))
      else if (windowScreenHeight > 825) dispatch(viewPort(`larLand`))
      else dispatch(viewPort(`medLand`))
    }
  },[]);

  useEffect(() => {
    dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
  })

  useEffect(() => { // FIRED WHEN WINDOW IS CLOSED OR REFRESH
    const onBeforeUnload = () => {
      castBC.postMessage({ unsubscribe: [tabIDREF.current] })
      if (tabsArrREF.current.subscribe.length === 1) localStorage.removeItem('landingHidden')
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  },[])

  window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER
    checkPrevLogin({ retrieveLogin, userData })
  }

  return (
    <div
      className={css.background}
      style={{ overflow: landingHiddenState ? 'inherit' : 'hidden' }}
    >
      <Landing retrieveLogin={retrieveLogin} userData={userData} />
      <div
        className={css.wallpaperNav}
        style={{ display: showHelpBG ? 'flex' : 'none' }}
      />
      <div className={css.wallpaperBody} />
      <Routes>
        <Route path="/" element={<>
          <GoogleAuth retrieveLogin={retrieveLogin} userData={userData} />
          <ServerStatus />
          <NavBar />
          <Paginate />
          <CardsMapper retrieveLogin={retrieveLogin} userData={userData} />
          <GoUp />
        </>}/>
        <Route path="/:recipeId" element={<>
          <NavBar />
          <GoogleAuth retrieveLogin={retrieveLogin} userData={userData} />
          <ServerStatus />
          {/* <GoBack recipeNotFound={recipeNotFound} /> */}
          <Detail
            retrieveLogin={retrieveLogin}
            userData={userData}
          />
        </>}/>
        <Route path="/MyRecipe/" element={<>
          <NavBar recipeCreatedOrEdited={recipeCreatedOrEdited} />
          <GoogleAuth retrieveLogin={retrieveLogin} userData={userData} />
          <ServerStatus />
          {/* <GoBack recipeCreatedOrEdited={recipeCreatedOrEdited} /> */}
          <MyRecipe
            retrieveLogin={retrieveLogin}
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