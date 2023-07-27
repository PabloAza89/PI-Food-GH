import React, { useState } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { setIndexChoosen } from '../../actions';
import dietss from '../../db/diets.json';
//import Select, { SelectChangeEvent } from '@mui/material/Select';

interface NavBarI {
  diets:any , /* foods:any, */ handleTitleMatchChange:any , handleDietNameChange:any, handleHealthLevelChange:any, handleSortNameChange:any
}

export default function Nav({diets , /* foods, */ handleTitleMatchChange , handleDietNameChange, handleHealthLevelChange, handleSortNameChange}: NavBarI) {

  const dispatch = useDispatch()

  const allRecipesLoaded = useSelector((state: {allRecipesLoaded: boolean}) => state.allRecipesLoaded)

  const [healthLevel, setHealthLevel] = useState<string>('');
  const [sortAZ, setSortAZ] = useState<string>('');
  const [typeOfDiet, setTypeOfDiet] = useState<string>('All Diets');

  const healthLevelHandler = (event: SelectChangeEvent) => {
    setSortAZ('' as string);
    setHealthLevel(event.target.value as string);
  };

  const sortAZHandler = (event: SelectChangeEvent) => {
    setHealthLevel('' as string);
    setSortAZ(event.target.value as string);
  };

  const typeOfDietHandler = (event: SelectChangeEvent) => {
    setTypeOfDiet(event.target.value as string);
  };

  let [healthSelected, setHealthSelected] = useState<any>("")
  let [aZSelected, setAZSelected] = useState<any>("")

  const [foodSearch, setFoodSearch] = useState("");


  // function defaultPaginateColor () {
  //   return document.getElementById(0) && document.getElementById(0).style.background='rgba(46, 230, 163, 0.377)'
  // }


  //console.log("test", allRecipesLoaded)
  console.log("test", healthLevel)
  //console.log("AA", diets.map((e:any) => e.title))
  //console.log("AA", JSON.parse(diets))
  console.log("AA", dietss)
  
  

  return (
   <div className='main-nav-div'>
      <div className="main-left">
        <Link className="iconImage" to="/PI-Food-GH">
          <img  className="iconImage" src={logo} alt=""></img>
        </Link>
      </div>
      <Link id="iconText" to="/PI-Food-GH">
        <h2>Foodify !</h2>
      </Link>
      <div className="main-right">
        <div className="right-upper">
          <form className="search" onSubmit={(event) => {event.preventDefault(); handleTitleMatchChange(foodSearch) }}>
            <input className="findAdd"
                type="text"
                placeholder="Find recipe..."
                value={foodSearch}
                onChange={(event) => {setFoodSearch(event.target.value); dispatch(setIndexChoosen(0))} }

            />
            <input className="findAdd"
              type="submit" value="SEARCH !"
            />
          </form>
          <Link to="/PI-Food-GH/create"> <button className="button">CREATE RECIPE !</button> </Link>
          <Link to="/PI-Food-GH/about"> <button className="button">ABOUT !</button> </Link>
        </div>
        <div className="right-lower">
          <FormControl>
            {/* <InputLabel>Sort by Healthy</InputLabel> */}
            <Select
              sx={{ width: '150px' }}
              //label="Sort by Healthy"
              value={typeOfDiet}
              onChange={typeOfDietHandler}
            >
              {/* <MenuItem value={"All Diets"}>All Diets</MenuItem> */}
              { dietss.map(e => {
                return (
                  <MenuItem 
                    key={e.title}
                    value={`${e.title}`}
                  >{e.title}</MenuItem>
                )
              }) }
              
            </Select>
          </FormControl>
          
          <FormControl>
            <InputLabel>Sort by Healthy</InputLabel>
            <Select
              sx={{ width: '150px' }}
              label="Sort by Healthy"
              value={healthLevel}
              onChange={healthLevelHandler}
            >
              <MenuItem value={"More Healthy"}>More Healthy</MenuItem>
              <MenuItem value={"Less Healthy"}>Less Healthy</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Sort alphabetically</InputLabel>
            <Select
              sx={{ width: '150px' }}
              label="Sort alphabetically"
              value={sortAZ}
              onChange={sortAZHandler}
            >
              <MenuItem value={"More Healthy"}>A-Z</MenuItem>
              <MenuItem value={"Less Healthy"}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );

}
