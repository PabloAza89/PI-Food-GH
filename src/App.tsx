import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Box } from '@mui/material';
import CardsMapper from "./components/CardsMapper/CardsMapper";
import Detail from "./components/Detail.jsx";
import Paginate from "./components/Paginate.jsx";
import NavBar from "./components/NavBar/NavBar";
import Form from "./components/Form.jsx";
import About from "./components/About.jsx";
import toAvoidKey from './db/toAvoidKey.json';
import dietss from './db/diets.json';
import { useDispatch } from 'react-redux';
import { fetchRecipesFromAPI, allRecipesLoaded } from './actions';
import store from './store/store';

function App() {

  //const value = useSelector((state) => state.addNew);
  //const value = useSelector((state: {addNew:any[]}) => state.addNew)
  //const english = useSelector((state: {english:boolean}) => state.english)
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

  // let parsedArr: recipesI[] = []

  let parsedArr = useSelector((state: {getAllRecipes: recipesI[]}) => state.getAllRecipes)
  

  // const getActualState = async () => {
  //   parsedArr = store.getState().allRecipes
  // }

  //dispatch(fetchRecipesFromAPI())

  

  

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
  // const [diets, setDiets] = useState<any>([]); // ALL MAIN DIETS

//   useEffect(() => {
//     //setFoods((value).concat(parsedArr))
//     setFoods([/* value,  */...parsedArr])
//     //setDiets(diets)
//     setIsLoading({...isLoading, main :false})
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   //}, [isLoading, value]); // [] -> MEANS RUN ONCE !
// }, []); // [] -> MEANS RUN ONCE !

  // let dietsAndTitleFilter: any[] = [] // FIRST INSTANCE ARRAY TO FILTER: 1º DIETS --> 2º TITLE
  // let toShow: any[] = [] // ARRAY SORTED BY HEALTH LEVEL OR A-Z TO SHOW

  // const [dietName, setDietName] = useState({
  //   name: "All Diets", // FIRST INSTANCE DEFAULT VALUE
  // });

  const [titleMatch, setTitleMatch] = useState({
    name: "",
  });

  // const [healthLevel , setHealthLevel] = useState({ // HEALTH LEVEL SELECTED
  //   name: "More Healthy", // FIRST INSTANCE DEFAULT VALUE
  //   selected: false //
  // });

  // const [sortName , setSortName] = useState({ // SORT NAME SELECTED
  //   name: "A-Z",
  //   selected: false
  // });

  function onFilterID(foodId:any) {
    let food = foods.filter((c:any) => parseInt(foodId).toString() === foodId.toString() ? c.id === parseInt(foodId) : c.id === foodId);
    return food[0]
  }

  // const handleDietNameChange = (dietName:any) => {
  //   setDietName({name: dietName});
  // }

  const handleTitleMatchChange = (titleMatch:any) => {
    setTitleMatch({name: titleMatch});
  }

  // const handleHealthLevelChange = (healthLevel:any) => {
  //   setHealthLevel({name: healthLevel, selected: true});
  //   setSortName({name: "", selected: false});
  // }

  // const handleSortNameChange = (sortName:any) => {
  //   setHealthLevel({name: "", selected: false});
  //   setSortName({name: sortName, selected: true});
  // }

  // function onDietAndTitleFilter() {
  //   if (dietName.name === "All Diets") {
  //     if (titleMatch.name === "") {
  //       dietsAndTitleFilter =  foods
  //     } else {
  //       let qq = foods.filter((e:any) => e.title.toLowerCase().includes(titleMatch.name.toLowerCase()))
  //       dietsAndTitleFilter = qq
  //     }
  //   } else {
  //     if (titleMatch.name === "") {
  //       let qq = foods.filter((e:any) => e.diets.includes(dietName.name))
  //       dietsAndTitleFilter = qq
  //     } else {
  //       let qq = foods.filter((e:any) => e.diets.includes(dietName.name))
  //       let ww = qq.filter((e:any) => e.title.toLowerCase().includes(titleMatch.name.toLowerCase()))
  //       dietsAndTitleFilter = ww
  //     }
  //   }
  // }

  // function onHealthLevelFilter() {
  //   if (healthLevel.name === "-- select an option --" && healthLevel.selected === false) {
  //     let qq = dietsAndTitleFilter.sort((a,b) => b.healthScore - a.healthScore);
  //     toShow = qq
  //   }
  //   if (healthLevel.name === "More Healthy" && healthLevel.selected === false) {
  //     let qq = dietsAndTitleFilter.sort((a,b) => b.healthScore - a.healthScore);
  //     toShow = qq
  //   }
  //     if (healthLevel.name === "More Healthy" && healthLevel.selected === true) {
  //       let qq = dietsAndTitleFilter.sort((a,b) => b.healthScore - a.healthScore);
  //       toShow = qq
  //     }
  //     if (healthLevel.name === "Less Healthy" && healthLevel.selected === true) {
  //       let qq = dietsAndTitleFilter.sort((a,b) => a.healthScore - b.healthScore);
  //       toShow = qq
  //     }
  // }

  // function onSortNameFilter() {
  //   if (sortName.name === "A-Z" && sortName.selected === true) {
  //     let qq = dietsAndTitleFilter.sort((a, b) => a.title.localeCompare(b.title))
  //     toShow = qq
  //   }

  //   if (sortName.name === "Z-A" && sortName.selected === true) {
  //     let qq = dietsAndTitleFilter.sort((a, b) => b.title.localeCompare(a.title))
  //     toShow = qq
  //   }
  // }

  // Promise.all([onDietAndTitleFilter()])
  // .then(() => onHealthLevelFilter())
  // .then(() => onSortNameFilter())

      
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
  
  
    //console.log("other", toAvoidKey)
    //console.log("other 2", dietss)

    return (
      <Box className='mainPage'>
        <Routes>
          <Route path="/" element={<>
            <NavBar
              /* diets={diets} */
              //foods={foods}
              /* handleDietNameChange={handleDietNameChange} */
              /* handleHealthLevelChange={handleHealthLevelChange} */
              /* handleSortNameChange={handleSortNameChange} */
              handleTitleMatchChange={handleTitleMatchChange}
            />
            {/* <Paginate /> */}
            {/* <Cards toShow={parsedArr}  /> */}
            {/* <Cards toShow={foods}  /> */}
            {/* <Cards toShow={parsedArr}  /> */}
            <CardsMapper />
          </>}/>
          <Route path="/:foodId" element={<>
            <Detail onFilterID={onFilterID} />
          </>}/>
          <Route path="/create" element={<>
            <Form GetAfterCreated={GetAfterCreated} />
          </>}/>
          <Route path="/about" element={<>
            <About />
          </>}/>
        </Routes>
      </Box>
    )
}

export default App;
