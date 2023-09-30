import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import "../../styles/Detail.css";
import * as s from "../../styles/DetailSX";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import notAvailable from "../../images/notAvailable.jpg";
import { handleDelete, handleEdit } from '../CommonsFunc/CommonsFunc';
import { Link } from "react-router-dom";
import { Box, Button, Divider, Typography } from '@mui/material/';
import { recipesI } from '../../interfaces/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB, getDishesFromDB
} from '../../actions';

export default function Detail({ userData, retrieveLogin, retrieveRecipeNotFound }: any) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const params = useParams()

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

  if (recipe !== undefined) {
    return (
      <Box sx={s.background}>
        <Box sx={s.card}>
          <Box
            sx={s.editDeleteContainer({ show: recipe.userRecipe && userData.email === recipe.email ? true : false })}
          >
            <Button
              className={`linkButton`}
              variant="contained"
              sx={s.buttonEditDelete}
              onClick={() => handleDelete({ id: recipe.id, fd_tkn: userData.fd_tkn, retrieveLogin, handleReload })}
            >
              <ClearIcon sx={s.iconDelete} />
            </Button>
            <Button
              className={`linkButton`}
              variant="contained"
              sx={s.buttonEditDelete}
              onClick={() => handleEdit({
                navigate, id: recipe.id, title: recipe.title, image: recipe.image,
                healthScore: recipe.healthScore, diets: recipe.diets, email: recipe.email,
                dishTypes: recipe.dishTypes, userRecipe: recipe.userRecipe,
                summary: recipe.summary, analyzedInstructions: recipe.analyzedInstructions
              })}
            >
              <EditIcon sx={s.iconEdit} />
            </Button>
          </Box>
          <Box
            component="img"
            sx={s.image}
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
          <Typography sx={s.text}><b>Title: </b>{recipe.title}</Typography>
          <Typography sx={s.text}>
            <b>Diets: </b>
            {
              recipe.diets[0] !== undefined ?
              recipe.diets[0] && recipe.diets.map((e:any) => {
                if ((recipe.diets.indexOf(e) !== recipe.diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              }) :
              `Not specified`
            }
          </Typography>
          <Typography sx={s.text}>
            <b>Healt Score: </b>{recipe.healthScore}
          </Typography>
          <Typography sx={s.text}>
            <b>Dish Types: </b>
            {
              recipe.dishTypes[0] !== undefined ?
              recipe.dishTypes.map((e:any) => {
                if ((recipe.dishTypes.indexOf(e) !== recipe.dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              }) :
              `Not specified`
            }
          </Typography>
          <Divider sx={s.dividerTop}/>
          <Typography sx={s.text}>
            <b>Summary: </b>
            {regexInSummary(recipe.summary)}
          </Typography>
          <Divider sx={s.dividerBottom({ show: recipe.analyzedInstructions[0] !== undefined ? true : false })}/>
          <Box sx={s.instructions}>
            <Typography sx={s.text}>
              {
                recipe.analyzedInstructions[0] !== undefined ?
                <b>Instructions: </b> :
                 null
              }
            </Typography>
              {
                recipe.analyzedInstructions[0] !== undefined && Object.prototype.toString.call( recipe.analyzedInstructions[0] ) === '[object Object]' ?
                recipe.analyzedInstructions[0].steps!.map((e: any, index: any) => {
                  return (
                    <Box key={index} sx={s.eachStep}>
                      <Typography sx={s.eachStepTitle}>
                        <b>Step {++index}: </b>
                      </Typography>
                      <Typography sx={s.eachStepContent}>
                        {e.step}
                      </Typography>
                    </Box>
                  )
                }) :
                recipe.analyzedInstructions[0] !== undefined && Object.prototype.toString.call( recipe.analyzedInstructions[0] ) !== '[object Object]' ?
                recipe.analyzedInstructions.map((e: any, index: any) => {
                  return (
                    <Box key={index} sx={s.eachStep}>
                      <Typography sx={s.eachStepTitle}>
                        <b>Step {++index}: </b>
                      </Typography>
                      <Typography sx={s.eachStepContent}>
                        {e}
                      </Typography>
                    </Box>
                  )
                }) :
                null
              }
          </Box>
        </Box>
        <Box sx={s.helperBottom}></Box>
      </Box>
    )
  } else return (
    <Box sx={s.backgroundError}>
      <Box sx={s.errorCard}>
        <b>THERE ARE NO MATCHING RECIPES WITH THAT ID !</b>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={s.button}
          >GO BACK !
          </Button>
        </Link>
      </Box>
    </Box>
  )
}