import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import '../styles/MainPage.css';
import Cards from "./Cards.jsx";
import Detail from "./Detail.jsx";
import Paginate from "./Paginate.jsx";
import Nav from "./Nav.jsx";
import Form from "./Form.jsx";
import About from "./About.jsx";
import toAvoidKey from '../db/toAvoidKey';
import recipes from '../db/recipes';
import user from '../db/user';
import { addNew , getNew } from '../actions';

function MainPage() {



  const value = useSelector((state) => state.addNew);






  let parsedArr = toAvoidKey.results.map(e => {
    return {
        id: e.id,
        title: e.title,
        summary: e.summary,
        healthScore: e.healthScore,
        analyzedInstructions:
            e.analyzedInstructions[0] ? e.analyzedInstructions[0].steps.map(e=> e.step) : [],
        image: e.image,
        diets: e.diets.map(function(e) {
            if ((e.indexOf(e) !== e.length - 1)) {
                return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
            } else return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
            }), 
        dishTypes: e.dishTypes
    }
  })

  const [isLoading, setIsLoading] = useState({
    main: true,
    refresh: false
  });
  
  function GetAfterCreated () { 
    setIsLoading(isLoading, isLoading.refresh = true)

    if (isLoading) {    
      setIsLoading(isLoading, isLoading.main = false)
    }
  }

  const [foods, setFoods] = useState([]); // ALL MAIN FOODS
  const [diets, setDiets] = useState([]); // ALL MAIN DIETS

  


 useEffect(() => {
    //if(isLoading) {   
      
      setFoods((value).concat(parsedArr))
      setDiets(recipes)   
      setIsLoading(isLoading, isLoading.main = false)
   // }  
  }, [value]); // [] -> MEANS RUN ONCE !

  
  let dietsAndTitleFilter = [] // FIRST INSTANCE ARRAY TO FILTER: 1º DIETS --> 2º TITLE
  let toShow = [] // ARRAY SORTED BY HEALTH LEVEL OR A-Z TO SHOW
 
  

  const [dietName, setDietName] = useState({ 
    name: "All Diets", // FIRST INSTANCE DEFAULT VALUE
  });

  const [titleMatch, setTitleMatch] = useState({ 
    name: "",
  }); 

  const [healthLevel , setHealthLevel] = useState({ // HEALTH LEVEL SELECTED
    name: "More Healthy", // FIRST INSTANCE DEFAULT VALUE
    selected: false // 
  }); 

  const [sortName , setSortName] = useState({ // SORT NAME SELECTED
    name: "A-Z",
    selected: false
  });

  function onFilterID(foodId) {
    let food = foods.filter((c) => parseInt(foodId).toString() === foodId.toString() ? c.id === parseInt(foodId) : c.id === foodId);
    return food[0]   
  }

  const handleDietNameChange = (dietName) => { 
    setDietName({name: dietName});
  }

  const handleTitleMatchChange = (titleMatch) => {
    setTitleMatch({name: titleMatch}); 
  }

  const handleHealthLevelChange = (healthLevel) => {
    setHealthLevel({name: healthLevel, selected: true});
    setSortName({name: "", selected: false}); 
  }

  const handleSortNameChange = (sortName) => {
    setHealthLevel({name: "", selected: false}); 
    setSortName({name: sortName, selected: true}); 
  }

  function onDietAndTitleFilter() {
    if (dietName.name === "All Diets") {
      if (titleMatch.name === "") {
        dietsAndTitleFilter =  foods
      } else {   
        let qq = foods.filter(e => e.title.toLowerCase().includes(titleMatch.name.toLowerCase()))
        dietsAndTitleFilter = qq
      }
    } else {
      if (titleMatch.name === "") {
        console.log("DIET NAME", dietName.name)
        let qq = foods.filter(e => e.diets.includes(dietName.name))
        dietsAndTitleFilter = qq
      } else {
        let qq = foods.filter(e => e.diets.includes(dietName.name))
        let ww = qq.filter(e => e.title.toLowerCase().includes(titleMatch.name.toLowerCase()))
        dietsAndTitleFilter = ww
      }
    }
  }
 
  function onHealthLevelFilter() {
    if (healthLevel.name === "-- select an option --" && healthLevel.selected === false) {
      let qq = dietsAndTitleFilter.sort((a,b) => b.healthScore - a.healthScore);
      toShow = qq
    }
    if (healthLevel.name === "More Healthy" && healthLevel.selected === false) { 
      let qq = dietsAndTitleFilter.sort((a,b) => b.healthScore - a.healthScore);
      toShow = qq
    }
      if (healthLevel.name === "More Healthy" && healthLevel.selected === true) {
        let qq = dietsAndTitleFilter.sort((a,b) => b.healthScore - a.healthScore);
        toShow = qq
      }
      if (healthLevel.name === "Less Healthy" && healthLevel.selected === true) {
        let qq = dietsAndTitleFilter.sort((a,b) => a.healthScore - b.healthScore);
        toShow = qq
      }
  }

  function onSortNameFilter() {
    if (sortName.name === "A-Z" && sortName.selected === true) {
      let qq = dietsAndTitleFilter.sort((a, b) => a.title.localeCompare(b.title))
      toShow = qq
    }

    if (sortName.name === "Z-A" && sortName.selected === true) {
      let qq = dietsAndTitleFilter.sort((a, b) => b.title.localeCompare(a.title))
      toShow = qq
    }
  }   

  Promise.all([onDietAndTitleFilter()])
  .then(onHealthLevelFilter())
  .then(onSortNameFilter())

  
  return isLoading.main ? 
    (<div className="loading">Loading...</div>) :
    (
      <div className='mainPage'>   
        {<Route exact path="/" render={ () => (<Nav diets={diets} foods={foods} 
          handleDietNameChange={handleDietNameChange} handleHealthLevelChange={handleHealthLevelChange} 
          handleSortNameChange={handleSortNameChange} handleTitleMatchChange={handleTitleMatchChange}  />)}
        />} 
        <Route exact path="/" render={ () => (<Paginate />)} /> 
        <Route exact path="/" render={ () => (<Cards toShow={toShow}  />) } />
        <Route exact path="/:foodId" render={() => (<Detail onFilterID={onFilterID} />)}/>
        <Route exact path="/create" render={() => (<Form GetAfterCreated={GetAfterCreated} parsedArr={parsedArr} />)}/>
        <Route exact path="/about" render={ () => (<About />)} /> 
      </div>
    )
}

export default MainPage;
