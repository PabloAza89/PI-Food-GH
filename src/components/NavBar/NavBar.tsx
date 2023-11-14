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
  setIndexChoosen, applyFilters,
  setMenuShown, setTabChoosen, setNavBarFilters
} from '../../actions';
import Tooltip from '@mui/joy/Tooltip';
import serverSDDietsArray from '../../db/diets.json'; // SD = Shut Down
import serverSDDishesArray from '../../db/dishes.json'; // SD = Shut Down
import $ from 'jquery';
import { NavBarI, settingsFiltersI } from '../../interfaces/interfaces';

const NavBar = ({ recipeCreatedOrEdited, paginateAmount }: NavBarI) =>  {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()


  const navBarFilters = useSelector((state: {navBarFilters: any}) => state.navBarFilters)
  //console.log("AAA", navBarFilters)

  const inDetail = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  const [healthLevel, setHealthLevel] = useState<string>('');
  const [healthLabelShown, setHealthLabelShown] = useState<boolean>(false);
  const [sortAlpha, setSortAlpha] = useState<string>('');
  const [alphaLabelShown, setAlphaLabelShown] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Find recipe..');
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  const settingsFilters = useSelector((state: { settingsFilters: settingsFiltersI }) => state.settingsFilters)
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

  // interface entireFilterI {
  //   diet: string,
  //   dish: string,
  //   text: string,
  //   alphaOrHealthy: string,
  // }

  // const [entireFilter, setEntireFilter] = useState<entireFilterI>(
  //   {
  //     diet: 'All Diets',
  //     dish: 'All Dishes',
  //     text: '',
  //     alphaOrHealthy: ''
  //   }
  // )

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

  // useEffect(() => {
  //   dispatch(filter(entireFilter))
  // },[ dispatch, entireFilter ])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800) dispatch(setMenuShown(false))
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  const navBarValuesHandler = ({ type, value }: any) => {

    if (type === ('text' || 'diet' || 'dish')) {
      dispatch(setIndexChoosen(0));
      dispatch(setTabChoosen(0));
    }
      
    
      
    // switch (type) {
    //   case 'text':
    //     dispatch(setIndexChoosen(0));
    //     dispatch(setTabChoosen(0));
    //     Promise.all([dispatch(setNavBarFilters({ type: 'text', value: value }))])
    //     .then(() => dispatch(applyFilters()))
    //   break;
    //   case 'diet':
    //     dispatch(setIndexChoosen(0));
    //     dispatch(setTabChoosen(0));
    //     Promise.all([dispatch(setNavBarFilters({ type: 'diet', value: value }))])
    //     .then(() => dispatch(applyFilters()))
    //   break;
    //   case 'dish':
    //     dispatch(setIndexChoosen(0));
    //     dispatch(setTabChoosen(0));
    //     Promise.all([dispatch(setNavBarFilters({ type: 'dish', value: value }))])
    //     .then(() => dispatch(applyFilters()))
    //   break;
    //   case 'sortHealth':
    //     //dispatch(setIndexChoosen(0));
    //     //dispatch(setTabChoosen(0));
    //     Promise.all([dispatch(setNavBarFilters({ type: 'sortHealth', value: value }))])
    //     .then(() => dispatch(applyFilters()))
    //   break;
    //   case 'sortAlpha':
    //     //dispatch(setIndexChoosen(0));
    //     //dispatch(setTabChoosen(0));
    //     Promise.all([dispatch(setNavBarFilters({ type: 'sortAlpha', value: value }))])
    //     .then(() => dispatch(applyFilters()))
    //   break;

      


    //}
    Promise.all([dispatch(setNavBarFilters({ type: type, value: value }))])
    .then(() => dispatch(applyFilters()))
  }

  // useEffect(() => {
  //   var lastWidth = $(`#testNavBarTest`).width();

  //   $(`#testNavBarTest`).on("resize", function(){
  //     if($(`#testNavBarTest`).width()!== lastWidth){
  //       console.log("SE REEMPLAZOAA")
  //         lastWidth = $(`#testNavBarTest`).width();
  //     }
  //   })

  // })

  // useEffect(() => {
  //   // $(`#testNavBarTest`).resize(function() {
  //   //   //$('body').prepend('<div>' + $(window).width() + '</div>');
  //   //   console.log("SE REEMPLAZOAA")
  //   // });
  //       //var lastWidth = $(window).width();

  //   // $(window).on("resize", function(){
  //   //   if($(window).width()!== lastWidth){
  //   //     console.log("SE REEMPLAZOAA")
  //   //       lastWidth = $(window).width();
  //   //   }
  //   // })

  //   var lastWidth = $(`body`).width();

  //   console.log("SE REEMPLAZOAA", $(`body`).width())

  //   $(`body`).on("resize", function(){
  //     if($(`body`).width()!== lastWidth){
  //       console.log("SE REEMPLAZOAA")
  //         lastWidth = $(`body`).width();
  //     }
  //   })

  // })

  useEffect(() => {
    function handleResize() {
      console.log("SE REEMPLAZOAA", $(`#testNavBarTest`).outerWidth()!)
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  useEffect(() => {
    var lastWidth = $(`#testNavBarTest`).outerWidth()!

    //console.log("SE REEMPLAZOAA", $(`body`).width())
    console.log("SE REEMPLAZOAA", $(`#testNavBarTest`).outerWidth()!)

    console.log("SE asdasdasd", $('body')[0].scrollWidth)

    
    
    

    $(`#testNavBarTest`).on("resize", function(){
      if($(`#testNavBarTest`).outerWidth()! !== lastWidth){
        console.log("SE REEMPLAZOAA")
          lastWidth = $(`#testNavBarTest`).outerWidth()!
      }
    })

  })


  return (
    <div
      className={css.background}
      id={`testNavBarTest`}
      style={{
        position: location.pathname !== `/` ? 'fixed' : 'relative',
        height: location.pathname.toLowerCase() === `/settings` ? '100px' : location.pathname !== `/` && menuShown ? '150px' : 'unset',
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
          //open={true}
          disableFocusListener={!settingsFilters.showTooltips}
          disableHoverListener={!settingsFilters.showTooltips}
          hidden={ settingsFilters.showTooltips ? false : true }
        >
          <Button
            variant="contained"
            onClick={() => dispatch(setMenuShown(!menuShown))}
            className={css.menuButton}
            style={{ display: location.pathname.toLowerCase() === `/settings` ? 'none' : 'flex' }}
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
            value={navBarFilters.text}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder(`Find recipe..`)}
            InputProps={{ className: css.inputProps }}
            className={`${css.input} ${com.noSelect}`}
            onChange={(e) => {
              
              //setEntireFilter({...entireFilter, text: e.target.value});
              // dispatch(setIndexChoosen(0));
              // dispatch(setTabChoosen(0));
              // Promise.all([dispatch(setNavBarFilters({ type: 'text', value: e.target.value }))])
              // .then(() => dispatch(applyFilters()))
              navBarValuesHandler({ type: 'text', value: e.target.value })
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
            //value={entireFilter.diet}
            value={navBarFilters.diet}
            onChange={(e) => {
              
              //setEntireFilter({...entireFilter, diet:e.target.value});
              // dispatch(setIndexChoosen(0));
              // dispatch(setTabChoosen(0));

              // Promise.all([dispatch(setNavBarFilters({ type: 'diet', value: e.target.value }))])
              // .then(() => dispatch(applyFilters()))

              navBarValuesHandler({ type: 'diet', value: e.target.value })


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
            //value={entireFilter.dish}
            value={navBarFilters.dish}
            onChange={(e) => {
              
              //setEntireFilter({...entireFilter, dish:e.target.value});
              // dispatch(setIndexChoosen(0));
              // dispatch(setTabChoosen(0));

              // Promise.all([dispatch(setNavBarFilters({ type: 'dish', value: e.target.value }))])
              // .then(() => dispatch(applyFilters()))

              navBarValuesHandler({ type: 'dish', value: e.target.value })

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
              //value={healthLevel}
              value={navBarFilters.sortHealth}
              onChange={(e) => {
                
                //setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value});
                healthLevelHandler(e)

                // Promise.all([dispatch(setNavBarFilters({ type: 'sortHealth', value: e.target.value }))])
                // .then(() => dispatch(applyFilters()))

                navBarValuesHandler({ type: 'sortHealth', value: e.target.value })
              }}
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
              //value={sortAlpha}
              value={navBarFilters.sortAlpha}
              onChange={(e) => {
                
                //setEntireFilter({...entireFilter, alphaOrHealthy: e.target.value});
                sortAlphaHandler(e)

                //Promise.all([dispatch(setNavBarFilters({ type: 'sortAlpha', value: e.target.value }))])
                //.then(() => dispatch(applyFilters()))

                navBarValuesHandler({ type: 'sortAlpha', value: e.target.value })
              }}
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