import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
//import './App.css';
import * as s from './styles/AppSX'
import { Box } from '@mui/material';
import CardsMapper from "./components/CardsMapper/CardsMapper";
import Detail from "./components/Detail/Detail";
import GoBack from "./components/GoBack/GoBack";
import Paginate from "./components/Paginate/Paginate";
import NavBar from "./components/NavBar/NavBar";
import GoUp from "./components/GoUp/GoUp";
import ServerStatus from "./components/ServerStatus/ServerStatus";
import Error from './components/Error/Error';
import MyRecipe from "./components/MyRecipe/MyRecipe";
import About from "./components/About/About";

import { useDispatch } from 'react-redux';
import {
  fetchRecipesFromAPI, allRecipesLoaded,
  setCurrentWidth, setHeight, setLarLand,
  setLarPort, setMedLand, setMedPort, setMinLand,
  setMinPort, setPercentageResizedHeight, setWidth,
  setScrollWidth, setHasScroll, setScrollPosition,
  getDietsFromDB
} from './actions';
import store from './store/store';
import $ from 'jquery';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    function handleResize() {
      dispatch(setWidth(window.screen.width))
      dispatch(setHeight(window.screen.height))
      dispatch(setMinPort(window.screen.width < 425 && window.matchMedia("(orientation: portrait)").matches ? true : false))
      dispatch(setMinLand(window.screen.height < 425 && !window.matchMedia("(orientation: portrait)").matches ? true : false))
      dispatch(setMedPort(window.screen.width >= 425 && window.screen.width <= 825 && window.matchMedia("(orientation: portrait)").matches ? true : false))
      dispatch(setMedLand(window.screen.height >= 425 && window.screen.height <= 825 && !window.matchMedia("(orientation: portrait)").matches ? true : false))
      dispatch(setLarPort(window.screen.width > 825 && window.matchMedia("(orientation: portrait)").matches ? true : false))
      dispatch(setLarLand(window.screen.height > 825 && !window.matchMedia("(orientation: portrait)").matches ? true : false))
      dispatch(setCurrentWidth(window.innerWidth))
      dispatch(setPercentageResizedHeight(window.innerHeight / window.screen.height))
    }
    function scrollHandler() {
      //console.log($(window).scrollTop())
      dispatch(setScrollPosition($(window).scrollTop()!))
    }
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollHandler);
    }
  });

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

  const [ userData, setUserData ] = useState({
    email: '',
    fd_tkn: ''
  })

  console.log("in APP", userData)

  const retrieveLogin = (props: any) => {
    setUserData({ email:props.email, fd_tkn: props.fd_tkn })
  }

  const [ recipeCreated, setRecipeCreated ] = useState({
    saveButtonDisabled: false,
    allDisabled: false
  })

  console.log("recipeCreated recipeCreated", recipeCreated)

  const retrieveRecipeCreated = (props: any) => {
    console.log("SE EJECUTO")
    setRecipeCreated({ saveButtonDisabled: props.saveButtonDisabled, allDisabled: props.allDisabled })
  }

  useEffect(() => {
    console.log("recipeCreated 2", recipeCreated)
  },[retrieveRecipeCreated])

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
      console.log("RES", res)
      setUserData({ email: res.email, fd_tkn: res.fd_tkn })
    })
    .catch(rej => console.log(rej))

  },[])

  return (
    <Box sx={s.background}>
      <Box sx={s.wallpaperBody} />
      <Routes>
        <Route path="/" element={<>
          <ServerStatus />
          <NavBar />
          <Paginate />
          <CardsMapper retrieveLogin={retrieveLogin} userData={userData}/>
          <GoUp />
        </>}/>
        <Route path="/:recipeId" element={<>
          <ServerStatus />
          <GoBack recipeCreated={recipeCreated} />
          <Detail retrieveLogin={retrieveLogin} userData={userData}/>
        </>}/>
        <Route path="/MyRecipe" element={<>
          <ServerStatus />
          <GoBack recipeCreated={recipeCreated} />
          <MyRecipe
            retrieveLogin={retrieveLogin}
            userData={userData}
            retrieveRecipeCreated={retrieveRecipeCreated}
          />
        </>}/>
        <Route path="/about" element={<>
          <ServerStatus />
          <About />
        </>}/>
        <Route path="*" element={<>
          <GoBack recipeCreated={recipeCreated} />
          <Error />
        </>}/>
      </Routes>
    </Box>
  )
}

export default App;
