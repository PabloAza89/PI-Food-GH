import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import css from "./DetailCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import notAvailable from "../../images/notAvailable.jpg";
import { handleDelete, handleEdit } from '../../commons/commonsFunc';
import { Button } from '@mui/material/';
import { recipesI, settingsFiltersI } from '../../interfaces/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
  getRecipesFromDB, getDietsFromDB,
  getDishesFromDB, setMenuShown,
  applyFilters, setSettingsFilters
} from '../../actions';
import $ from 'jquery';

export default function Detail({ userData, setUserData, paginateAmount }: any) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const reloadRecipes = async () => {
    Promise.all([
      dispatch(getDietsFromDB()),
      dispatch(getDishesFromDB()),
      dispatch(getRecipesFromDB())
    ]).then(() => dispatch(applyFilters()))
  }

  const handleReload = (props: any) => {
    if (props.statusResponse === 200 && props.messageResponse === `1 item deleted`) reloadRecipes()
  }

  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)
  const [ goOn, setGoOn ] = useState<boolean>(false)
  let recipe = allRecipes.filter((c:any) => params.recipeId! === c.id.toString() && params.recipeId!.toString().length === params.recipeId!.length)[0]

  useEffect(() => {
    if (location.state && location.state.webFlow) {
      setGoOn(true)
    } else {
      reloadRecipes()
      .then(() => setGoOn(true))
    }
    // eslint-disable-next-line
  },[])

  const settingsFilters = useSelector((state: { settingsFilters: settingsFiltersI }) => state.settingsFilters)
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  const [ brokenImage, setBrokenImage ] = useState<boolean>(false)
  function regexInSummary(text: any) { return text.replaceAll(/(<[/]b>|<b>|<[/]a>|<a\b[^>]*>|[/]a>)/g, '') }
  let arrImages = [noImage1, noImage2, noImage3]

  useEffect(() => {
    if (recipe !== undefined && recipe.userRecipe && recipe.image.length > 1) {
      fetch( `https://res.cloudinary.com/dtembdocm/image/upload/` + recipe.image, {
        headers: { 'Cache-Control': 'no-cache' }
      })
      .then((res) => {
        if (res.ok) setBrokenImage(false)
        else setBrokenImage(true)
      })
      .catch((err) => console.error(err))
    }
  })

  useEffect(() => {
    dispatch(setMenuShown(false))
  },[dispatch])

  $(window).scrollTop(0)

  window.onbeforeunload = function() { // FIRED WHEN WINDOW IS REFRESH (OR CLOSED), TO REFRESH REACT-ROUTER V6 STATE..
    window.history.replaceState({ usr: { webFlow: null }}, "");
  }

  useEffect(() => {
    if (paginateAmount === 45 && localStorage.getItem('showVisuals') === null)
      $(`[class*="cardDetail"], [class*="errorCard"]`)
        .css('backdrop-filter', 'unset')
        .css('box-shadow', 'unset')
        .css('background', 'rgba(196, 34, 147, 0.2)')
    else if (paginateAmount === 90 && localStorage.getItem('showVisuals') === null)
      $(`[class*="cardDetail"], [class*="errorCard"]`)
        .css('backdrop-filter', 'blur(20px)')
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
        .css('background', 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))')
    else if (settingsFilters.showVisuals)
      $(`[class*="cardDetail"], [class*="errorCard"]`)
        .css('backdrop-filter', 'blur(20px)')
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
        .css('background', 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))')
    else
      $(`[class*="cardDetail"], [class*="errorCard"]`)
        .css('backdrop-filter', 'unset')
        .css('box-shadow', 'unset')
        .css('background', 'rgba(196, 34, 147, 0.2)')
  })

  useEffect(() => {
    if (paginateAmount === 45 && localStorage.getItem('showVisuals') === null)
      dispatch(setSettingsFilters({ type: `showVisuals`, value: false }))
    else if (paginateAmount === 90 && localStorage.getItem('showVisuals') === null)
      dispatch(setSettingsFilters({ type: `showVisuals`, value: true }))
  },[paginateAmount, dispatch])



  if (goOn && toShow[0] !== undefined && recipe !== undefined) {
    return (
      <div
        className={css.background}
        style={{ marginTop: menuShown ? '150px' : '100px' }}
      >
        <div className={css.cardDetail}>
          <div
            id={css.editDeleteContainer}
            style={{
              display:
                recipe.userRecipe && userData.email === recipe.email ? `flex` : `none`
            }}
          >
            <Button
              variant="contained"
              id={css.buttonEditDelete}
              onClick={() => handleDelete({ id: recipe.id, fd_tkn: userData.fd_tkn, setUserData, handleReload })}
            >
              <ClearIcon className={css.iconDelete} />
            </Button>
            <Button
              variant="contained"
              id={css.buttonEditDelete}
              onClick={() => handleEdit({
                navigate, id: recipe.id, title: recipe.title, image: recipe.image,
                healthScore: recipe.healthScore, diets: recipe.diets, email: recipe.email,
                dishTypes: recipe.dishTypes, userRecipe: recipe.userRecipe,
                summary: recipe.summary, analyzedInstructions: recipe.analyzedInstructions
              })}
            >
              <EditIcon className={css.iconEdit} />
            </Button>
          </div>
          <img
            className={`${css.image} ${com.noSelect}`}
            style={{ marginTop: userData.email === recipe.email ? '24px' : '0px' }} // 24 === 40 - 16
            src={
              brokenImage ?
              notAvailable :
              recipe.userRecipe && recipe.image.length === 1 ?
              arrImages[parseInt(recipe.image, 10) - 1] :
              recipe.userRecipe && recipe.image.length > 1 ?
              `https://res.cloudinary.com/dtembdocm/image/upload/` + recipe.image :
              recipe.image
            }
            alt=""
          />
          <div className={`${css.text} ${com.noSelect}`}><b>Title: </b>{recipe.title}</div>
          <div className={`${css.text} ${com.noSelect}`}>
            <b>Diets: </b>
            {
              recipe.diets[0] !== undefined ?
              recipe.diets[0] && recipe.diets.map((e:any) => {
                if ((recipe.diets.indexOf(e) !== recipe.diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              }) :
              `Not specified`
            }
          </div>
          <div className={`${css.text} ${com.noSelect}`}>
            <b>Healt Score: </b>{recipe.healthScore}
          </div>
          <div className={`${css.text} ${com.noSelect}`}>
            <b>Dish Types: </b>
            {
              recipe.dishTypes[0] !== undefined ?
              recipe.dishTypes.map((e:any) => {
                if ((recipe.dishTypes.indexOf(e) !== recipe.dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              }) :
              `Not specified`
            }
          </div>
          <hr className={css.divider}/>
          <div className={`${css.text} ${com.noSelect}`}>
            <b>Summary: </b>
            {regexInSummary(recipe.summary)}
          </div>
          <hr className={css.divider} style={{ display: recipe.analyzedInstructions[0] !== undefined ? `flex` : `none` }}/>
          <div className={css.instructions}>
            <div className={`${css.text} ${com.noSelect}`}>
              {
                recipe.analyzedInstructions[0] !== undefined ?
                <b>Instructions: </b> :
                 null
              }
            </div>
              {
                recipe.analyzedInstructions[0] !== undefined && Object.prototype.toString.call( recipe.analyzedInstructions[0] ) === '[object Object]' ?
                recipe.analyzedInstructions[0].steps!.map((e: any, index: any) => {
                  return (
                    <div key={index} className={`${css.eachStep} ${com.noSelect}`}>
                      <div className={css.eachStepTitle}>
                        <b>Step {++index}: </b>
                      </div>
                      <div className={css.eachStepContent}>
                        {e.step}
                      </div>
                    </div>
                  )
                }) :
                recipe.analyzedInstructions[0] !== undefined && Object.prototype.toString.call( recipe.analyzedInstructions[0] ) !== '[object Object]' ?
                recipe.analyzedInstructions.map((e: any, index: any) => {
                  return (
                    <div key={index} className={`${css.eachStep} ${com.noSelect}`}>
                      <div className={css.eachStepTitle}>
                        <b>Step {++index}: </b>
                      </div>
                      <div className={css.eachStepContent}>
                        {e}
                      </div>
                    </div>
                  )
                }) :
                null
              }
          </div>
        </div>
      </div>
    )
  } else if (goOn && toShow[0] !== undefined && recipe === undefined) {
    return (
      <div className={css.backgroundError}>
        <div className={css.errorCard}>
          <b>THERE ARE NO MATCHING RECIPES WITH THAT ID !</b>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              className={css.button}
            >GO BACK !
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  else return (
    <div style={{ marginTop: menuShown ? '150px' : '100px' }}>
      <div className={css.loading}>Loading..</div>
    </div>
  )
}