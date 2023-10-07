import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import css from "./DetailCSS.module.css";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import notAvailable from "../../images/notAvailable.jpg";
import { handleDelete, handleEdit } from '../../commons/commonsFunc';
import { Link, useLocation } from "react-router-dom";
import { Button } from '@mui/material/';
import { recipesI } from '../../interfaces/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB,
  getDishesFromDB, setHasScroll, setMenuShown
} from '../../actions';
import $ from 'jquery';

export default function Detail({ userData, retrieveLogin, retrieveRecipeNotFound }: any) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  const params = useParams()

  const hasScroll = useSelector((state: {hasScroll:boolean}) => state.hasScroll)
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const currentWidth = useSelector((state: {currentWidth:number}) => state.currentWidth)

  let arrImages = [noImage1, noImage2, noImage3]
  const [ brokenImage, setBrokenImage ] = useState<boolean>(false)

  const reloadRecipes = async () => {
    dispatch(getDietsFromDB())
    dispatch(getDishesFromDB())
    dispatch(fetchRecipesFromAPI())
  }

  const handleReload = (props: any) => {
    if (props.statusResponse === 200 && props.messageResponse === `1 item deleted`) {
      reloadRecipes().then(() => dispatch(allRecipesLoaded(true)))
    }
  }

  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)
  const recipe = allRecipes.filter((c:any) => params.recipeId! === c.id.toString() && params.recipeId!.toString().length === params.recipeId!.length)[0]

  function regexInSummary(text: any) { return text.replaceAll(/(<[/]b>|<b>|<[/]a>|<a\b[^>]*>|[/]a>)/g, '') }

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

  useEffect(() => {
    if (recipe) retrieveRecipeNotFound(false)
    else retrieveRecipeNotFound(true)
  },[recipe, retrieveRecipeNotFound])

  useEffect(() => {
    dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
    dispatch(setMenuShown(false))
  },[dispatch])

  

  //console.log("NN window.innerWidth", window.innerWidth)
  //console.log("NN $('body').width()", $('body').width())
  
  $(window).scrollTop(0)

  //let recipee = undefined // DEV

  if (recipe !== undefined) {
    return (
      <div
        className={css.container}
        style={{
          marginRight: hasScroll ? `${16 + scrollWidth}px` : `16px`
        }}
      >
      
        <div className={css.card}>
          <div
            id={css.editDeleteContainer}
            style={{
              display:
                recipe.userRecipe && userData.email === recipe.email ?
                `flex` :
                `none`,
              flexDirection: currentWidth <= 535 ? 'row-reverse' : 'column'
            }}
            //style={{ display: `none` }}
          >
            <Button
              variant="contained"
              id={css.buttonEditDelete}
              onClick={() => handleDelete({ id: recipe.id, fd_tkn: userData.fd_tkn, retrieveLogin, handleReload })}
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
            className={css.image}
            style={{
              marginTop: currentWidth <= 535 && userData.email === recipe.email ? '24px' : '0px' // 24 === 40 - 16
            }}
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
          <div className={css.text}><b>Title: </b>{recipe.title}</div>
          <div className={css.text}>
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
          <div className={css.text}>
            <b>Healt Score: </b>{recipe.healthScore}
          </div>
          <div className={css.text}>
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
          <div className={css.text}>
            <b>Summary: </b>
            {regexInSummary(recipe.summary)}
          </div>
          <hr className={css.divider} style={{ display: recipe.analyzedInstructions[0] !== undefined ? `flex` : `none` }}/>
          <div className={css.instructions}>
            <div className={css.text}>
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
                    <div key={index} className={css.eachStep}>
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
                    <div key={index} className={css.eachStep}>
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
        {/* <div className={css.helperBottom}></div> */}
      
      </div>
    )
  } else return (
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