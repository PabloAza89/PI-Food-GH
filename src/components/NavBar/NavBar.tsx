import React, { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/NavBarSX';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { 
  setIndexChoosen, filter
} from '../../actions';
import dietss from '../../db/diets.json';


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
  const [placeholder, setPlaceholder] = useState<string>('FIND RECIPE..');


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
    //if (e.target.value === "More Healthy") dispatch(sortMoreHealthy())
    //if (e.target.value === "Less Healthy") dispatch(sortLessHealthy())
  };

  const sortAlphaHandler = (e: SelectChangeEvent) => {
    setHealthLevel('' as string);
    setSortAlpha(e.target.value as string);
    //if (e.target.value === "A-Z") dispatch(sortAtoZ())
    //if (e.target.value === "Z-A") dispatch(sortZtoA())
  };

  interface dietAndTextHandlerI {
    diet: string,
    text: string,
  }

  useEffect(() => {
    dispatch(filter(entireFilter))
    dispatch(setIndexChoosen(0))
  },[ dispatch, entireFilter ])

  return (
   <Box sx={s.background}>
      <Box sx={s.logoTextContainer}>
        <Link /* className="iconImage"  */to="/">
          <Box component="img" sx={s.logo} /* className="iconImage"  */src={logo} alt=""></Box>
        </Link>
        <Link /* id="iconText"  */to="/">
          <Typography sx={s.linkText}>Foodify !</Typography>
        </Link>
      </Box>
      
      <div className="main-right">
        <div className="right-upper">
          <Box
            component="form"
            onSubmit={(e: any) => { e.preventDefault(); dispatch(filter(entireFilter)) }}
          >
            <TextField
              className={`inputPos`}
              //disabled={disabled}
              type="text"
              autoComplete='off'
              /* placeholder={`FIND RECIPE..`} */
              placeholder={placeholder}
              onFocus={() => setPlaceholder("")}
              onBlur={() => setPlaceholder(`FIND RECIPE..`)}
              //value={city}
              //InputLabelProps={{ style: s.labelStyle() }}
              //InputProps={{ style: s.inputStyleProps() }}
              //sx={s.input()}
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
          <Link to="/create"> <button className="button">CREATE RECIPE !</button> </Link>
          <Link to="/about"> <button className="button">ABOUT !</button> </Link>
        </div>
        <div className="right-lower">
          <FormControl>
            <Select
              sx={{ width: '150px' }}
              value={entireFilter.diet}
              onChange={(e) => setEntireFilter({...entireFilter, diet:e.target.value})}
            >
              {dietss.map(e => {
                return (
                  <MenuItem
                    key={e.title}
                    value={`${e.title}`}
                  >{e.title}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Sort by Healthy</InputLabel>
            <Select
              sx={{ width: '150px' }}
              label="Sort by Healthy"
              value={healthLevel}
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
              value={sortAlpha}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); sortAlphaHandler(e)}}
            >
              <MenuItem value={"A-Z"}>A-Z</MenuItem>
              <MenuItem value={"Z-A"}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </Box>
  );

}
