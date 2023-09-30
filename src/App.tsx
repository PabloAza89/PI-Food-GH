import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import * as s from './styles/AppSX';
import { Box } from '@mui/material';
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
  setCurrentWidth, setHeight, setLarLand,
  setLarPort, setMedLand, setMedPort, setSmaLand,
  setSmaPort, setPercentageResizedHeight, setWidth,
  setScrollWidth, setHasScroll, setScrollPosition,
  getDietsFromDB
} from './actions';
import store from './store/store';
import $ from 'jquery';

function App() {

  const dispatch = useDispatch()

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
  },[])


  // useEffect(() => {
  //   function scrollHandler () { dispatch(setScrollPosition($(window).scrollTop()!)) }
  //   window.addEventListener("scroll", scrollHandler);
  //   return () => window.removeEventListener("scroll", scrollHandler);
  // },[]);

  //let qq = new ResizeObserver(el => {
  // new ResizeObserver(el => {
  //   //console.log('TT width', el[0])
  //   //console.log('TT width', el[0].contentRect.width)
  //   //console.log('TT height', el[0].contentRect.height)
  //   let windowScreenWidth = window.screen.width
  //   let windowScreenHeight = window.screen.height
  //   let windowMatchMediaPortrait = window.matchMedia("(orientation: portrait)").matches
  //   let windowInnerWidth = window.innerWidth
  //   let windowInnerHeight = window.innerHeight
  //   dispatch(setWidth(windowScreenWidth))
  //   dispatch(setHeight(windowScreenHeight))
  //   dispatch(setSmaPort(windowScreenWidth < 425 && windowMatchMediaPortrait ? true : false)) // Port = Portrait
  //   dispatch(setSmaLand(windowScreenHeight < 425 && !windowMatchMediaPortrait ? true : false)) // Land = Landscape
  //   dispatch(setMedPort(windowScreenWidth >= 425 && windowScreenWidth <= 825 && windowMatchMediaPortrait ? true : false))
  //   dispatch(setMedLand(windowScreenHeight >= 425 && windowScreenHeight <= 825 && !windowMatchMediaPortrait ? true : false))
  //   dispatch(setLarPort(windowScreenWidth > 825 && windowMatchMediaPortrait ? true : false))
  //   dispatch(setLarLand(windowScreenHeight > 825 && !windowMatchMediaPortrait ? true : false))
  //   dispatch(setCurrentWidth(windowInnerWidth))
  //   dispatch(setPercentageResizedHeight(windowInnerHeight / windowScreenHeight))
  //   //dispatch(setScrollPosition($(window).scrollTop()!))

  //   //function scrollHandler() { dispatch(setScrollPosition($(window).scrollTop()!)) }

  //   dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
  // }).observe(document.querySelector('body')!);

  //qq.observe(document.querySelector('body') as Element);

  // new ResizeObserver(el => {
  //   console.log('WW width', el[0])
  //   //console.log('TT width', el[0].contentRect.width)
  //   //console.log('TT height', el[0].contentRect.height)
  // }).observe(document.getElementById(window) as Element);

  useEffect(() => {
    function handleResize() {
      let windowScreenWidth = window.screen.width
      let windowScreenHeight = window.screen.height
      let windowMatchMediaPortrait = window.matchMedia("(orientation: portrait)").matches
      let windowInnerWidth = window.innerWidth
      let windowInnerHeight = window.innerHeight
      dispatch(setWidth(windowScreenWidth))
      dispatch(setHeight(windowScreenHeight))
      dispatch(setSmaPort(windowScreenWidth < 425 && windowMatchMediaPortrait ? true : false)) // Port = Portrait
      dispatch(setSmaLand(windowScreenHeight < 425 && !windowMatchMediaPortrait ? true : false)) // Land = Landscape
      dispatch(setMedPort(windowScreenWidth >= 425 && windowScreenWidth <= 825 && windowMatchMediaPortrait ? true : false))
      dispatch(setMedLand(windowScreenHeight >= 425 && windowScreenHeight <= 825 && !windowMatchMediaPortrait ? true : false))
      dispatch(setLarPort(windowScreenWidth > 825 && windowMatchMediaPortrait ? true : false))
      dispatch(setLarLand(windowScreenHeight > 825 && !windowMatchMediaPortrait ? true : false))
      dispatch(setCurrentWidth(windowInnerWidth))
      dispatch(setPercentageResizedHeight(windowInnerHeight / windowScreenHeight))
      dispatch(setHasScroll(windowInnerWidth !== $('body').width() ? true : false))
    }
    function scrollHandler() { dispatch(setScrollPosition($(window).scrollTop()!)) }
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollHandler);
    }
  },[]);

  return (
    <Box sx={s.background}>
      <Box sx={s.wallpaperBody} />
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
          <GoogleAuth retrieveLogin={retrieveLogin} userData={userData} />
          <ServerStatus />
          <GoBack recipeNotFound={recipeNotFound} />
          <Detail
            retrieveLogin={retrieveLogin}
            userData={userData}
            retrieveRecipeNotFound={retrieveRecipeNotFound}
          />
        </>}/>
        <Route id={'abcabc'} path="/MyRecipe" element={<>
          <GoogleAuth retrieveLogin={retrieveLogin} userData={userData} />
          <ServerStatus />
          <GoBack recipeCreatedOrEdited={recipeCreatedOrEdited} />
          <MyRecipe
            retrieveLogin={retrieveLogin}
            userData={userData}
            retrieveRecipeCreatedOrEdited={retrieveRecipeCreatedOrEdited}
          />
        </>}/>
        <Route path="/About" element={<>
          <About />
        </>}/>
        <Route path="*" element={<>
          <GoBack />
          <Error />
        </>}/>
      </Routes>
    </Box>
  )
}

export default App;