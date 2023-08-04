import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
//import './App.css';
import * as s from './styles/AppSX'
import { Box } from '@mui/material';
import CardsMapper from "./components/CardsMapper/CardsMapper";
import Detail from "./components/Detail.jsx";
import Paginate from "./components/Paginate/Paginate";
import NavBar from "./components/NavBar/NavBar";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import About from "./components/About/About";
import { useDispatch } from 'react-redux';
import { fetchRecipesFromAPI, allRecipesLoaded } from './actions';
import store from './store/store';

function App() {

  const dispatch = useDispatch()

  interface recipesI {
    id: any,
    title: any,
    diets: any,
    healthScore: any,
    summary: any,
    analyzedInstructions: any,
    image: any,
    dishTypes: any,
  }

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

  const [foods, setFoods] = useState<any>([]); // ALL MAIN FOODS


  const [titleMatch, setTitleMatch] = useState({
    name: "",
  });



  function onFilterID(foodId:any) {
    let food = foods.filter((c:any) => parseInt(foodId).toString() === foodId.toString() ? c.id === parseInt(foodId) : c.id === foodId);
    return food[0]
  }


  const handleTitleMatchChange = (titleMatch:any) => {
    setTitleMatch({name: titleMatch});
  }
      
    // ALL DIETS
    // "All Diets"
    // "Gluten Free"
    // "Ketogenic"
    // "Vegan"
    // "Lacto Ovo Vegetarian"
    // "Pescatarian"
    // "Paleolithic"
    // "Primal"
    // "Fodmap Friendly"
    // "Whole 30"
    // "Dairy Free"
      
    // Promise.all([dispatch(fetchRecipesFromAPI())])
    // .then(() => getActualState())

    try {
      dispatch(fetchRecipesFromAPI());
      //getActualState();
      dispatch(allRecipesLoaded(true))

    } catch(e) {
      console.log(e)
    }
  
    return (
      <Box sx={s.background}>
        <Routes>
          <Route path="/" element={<>
            <NavBar />
            <Paginate />
            <CardsMapper />
          </>}/>
          <Route path="/:foodId" element={<>
            <Detail onFilterID={onFilterID} />
          </>}/>
          <Route path="/create" element={<>
            <CreateRecipe GetAfterCreated={GetAfterCreated} />
          </>}/>
          <Route path="/about" element={<>
            <About />
          </>}/>
        </Routes>
      </Box>
    )
}

export default App;
