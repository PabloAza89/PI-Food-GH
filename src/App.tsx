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
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import About from "./components/About/About";
import { useDispatch } from 'react-redux';
import { 
  fetchRecipesFromAPI, allRecipesLoaded,
  setCurrentWidth, setHeight, setLarLand,
  setLarPort, setMedLand, setMedPort, setMinLand,
  setMinPort, setPercentageResizedHeight, setWidth,
} from './actions';
import store from './store/store';

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

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
  
    return (
      <Box sx={s.background}>
        <Box sx={s.wallpaperBody} />
        <Routes>
          <Route path="/" element={<>
            <NavBar />
            <Paginate />
            <CardsMapper />
          </>}/>
          <Route path="/:recipeId" element={<>
            <GoBack />
            <Detail />
          </>}/>
          <Route path="/create" element={<>
            <GoBack />
            <CreateRecipe /* GetAfterCreated={GetAfterCreated} */ />
          </>}/>
          <Route path="/about" element={<>
            <About />
          </>}/>
        </Routes>
      </Box>
    )
}

export default App;
