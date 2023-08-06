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
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import About from "./components/About/About";
import { useDispatch } from 'react-redux';
import {
  fetchRecipesFromAPI, allRecipesLoaded,
  setCurrentWidth, setHeight, setLarLand,
  setLarPort, setMedLand, setMedPort, setMinLand,
  setMinPort, setPercentageResizedHeight, setWidth,
  setScrollWidth, setHasScroll, setScrollPosition
} from './actions';
import store from './store/store';
import $ from 'jquery';

function App() {

  const dispatch = useDispatch()

  //const [ scrollWidth, setScrollWidth ] = useState<number>(0)
  //const [ scrollPosition, setScrollPosition ] = useState<number>(0)

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
      //dispatch(setScrollWidth($(document).width()! - $(window).width()!))
      //dispatch(setHasScroll($(document).width()! > $(window).width()! ? true : false))
    }
    function scrollHandler() {
      //let qq = $(window).scrollTop()
      console.log($(window).scrollTop())
      //$(window).scrollTop() && setScrollPosition($(window).scrollTop()!)
      dispatch(setScrollPosition($(window).scrollTop()!))
      //setScrollPosition(qq!)
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

  

  // useEffect(() => {
  //   function scrollHandler() {
  //     //console.log($(window).scrollTop())
  //     //$(window).scrollTop() && setScrollPosition($(window).scrollTop()!)
  //     //setScrollPosition($(document).scrollTop())
  //   }
  //   window.addEventListener("scroll", scrollHandler);
  //   return () => window.removeEventListener("scroll", scrollHandler);
  // },[]);

  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)

  // useEffect(() => {


  // dispatch(setHasScroll($(document).width()! > $(window).width()! ? true : false))

  // }, [currentWidth, dispatch])

  //console.log("scrollWidth", scrollWidth)

  const [isLoading, setIsLoading] = useState({
    main: true,
    refresh: false
  });

  function GetAfterCreated () {
    setIsLoading({ ...isLoading , refresh : true})

    if (isLoading) {
      setIsLoading({...isLoading , main: false})
    }
  }
      

    try {
      dispatch(fetchRecipesFromAPI());
      //getActualState();
      dispatch(allRecipesLoaded(true))

    } catch(e) {
      console.log(e)
    }

    // useEffect(() => {
    //   console.log("scrollTTop", $(document).scrollTop())
    //   console.log("scrollTop", $(window).scrollTop())

    // },[document])

    //console.log("scrollTop", $('#asd').scrollTop())
    //console.log("scrollTop", $(your_selector).scrollTop())
    //console.log("scrollPosition", scrollPosition)
  
    return (
      <Box sx={s.background}>
        <Box sx={s.wallpaperBody} />
        <Routes>
          <Route path="/" element={<>
            <NavBar />
            <Paginate />
            <CardsMapper />
            <GoUp />
          </>}/>
          <Route path="/:recipeId" element={<>
            <GoBack />
            <Detail />
          </>}/>
          <Route path="/create" element={<>
            <GoBack />
            <CreateRecipe />
          </>}/>
          <Route path="/about" element={<>
            <About />
          </>}/>
        </Routes>
      </Box>
    )
}

export default App;
