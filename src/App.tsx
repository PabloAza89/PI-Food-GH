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
  const landingHidden = useSelector((state: { landingHidden: boolean }) => state.landingHidden)

  const [isLoading, setIsLoading] = useState({
    main: true,
    refresh: false
  });

  const [ userData, setUserData ] = useState<userDataObjI>({
    email: '',
    fd_tkn: ''
  })

  const retrieveLogin = (props: any) => {
    setUserData({ email: props.email, fd_tkn: props.fd_tkn })
  }

  const [ recipeCreatedOrEdited, setRecipeCreatedOrEdited ] = useState<boolean>(false)

  const retrieveRecipeCreatedOrEdited = (response: boolean) => {
    setRecipeCreatedOrEdited(response)
  }

  const [ recipeNotFound, setRecipeNotFound ] = useState<boolean>(false)

  const retrieveRecipeNotFound = (response: boolean) => {
    console.log("SE EJECUTO")
    setRecipeNotFound(response)
  }

  useEffect(() => { // FIRST ONLY-ONE-TIME AUTO-CHECK USER (CHECK USER TOKEN)

    const bc = new BroadcastChannel("test_channel");
    bc.postMessage("This is a test message.");
    bc.onmessage = (event) => {
      console.log("SARARA",event);
    };

    let tabsLS: string | null = localStorage.getItem('tabsLS');

    console.log("UNA SOLA VEZ EJECUTADO")
    const tabID = Math.floor(100000 + Math.random() * 900000)
    

    sessionStorage.setItem('tabID', JSON.stringify(tabID))

    //console.log("asdasdasd",tabsLS && JSON.parse(tabsLS))

    if (!(tabsLS && JSON.parse(tabsLS))) {

      
      //Math.floor(100000 + Math.random() * 900000)
      //localStorage.setItem('tabsLS', '["a"]')
      //let rr = JSON.stringify(Math.floor(100000 + Math.random() * 900000))
      //let rr = Math.floor(100000 + Math.random() * 900000)
      //localStorage.setItem('tabsLS', JSON.stringify([rr]))
      //localStorage.setItem('tabsLS', '["rr"]')
      //localStorage.setItem('tabsLS', '2')

      

      do {
        localStorage.setItem('tabsLS', JSON.stringify([tabID]))
        console.log("TIME 1")
      }
      while (
        !localStorage.getItem('tabsLS')
      )
      console.log("FINISHED")


      
      //sessionStorage.setItem('tabsLS', '["rr"]')
    }
    else {
      //let qq = JSON.parse(tabsLS)//.push("b")
      //let tabsLS: string | null = localStorage.getItem('tabsLS');

      

      do {
        let tabsLS: string | null = localStorage.getItem('tabsLS');

        //console.log("tabsLS tabsLS", typeof JSON.parse(tabsLS!))

        let tabsLSParsed = tabsLS && JSON.parse(tabsLS)

        //let tabIndexInLS = tabsLS && JSON.parse(tabsLS).map((e: any, i: any) => { return e === tabID ? i : undefined }).filter((e: any) => e !== undefined)[0]

        //console.log("checkIndexcheckIndex", checkIndex)

        //tabsLS && tabsLS.splice(checkIndex,1)

        tabsLSParsed.push(tabID)

        localStorage.setItem('tabsLS', JSON.stringify(tabsLSParsed))

        //console.log("UYUYUY", typeof JSON.parse(localStorage.getItem('tabsLS')!)[0]) // === number

        //console.log("TIME 1")
     }
      while (
        //!localStorage.getItem('tabsLS')
        //!(tabsLS && JSON.parse(tabsLS).includes(tabID))
        //(tabsLS && JSON.parse(tabsLS).includes(tabID) !== true)
        //tabsLS && JSON.parse(tabsLS).includes(tabID) !== true
        //tabsLS.includes(tabID)
        !(JSON.parse(localStorage.getItem('tabsLS')!).includes(tabID))
        //JSON.parse(localStorage.getItem('tabsLS')) && JSON.parse(localStorage.getItem('tabsLS')).includes(tabID)
        //JSON.parse(localStorage.getItem('tabsLS')!)
      )

    }

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
    //   //if (recipeCreated.current) clearHandler() // CLEAR FORM: SAVED && FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
    //   console.log("GOING TO ANOTHER COMPONENT")
    // }

    //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    // return () => {
    //   //if (recipeCreated.current) clearHandler() // CLEAR FORM: SAVED && FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
    //   console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    // }

    // return () => {
    //   //if (recipeCreated.current) clearHandler() // CLEAR FORM: SAVED && FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
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
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollHandler);
    }
  },[dispatch]);
  //})

  //.then(() => console.log("asd"))

  // dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
  // dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))

  // console.log("CC window.innerWidth", window.innerWidth)
  // console.log("CC $('body').width()", $('body').width())

  // setTimeout(() => {
  //   dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
  // },1000)

  // useEffect(() => {
  //   return () => {
  //     console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
  //   }
  // })

  window.onbeforeunload = function() { // CLEAR FORM: SAVED && FIRES WHEN WINDOW IS CLOSED OR REFRESH
    // if (recipeCreated.current) {
    //   clearHandler() // RESET ALL FORM
    // }

    // if (!userData.email && landingHiddenLS && JSON.parse(landingHiddenLS)) {
    //   console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    //   localStorage.removeItem('landingHidden');
    // }

    console.log("CLOSED TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")

    let tabsLS: string | null = localStorage.getItem('tabsLS');

    if (tabsLS && JSON.parse(tabsLS)) {
      let qq = JSON.parse(tabsLS)
      if (qq.length === 1) localStorage.removeItem('tabsLS');
      else {
        qq.pop()
        //console.log("RRRR qq", qq)
        //alert(qq)
        localStorage.setItem('tabsLS', JSON.stringify(qq))
      }
    }

  }

  

  //if (document.hasFocus()) console.log("ASD FOCUSED DOCUMENT")

  window.onfocus = function() { // FIRED WHEN TAB IS FOCUSED, CHECK VALID USER
    
    // if (!(newLoginLS && JSON.parse(newLoginLS))) {
    //   console.log("ASD", "FOCUSED")
    //   checkPrevLogin({ retrieveLogin, userData })
      
    // }
      console.log("ASD", "FOCUSED")
      checkPrevLogin({ retrieveLogin, userData })
  }

  console.log("TTTTTT", userData)

  //console.log("ASDASDASD", window.name)

  

  return (
    <div
      className={css.background}
      style={{ overflow: landingHidden ? 'inherit' : 'hidden' }}
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