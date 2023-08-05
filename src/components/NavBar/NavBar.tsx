import React, { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/NavBarSX';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { 
  setIndexChoosen, filter
} from '../../actions';
import dietss from '../../db/diets.json';

const NavBar = () =>  {

  const dispatch = useDispatch()

  const allRecipesLoaded = useSelector((state: {allRecipesLoaded: boolean}) => state.allRecipesLoaded)

  const [healthLevel, setHealthLevel] = useState<string>('');
  const [sortAlpha, setSortAlpha] = useState<string>('');
  const [typeOfDiet, setTypeOfDiet] = useState<string>('All Diets');
  const [textToFilter, setTextToFilter] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Find recipe..');



  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)

  const [menuShow, setMenuShow] = useState<boolean>(false);

  


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


  useEffect(() => {
    if (currentWidth > 800) setMenuShow(false)
  },[ currentWidth ])

  return (
   <Box sx={s.background({ menuShow })}>
      <Box sx={s.logoAndMenuContainer}>
        <Box sx={s.logoTextContainer}>
          <Link to="/">
            <Box component="img" sx={s.logo} src={logo} alt=""></Box>
          </Link>
          <Link style={s.linkLink()} to="/">
            <Typography sx={s.linkText}>Foodify !</Typography>
          </Link>
        </Box>

        <Button
          onClick={() => setMenuShow(!menuShow) }
          sx={s.menuButton({ currentWidth })}
        >
          <MenuIcon sx={{ fontSize: 60 }} />
        </Button>
      </Box>
      <Box
        sx={s.selectsAndButtons({ menuShow, currentWidth }) }
      >
        <Box sx={s.upper}>
          <Box
            component="form"
            onSubmit={(e: any) => { e.preventDefault(); dispatch(filter(entireFilter)) }}
            //sx={{ background: 'transparent' }}
          >
            <TextField
              className={`inputPos`}
              //disabled={disabled}
              type="text"
              autoComplete='off'
              /* placeholder={`FIND RECIPE..`} */
              placeholder={placeholder}
              onFocus={() => setPlaceholder("")}
              onBlur={() => setPlaceholder(`Find recipe..`)}
              //value={city}
              //InputLabelProps={{ style: s.labelStyle() }}
              InputProps={{ style: s.inputProps() }}
              sx={s.input()}
              onChange={(e) => setEntireFilter({...entireFilter, text: e.target.value})}
            />
            <Button
              className={`buttonPos`}
              //disabled={disabled}
              //sx={s.button()}
              sx={s.button}
              type="submit"
            >{ `SEARCH !` }
            </Button>
          </Box>
          <Link to="/create">
            <Button sx={s.button} className="button">CREATE RECIPE !</Button>
          </Link>
          <Link to="/about">
            <Button sx={s.button} className="button">ABOUT !</Button>
          </Link>
        </Box>
        <Box /* className="right-lower" */ sx={s.lower}>
          <FormControl>
            <Select
              //sx={{ width: '150px' }}
              sx={s.diets}
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
          <FormControl
            //InputLabelProps={{ style: s.labelStyle() }}

          >
            <InputLabel size="small" sx={s.label()}>  Sort by Healthy  </InputLabel>
            <Select
              sx={s.health}
              value={healthLevel}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); healthLevelHandler(e)}}
            >
              <MenuItem value={"More Healthy"}>More Healthy</MenuItem>
              <MenuItem value={"Less Healthy"}>Less Healthy</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel size="small" sx={s.label()}>  Sort alphabetically  </InputLabel>
            <Select
              //sx={{ width: '150px' }}
              sx={s.alpha}
              label="Sort alphabetically"
              value={sortAlpha}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); sortAlphaHandler(e)}}
            >
              <MenuItem value={"A-Z"}>A-Z</MenuItem>
              <MenuItem value={"Z-A"}>Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default NavBar;