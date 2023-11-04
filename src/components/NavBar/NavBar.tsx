import { useState, useEffect } from "react";
import {
  Link, useLocation, useMatch, useNavigate
} from "react-router-dom";
import logo from "../../images/logo.png";
import css from './NavBarCSS.module.css';
import com from "../../commons/commonsCSS.module.css";
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
  recipeCreatedOrEdited?: boolean,
  paginateAmount?: number
}

const NavBar = ({ recipeCreatedOrEdited, paginateAmount }: NavBarI) =>  {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const inDetail = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  const [healthLevel, setHealthLevel] = useState<string>('');
  const [healthLabelShown, setHealthLabelShown] = useState<boolean>(false);
  const [sortAlpha, setSortAlpha] = useState<string>('');
  const [alphaLabelShown, setAlphaLabelShown] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Find recipe..');
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  //const menuShown = true // DEV
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
  },[ dispatch, entireFilter ])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800) dispatch(setMenuShown(false))
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  return (
    <div
      className={css.background}
      style={{
        position: location.pathname !== `/` ? 'fixed' : 'relative',
        height: location.pathname !== `/` && menuShown ? '150px' : 'unset',
      }}
    >
      <div className={css.logoAndMenuContainer}>
        <div className={`${css.logoTextContainer} ${com.noSelect}`}>
          <div
            onClick={() => handleReturn({
              location, navigate, inDetail, recipeCreatedOrEdited
            })}
          >
            <img className={css.logo} src={logo} alt=""></img>
          </div>
          <div // NO Link BECAUSE PERFORM AN ACTION
            className={css.noDeco}
            onClick={() => handleReturn({
              location, navigate, recipeCreatedOrEdited
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
          >
            <MenuIcon style={{ fontSize: 40 }} />
          </Button>
        </Tooltip>
      </div>
      <div
        className={css.selectsAndButtons}
        style={{
          visibility: location.pathname !== `/` ? 'hidden' : 'visible',
          display:
            location.pathname !== `/` ?
            'none' :
            menuShown ?
            'flex' :
            'none'
        }}
      >
        <div className={css.upperLower}>
          <TextField
            type="text"
            autoComplete='off'
            placeholder={placeholder}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder(`Find recipe..`)}
            InputProps={{ className: css.inputProps }}
            className={`${css.input} ${com.noSelect}`}
            onChange={(e) => {
              setEntireFilter({...entireFilter, text: e.target.value});
              dispatch(setIndexChoosen(0));
              dispatch(setTabChoosen(0));
            }}
          />
          <Link
            className={css.linkStyleCreate}
            to="/MyRecipe"
          >
            <Button
              variant="contained"
              disableElevation
              className={css.buttonCreate}
            />
          </Link>
          <Link
            className={css.linkStyleAbout}
            to="/About"
          >
            <Button
              variant="contained"
              disableElevation
              className={css.buttonAbout}
            >
              { paginateAmount === 45 ? 'ABOUT' : 'ABOUT !' }
            </Button>
          </Link>
        </div>
        <div className={css.upperLower}>
          <Select
            className={css.containerDietsDishesHealthAlpha}
            value={entireFilter.diet}
            onChange={(e) => {
              setEntireFilter({...entireFilter, diet:e.target.value});
              dispatch(setIndexChoosen(0));
              dispatch(setTabChoosen(0));
            }}
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
            onChange={(e) => {
              setEntireFilter({...entireFilter, dish:e.target.value});
              dispatch(setIndexChoosen(0));
              dispatch(setTabChoosen(0));
            }}
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
          <FormControl className={`${css.containerDietsDishesHealthAlpha} ${com.noSelect}`}>
            <InputLabel
              size="small"
              className={css.labelHealthOrAlpha}
              style={{
                width: healthLabelShown ? 'fit-content' : 'calc(100% - 30px)',
              }}
            >  Sort by Healthy  </InputLabel>
            <Select
              size="small"
              className={css.selectWithLabel}
              onFocus={() => setHealthLabelShown(true)}
              value={healthLevel}
              onChange={(e) => {setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value}); healthLevelHandler(e)}}
            >
              <MenuItem value={"More Healthy"}>More Healthy</MenuItem>
              <MenuItem value={"Less Healthy"}>Less Healthy</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={`${css.containerDietsDishesHealthAlpha} ${com.noSelect}`}>
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