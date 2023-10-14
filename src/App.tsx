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
  getDietsFromDB, viewPort, landingHidden
} from './actions';
import store from './store/store';
import $ from 'jquery';

function App() {

  

  // useEffect(() => {

  //   console.log("ASDASDASD typeof window.name" , window.name)

  // if (window.name === "") {
  //   console.log("ASDASDASD IS THE FIRST")
  //   window.name = "myWindow"
  // } else {
  //   console.log("ASDASDASD OTHER OPEN")
  // }

  // },[])

  //if (window.name === "myWindow") console.log("ASD ASD ASD IS THE FIRST")

  //window.name = "myWindow";

  //if (window.name === "myWindow") console.log("ASD ASD ASD OTHER OPEN")

  

  const dispatch = useDispatch()

  

  //let landHiddenLS: string | null = localStorage.getItem('landHidden');
  //if (landHiddenLS && JSON.parse(landHiddenLS)) dispatch(landingShown(true))

  const location = useLocation()
  const showHelpBG = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]

  let landingHiddenLS: string | null = localStorage.getItem('landingHidden');
  let newLoginLS: string | null = localStorage.getItem('newLogin');

  //console.log(`LLRR showHelpNavbar`, showHelpBG)

  // useEffect(() => {
  //   function checkUserData() {
  //     //const item = localStorage.getItem('userData')
  //     if (landingHiddenLS && JSON.parse(landingHiddenLS)) dispatch(landingHidden(true))
  //     // if (item) {
  //     //   setUserData(item)
  //     // }
  //   }
  
  //   window.addEventListener('storage', checkUserData)
  
  //   return () => {
  //     window.removeEventListener('storage', checkUserData)
  //   }
  // }, [dispatch, landingHiddenLS])

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

  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)
  const landingHiddenState = useSelector((state: { landingHidden: boolean }) => state.landingHidden)

  const [isLoading, setIsLoading] = useState({
    main: true,
    refresh: false
  });

  const [ userData, setUserData ] = useState<userDataObjI>({
    email: '',
    fd_tkn: ''
  })

  const retrieveLogin = (props: any) => setUserData({ email: props.email, fd_tkn: props.fd_tkn })

  const [ recipeCreatedOrEdited, setRecipeCreatedOrEdited ] = useState<boolean>(false)

  const retrieveRecipeCreatedOrEdited = (response: boolean) => setRecipeCreatedOrEdited(response)

  const [ recipeNotFound, setRecipeNotFound ] = useState<boolean>(false)

  const retrieveRecipeNotFound = (response: boolean) => setRecipeNotFound(response)

  const tabsArrREF: any = useRef()
  const tabIDREF = useRef(0)
  const castBC = new BroadcastChannel("cast_BC");
  const feedbackBC = new BroadcastChannel("feedback_BC");

  useEffect(() => { // FIRST ONLY-ONE-TIME AUTO-CHECK USER (CHECK USER TOKEN)

    checkPrevLogin({ retrieveLogin, userData })

    feedbackBC.onmessage = (e) => {
      console.log("FEEDBACK DE DEVOLUCION", e.data)
      if (e.data.subscribe.length > tabsArrREF.current.subscribe.length) {
      tabsArrREF.current.subscribe = e.data.subscribe
      console.log("tabsArrREF ACTUAL", tabsArrREF.current.subscribe)
      }
    }

    const tabID = Math.floor(100000 + Math.random() * 900000)

    tabIDREF.current = tabID

    castBC.postMessage({ subscribe: [tabID] });

    tabsArrREF.current = { subscribe: [tabID] }

    castBC.onmessage = (e) => {
      console.log(" aver que llega", e.data)
      if (e.data.unsubscribe && e.data.unsubscribe.length !== 0) {
        console.log("ENTRO ACA UNSUBSCRIBE")
        let rr = tabsArrREF.current.subscribe
        let qq = e.data.unsubscribe[0]
        let ss = rr.filter((e:any) => e !== qq)
        console.log("RRRRRRRRRRRRR 1", tabsArrREF.current.subscribe)
        console.log("RRRRRRRRRRRRR 2", e.data.unsubscribe[0])
        console.log("RRRRRRRRRRRRR 3", ss)

        tabsArrREF.current.subscribe = ss

        return console.log("ACTUAL UNSUBSCRIBE", tabsArrREF.current.subscribe)
      }

      if (e.data.subscribe && e.data.subscribe.length !== 0 && !e.data.subscribe.includes(tabIDREF.current)) {
        tabsArrREF.current.subscribe.push(e.data.subscribe[0])
        console.log("tabsArrREF.current ADENTRO", tabsArrREF.current)
        feedbackBC.postMessage({ subscribe: tabsArrREF.current.subscribe})
      }

      console.log("SARARA 0 ", tabsArrREF.current);
    };

    console.log("PRIMER CURRENT", tabsArrREF.current)

    let tabsLS: string | null = localStorage.getItem('tabsLS');

    console.log("UNA SOLA VEZ EJECUTADO")

    sessionStorage.setItem('tabID', JSON.stringify(tabID))

    console.log("AUTO-CHECK")
    fetch(`http://localhost:3001/user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      // body: JSON.stringify({
      //   email: userData.email,
      //   fd_tkn: userData.fd_tkn
      // })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log("RES APP", res)
      setUserData({ email: res.email, fd_tkn: res.fd_tkn })
    })
    .catch(rej => console.log(rej))

    // return () => {
    //   //if (recipeCreated.current) clearHandler() // FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
    //   console.log("CLOSED TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    // }

  },[])

  useEffect(() => {
    function handleResize() {
      let windowScreenWidth = window.screen.width
      let windowScreenHeight = window.screen.height
      let windowInnerWidth = window.innerWidth
      dispatch(setWidth(windowScreenWidth))
      dispatch(setHeight(windowScreenHeight))
      dispatch(setCurrentWidth(windowInnerWidth))
      dispatch(setPercentageResizedHeight(window.innerHeight / windowScreenHeight))
      dispatch(setHasScroll(windowInnerWidth !== $('body').width() ? true : false))
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
    function scrollHandler() { dispatch(setScrollPosition($(window).scrollTop() as number)) }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollHandler);
    }
  },[dispatch]);


  window.onbeforeunload = function(event) { // FIRES WHEN WINDOW IS CLOSED OR REFRESH
    //let rr = tabsArrREF.current.subscribe
    //let ss = rr.filter((e:any) => e !== tabIDREF.current)
    castBC.postMessage({ unsubscribe: [tabIDREF.current] })
    console.log("LAST TAB DATA", tabsArrREF.current.subscribe)
    //if (tabsArrREF.current.subscribe.length === 1) return ""
    if (tabsArrREF.current.subscribe.length === 1) localStorage.removeItem('landingHidden')
  }

  //if (document.hasFocus()) console.log("ASD FOCUSED DOCUMENT")

  window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER 
    console.log("FOCUSED APP")
    checkPrevLogin({ retrieveLogin, userData })
    //if (landingHiddenLS && JSON.parse(landingHiddenLS)) dispatch(landingHidden(true))
  }

  console.log("TTTTTT", userData)

  return (
    <div
      //id={`focusTarget`}
      className={css.background}
      style={{ overflow: landingHiddenState ? 'inherit' : 'hidden' }}
    >
      <Landing retrieveLogin={retrieveLogin} userData={userData} />
      <div
        className={css.wallpaperNav}
        style={{
          display: showHelpBG ? 'flex' : 'none',
          /* overflow: 'hidden' */
        }}
      />
      <div
        className={css.wallpaperBody}
        /* style={{
          overflow: 'hidden'
        }} */
      />
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
            retrieveRecipeNotFound={retrieveRecipeNotFound}
          />
        </>}/>
        <Route path="/MyRecipe/" element={<>
          <NavBar />
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