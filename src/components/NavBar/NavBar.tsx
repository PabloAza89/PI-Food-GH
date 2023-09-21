import { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/NavBarSX';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import {
  setIndexChoosen, filter, setMenuShown
} from '../../actions';
import Tooltip from '@mui/joy/Tooltip';
import serverSDDietsArray from '../../db/diets.json'; // SD = Shut Down
import serverSDDishesArray from '../../db/dishes.json'; // SD = Shut Down
import $ from 'jquery';

const NavBar = () =>  {

  const dispatch = useDispatch()

  const allRecipesLoaded = useSelector((state: {allRecipesLoaded: boolean}) => state.allRecipesLoaded)
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)

  const [healthLevel, setHealthLevel] = useState<string>('');
  const [healthLabelShown, setHealthLabelShown] = useState<boolean>(false);
  const [sortAlpha, setSortAlpha] = useState<string>('');
  const [alphaLabelShown, setAlphaLabelShown] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Find recipe..');

  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  const allDietsOnline = useSelector((state: {allDietsOnline:boolean}) => state.allDietsOnline)
  const allDishesOnline = useSelector((state: {allDishesOnline:boolean}) => state.allDishesOnline)

  interface allDietsI {
    id?: string,
    title: string
  }

  interface allDishesI {
    id?: string,
    title: string
  }

  const allDietsArray = useSelector((state: {allDiets: allDietsI[]}) => state.allDiets)
  const allDishesArray = useSelector((state: {allDishes: allDishesI[]}) => state.allDishes)

  //const [menuShown, setMenuShown] = useState<boolean>(false);

  interface entireFilterI {
    diet: string,
    dish: string,
    text: string,
    alphaOrHealthy: string,
  }

  const [entireFilter, setEntireFilter] = useState<entireFilterI>(
    {
      diet: 'All Diets',
      dish: 'All Dishes',
      text: '',
      alphaOrHealthy: ''
    }
  )

  const healthLevelHandler = (e: SelectChangeEvent) => {
    setSortAlpha('' as string);
    setHealthLevel(e.target.value as string);
    setAlphaLabelShown(false)
  };

  const sortAlphaHandler = (e: SelectChangeEvent) => {
    setHealthLevel('' as string);
    setSortAlpha(e.target.value as string);
    setHealthLabelShown(false)
  };

  useEffect(() => {
    dispatch(filter(entireFilter))
    if (currentWidth > 800) dispatch(setMenuShown(false))
  },[ dispatch, entireFilter, currentWidth ])

  console.log("entireFilter", entireFilter)

  return (
    <Box sx={s.background({ menuShown })}>
      <Box sx={s.logoAndMenuContainer({ currentWidth, scrollWidth })}>
        <Box sx={s.logoTextContainer}>
          <Link to="/">
            <Box component="img" sx={s.logo} src={logo} alt=""></Box>
          </Link>
          <Link style={s.linkLink()} to="/">
            <Typography sx={s.linkText}>Foodify !</Typography>
          </Link>
        </Box>
        <Tooltip
          arrow
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          placement="bottom-end"
          title={`Show/Hide Menu`}
        >
          <Button
            variant="contained"
            onClick={() => dispatch(setMenuShown(!menuShown))}
            sx={s.menuButton({ currentWidth })}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </Button>
        </Tooltip>
      </Box>
      <Box sx={s.selectsAndButtons({ menuShown, currentWidth, scrollWidth })}>
        <Box sx={s.upper({ currentWidth, scrollWidth })}>
          <Box
            component="form"
            onSubmit={(e: any) => { e.preventDefault(); dispatch(filter(entireFilter)) }}
          >

            <TextField
              className={`inputPos`}
              type="text"
              autoComplete='off'
              placeholder={placeholder}
              onFocus={() => setPlaceholder("")}
              onBlur={() => setPlaceholder(`Find recipe..`)}
              InputProps={{ style: s.inputProps() }}
              sx={s.input()}
              onChange={(e) => {setEntireFilter({...entireFilter, text: e.target.value}); dispatch(setIndexChoosen(0))}}
            />

          </Box>
          <Link to="/MyRecipe">
            <Button
              variant="contained"
              disableElevation
              sx={s.button}
              className="button"
            >CREATE RECIPE !</Button>
          </Link>
          <Link to="/about">
            <Button
              variant="contained"
              disableElevation
              sx={s.button}
              className="button"
            >ABOUT !</Button>
          </Link>
        </Box>
        <Box sx={s.lower({ currentWidth, scrollWidth })}>
          <FormControl>
            <Select
              sx={s.selectDietsHealthAlpha}
              value={entireFilter.diet}
              onChange={(e) => { setEntireFilter({...entireFilter, diet:e.target.value}); dispatch(setIndexChoosen(0)) }}
            >
              { allDietsOnline ?
                allDietsArray.map(e => {
                return (
                  <MenuItem
                    key={e.title}
                    value={`${e.title}`}
                  >{e.title}</MenuItem>
                )}) :
                serverSDDietsArray.map(e => {
                  return (
                    <MenuItem
                      key={e.title}
                      value={`${e.title}`}
                    >{e.title}</MenuItem>
                  )})
              }
            </Select>
          </FormControl>
          <FormControl>
            <Select
              sx={s.selectDietsHealthAlpha}
              value={entireFilter.dish}
              onChange={(e) => { setEntireFilter({...entireFilter, dish:e.target.value}); dispatch(setIndexChoosen(0)) }}
            >
              { allDishesOnline ?
                allDishesArray.map(e => {
                return (
                  <MenuItem
                    key={e.title}
                    value={`${e.title}`}
                  >{e.title}</MenuItem>
                )}) :
                serverSDDishesArray.map(e => {
                  return (
                    <MenuItem
                      key={e.title}
                      value={`${e.title}`}
                    >{e.title}</MenuItem>
                  )})
              }
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel size="small" sx={s.labelHealth({ healthLabelShown })}>  Sort by Healthy  </InputLabel>
            <Select
              sx={s.selectDietsHealthAlpha}
              onFocus={() => setHealthLabelShown(true)}
              inputProps={{ style: { background: 'red' }}}
              value={healthLevel}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); healthLevelHandler(e)}}
            >
              <MenuItem value={"More Healthy"}>More Healthy</MenuItem>
              <MenuItem value={"Less Healthy"}>Less Healthy</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel size="small" sx={s.labelAlpha({ alphaLabelShown })}>  Sort alphabetically  </InputLabel>
            <Select

              onFocus={() => setAlphaLabelShown(true)}

              sx={s.selectDietsHealthAlpha}
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