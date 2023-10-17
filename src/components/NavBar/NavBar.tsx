import { useState, useEffect } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import css from './NavBarCSS.module.css';
import { handleReturn } from '../../commons/commonsFunc';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button, TextField, FormControl,
  InputLabel, MenuItem, Select, SelectChangeEvent
} from '@mui/material/';
import {
  setIndexChoosen, filter,
  setMenuShown, setTabChoosen
} from '../../actions';
import Tooltip from '@mui/joy/Tooltip';
import serverSDDietsArray from '../../db/diets.json'; // SD = Shut Down
import serverSDDishesArray from '../../db/dishes.json'; // SD = Shut Down

interface NavBarI {
  recipeCreatedOrEdited?: boolean
}

const NavBar = ({ recipeCreatedOrEdited }: NavBarI) =>  {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const inHome = useMatch("/")?.pattern.path === "/" ? true : false; // "/" === Home
  const inDetail = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  const [isEditing, setIsEditing] = useState<boolean>( location.state && location.state.editing ? true : false );
  const allRecipesLoaded = useSelector((state: {allRecipesLoaded: boolean}) => state.allRecipesLoaded)
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const hasScroll = useSelector((state: {hasScroll:boolean}) => state.hasScroll)
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

  return (
    <div
      className={css.background}
      style={{
        position: location.pathname !== `/` ? 'fixed' : 'relative',
        //position: 'fixed',
        //flexDirection: menuShown ? 'column' : 'row',
        //width: hasScroll ? `calc(100vw - ${scrollWidth}px)` : `100vw`,
        //minHeight: menuShown ? '200px' : '100px',
        height: menuShown ? '200px' : '100px',
      }}
    >
      <div
        className={css.logoAndMenuContainer}
        style={{
          //width: currentWidth <= 800 ? `100%` : '200px',
          //height: '100px'
        }}
      >
        <div className={css.logoTextContainer}>
          <div
            onClick={() => handleReturn({
              location, navigate, inDetail,
              isEditing, recipeCreatedOrEdited
            })}
          >
            <img className={css.logo} src={logo} alt=""></img>
          </div>
          <div // NO Link BECAUSE PERFORM AN ACTION
            className={css.noDeco}
            onClick={() => handleReturn({
              location, navigate,
              isEditing, recipeCreatedOrEdited
            })}
          >
            <div className={css.linkText}>Foodify !</div>
          </div>
        </div>
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
            className={css.menuButton}
            style={{
              //visibility: location.pathname !== `/` ? 'hidden' : 'visible',
              display: location.pathname !== `/` ? 'none' : 'flex',
              //display: "flex",
              //marginRight: `16px`,
              //display: inHome && currentWidth <= 800 ? 'flex' : 'none'
            }}
          >
            <MenuIcon style={{ fontSize: 40 }} />
          </Button>
        </Tooltip>
      </div>
      <div
        className={css.selectsAndButtons}
        style={{
          visibility: location.pathname !== `/` ? 'hidden' : 'visible',
          display: menuShown ? 'flex' : 'none'
        }}
      >
        <div
          style={{
            //width: currentWidth <= 800 ? `calc(100% - 8px)` : '50vw',
            height: '100px'
          }}
          className={css.upperLower}
        >
          <TextField
            type="text"
            autoComplete='off'
            placeholder={placeholder}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder(`Find recipe..`)}
            InputProps={{ className: css.inputProps }}
            className={css.input}
            onChange={(e) => {
              setEntireFilter({...entireFilter, text: e.target.value});
              dispatch(setIndexChoosen(0));
              dispatch(setTabChoosen(0));
            }}
          />
          <Link to="/MyRecipe">
            <Button
              variant="contained"
              disableElevation
              className={css.button}
            >CREATE RECIPE !</Button>
          </Link>
          <Link to="/About">
            <Button
              variant="contained"
              disableElevation
              className={css.button}
            >ABOUT !</Button>
          </Link>
        </div>
        <div
          //style={{ width: currentWidth <= 800 ? `calc(100% - 8px)` : '50vw' }}
          className={css.upperLower}
        >
          <Select
            className={css.containerDietsDishesHealthAlpha}
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
          <Select
            className={css.containerDietsDishesHealthAlpha}
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
                )
              })
            }
          </Select>
          <FormControl className={css.containerDietsDishesHealthAlpha}>
            <InputLabel
              size="small"
              className={css.labelHealthOrAlpha}
              style={{
                width: healthLabelShown ? 'fit-content' : 'calc(100% - 30px)',
              }}
            >  Sort by Healthy  </InputLabel>
            <Select
              className={css.selectWithLabel}
              onFocus={() => setHealthLabelShown(true)}
              value={healthLevel}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); healthLevelHandler(e)}}
            >
              <MenuItem value={"More Healthy"}>More Healthy</MenuItem>
              <MenuItem value={"Less Healthy"}>Less Healthy</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={css.containerDietsDishesHealthAlpha}>
            <InputLabel
              size="small"
              className={css.labelHealthOrAlpha}
              style={{
                width: alphaLabelShown ? 'fit-content' : 'calc(100% - 30px)'
              }}
            >  Sort alphabetically  </InputLabel>
            <Select
              onFocus={() => setAlphaLabelShown(true)}
              className={css.selectWithLabel}
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
    </div>
  );
}

export default NavBar;