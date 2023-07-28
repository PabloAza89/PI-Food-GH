import React, { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { 
  setIndexChoosen, sortMoreHealthy, sortLessHealthy,
  sortAtoZ, sortZtoA, sortByDietAndText, filter
} from '../../actions';
import dietss from '../../db/diets.json';
//import Select, { SelectChangeEvent } from '@mui/material/Select';

interface NavBarI {
  handleTitleMatchChange: any,
}

export default function Nav({ handleTitleMatchChange }: NavBarI) {

  const dispatch = useDispatch()

  const allRecipesLoaded = useSelector((state: {allRecipesLoaded: boolean}) => state.allRecipesLoaded)

  const [healthLevel, setHealthLevel] = useState<string>('');
  const [sortAlpha, setSortAlpha] = useState<string>('');
  const [typeOfDiet, setTypeOfDiet] = useState<string>('All Diets');
  const [textToFilter, setTextToFilter] = useState<string>('');

  interface typeOfDietAndTextI {
    diet: string,
    text: string,
  }

  const [typeOfDietAndText, setTypeOfDietAndText] = useState<typeOfDietAndTextI>(
    { 
      diet: 'All Diets',
      text: ''
     }
    )

  interface entireFilterI {
    diet: string,
    text: string,
    alphaOrHealthy: string,
  }

  const [entireFilter, setEntireFilter] = useState<entireFilterI>(
    { 
      diet: 'All Diets',
      text: '',
      alphaOrHealthy: '',
      }
    )

  const healthLevelHandler = (e: SelectChangeEvent) => {
    setSortAlpha('' as string);
    setHealthLevel(e.target.value as string);
    if (e.target.value === "More Healthy") dispatch(sortMoreHealthy())
    if (e.target.value === "Less Healthy") dispatch(sortLessHealthy())
  };

  const sortAlphaHandler = (e: SelectChangeEvent) => {
    setHealthLevel('' as string);
    setSortAlpha(e.target.value as string);
    if (e.target.value === "A-Z") dispatch(sortAtoZ())
    if (e.target.value === "Z-A") dispatch(sortZtoA())
  };

  interface dietAndTextHandlerI {
    diet: string,
    text: string,
  }

  const dietAndTextHandler = ({diet, text}: dietAndTextHandlerI) => {
    //setTypeOfDiet(diet as string);
    //setTextToFilter(text as string);
    setTypeOfDietAndText({diet: diet,text: text})
    //console.log("diet",diet)
    //console.log("text",text)
    //dispatch(sortByDiet(e.target.value))
    dispatch(sortByDietAndText({ diet: diet, text: text}))
    //console.log("target", e.target.value)
    //dispatch(setIndexChoosen(0))
  };

  // useEffect(() => {
  //   dispatch(sortByDietAndText(typeOfDietAndText))
  //   dispatch(setIndexChoosen(0))
  // },[dispatch,typeOfDietAndText])

  useEffect(() => {
    dispatch(filter(entireFilter))
    dispatch(setIndexChoosen(0))
  },[ dispatch, entireFilter ])

  //let [healthSelected, setHealthSelected] = useState<any>("")
  //let [aZSelected, setAZSelected] = useState<any>("")

  //const [foodSearch, setFoodSearch] = useState("");


  // function defaultPaginateColor () {
  //   return document.getElementById(0) && document.getElementById(0).style.background='rgba(46, 230, 163, 0.377)'
  // }


  //console.log("test", allRecipesLoaded)
  //console.log("test", healthLevel)
  //console.log("AA", diets.map((e:any) => e.title))
  //console.log("AA", JSON.parse(diets))
  //console.log("AA", dietss)
  //console.log("target", typeOfDiet)
  //console.log("textToFilter", textToFilter)
  console.table(typeOfDietAndText)

  


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
          {/* <form className="search" onSubmit={(event) => {event.preventDefault(); handleTitleMatchChange(foodSearch) }}>
            <input className="findAdd"
                type="text"
                placeholder="Find recipe..."
                value={foodSearch}
                onChange={(event) => {setFoodSearch(event.target.value); dispatch(setIndexChoosen(0))} }

            />
            <input className="findAdd"
              type="submit" value="SEARCH !"
            />
          </form> */}
          <Box
            component="form"
            //onSubmit={(e: any) => { e.preventDefault(); onSearch(city) }}
            //sx={s.background({ currentWidth })}
          >
            <TextField
              className={`inputPos`}
              //disabled={disabled}
              type="text"
              autoComplete='off'
              placeholder={`FIND RECIPE..`}
              //onFocus={() => setCity("")}
              //value={city}
              //InputLabelProps={{ style: s.labelStyle() }}
              //InputProps={{ style: s.inputStyleProps() }}
              //sx={s.input()}
              //onChange={(e) => setCity(e.target.value)}
              //onChange={(e) => console.log(e.target.value)}
              /* onChange={(e) => setTextToFilter(e.target.value)} */
              //onChange={(e) => dietAndTextHandler({diet:typeOfDiet, text: e.target.value})}
              //onChange={(e) => setTypeOfDietAndText({...typeOfDietAndText, text: e.target.value})}
              onChange={(e) => setEntireFilter({...entireFilter, text: e.target.value})}
            />
            <Button
              className={`buttonPos`}
              //disabled={disabled}
              //sx={s.button()}
              type="submit"
            >{ `SEARCH !` }
            </Button>
          </Box>
          <Link to="/PI-Food-GH/create"> <button className="button">CREATE RECIPE !</button> </Link>
          <Link to="/PI-Food-GH/about"> <button className="button">ABOUT !</button> </Link>
        </div>
        <div className="right-lower">
          <FormControl>
            <Select
              sx={{ width: '150px' }}
              //value={typeOfDiet}
              value={entireFilter.diet}
              /* onChange={typeOfDietHandler} */
              //onChange={(e) => console.log("AA",e.target.value)}
              //onChange={(e) => dietAndTextHandler({diet:e.target.value, text: textToFilter})}
              //onChange={(e) => setTypeOfDietAndText({...typeOfDietAndText, diet:e.target.value})}
              onChange={(e) => setEntireFilter({...entireFilter, diet:e.target.value})}
            >
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
              //onChange={healthLevelHandler}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); healthLevelHandler(e)}}
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
              //value={sortAlpha}
              value={sortAlpha}
              //onChange={sortAlphaHandler}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); sortAlphaHandler(e)}}
            >
              <MenuItem value={"A-Z"}>A-Z</MenuItem>
              <MenuItem value={"Z-A"}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );

}
