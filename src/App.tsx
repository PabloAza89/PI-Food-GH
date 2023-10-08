import { useState, useEffect, useRef } from "react";
import css from './App.module.css';
import './commons/globalSweetAlert2.css';
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
  getDietsFromDB, viewPort, landingShown
} from './actions';
import store from './store/store';
import $ from 'jquery';

function App() {

  const dispatch = useDispatch()

  //let landHiddenLS: string | null = localStorage.getItem('landHidden');
  //if (landHiddenLS && JSON.parse(landHiddenLS)) dispatch(landingShown(true))

  const location = useLocation()
  const showHelpBG = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]

  let landHiddenLS: string | null = localStorage.getItem('landHidden');
  
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
  const landingShown = useSelector((state: { landingShown: boolean }) => state.landingShown)

  const [isLoading, setIsLoading] = useState({
    main: true,
    refresh: false
  });

  // function GetAfterCreated () {
  //   setIsLoading({ ...isLoading , refresh : true})

  //   if (isLoading) {
  //     setIsLoading({...isLoading , main: false})
  //   }
  // }

  const [ userData, setUserData ] = useState<userDataObjI>({
    email: '',
    fd_tkn: ''
  })

  const retrieveLogin = (props: any) => {
    setUserData({ email:props.email, fd_tkn: props.fd_tkn })
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

  useEffect(() => {
    fetch(`http://localhost:3001/user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        email: userData.email,
        fd_tkn: userData.fd_tkn
      })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log("RES APP", res)
      setUserData({ email: res.email, fd_tkn: res.fd_tkn })
    })
    .catch(rej => console.log(rej))

    //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    // return () => {
    //   //if (recipeCreated.current) clearHandler() // CLEAR FORM: SAVED && FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
    //   console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
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
    if (!userData.email && landHiddenLS && JSON.parse(landHiddenLS)) {
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
      localStorage.removeItem('landHidden');
    }
    
    
  }

  return (
    <div 
      className={css.background}
      style={{ overflow: landingShown ? 'hidden' : 'inherit' }}
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