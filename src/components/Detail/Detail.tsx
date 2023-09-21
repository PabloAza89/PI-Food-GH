import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import "../../styles/Detail.css";
import * as s from "../../styles/DetailSX";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import notAvailable from "../../images/notAvailable.jpg";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { Box, Button, TextField, Dialog, Divider, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { recipesI } from '../../interfaces/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB, getDishesFromDB
} from '../../actions';

export default function Detail({ userData, retrieveLogin }: any) {

  const dispatch = useDispatch()

  let arrImages = [noImage1, noImage2, noImage3]
  const [ brokenImage, setBrokenImage ] = useState<boolean>(false)

  const reloadRecipes = async () => {
    dispatch(getDietsFromDB())
    dispatch(getDishesFromDB())
    dispatch(fetchRecipesFromAPI())
  }

  const params = useParams()

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

  console.log("RECIPE", recipe)

  function handleDelete(e:any) {

    Swal.fire({
      title: 'Are you sure do you want to delete this recipe ?',
      text: 'No undo.',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'DELETE',
      denyButtonText: `CANCEL`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/delete`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            id: recipe.id,
            //email: userData.email,
            fd_tkn: userData.fd_tkn
          })
        })
        .then((res) => res.json())
        .then((res) => {
          console.log("RES RES", res)
          if (res.status === 400 && res.message === 'Invalid Credentials') {
            console.log("PASS BY THIS WAY")
            retrieveLogin({ email: '', fd_tkn: '' })
            Swal.fire({
              title: `There was an error when cheking your loggin.. `,
              text: `Please, log in again.`,
              icon: 'info',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 3000,
            })
            //setSaveButtonDisabled(false)
            //setAllDisabled(false)
          }
          if (res.status === 400 && res.message === `0 item deleted`) {
            Swal.fire({
              title: `There was and error..`,
              html: `Please, try again.`,
              icon: 'info',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 3000,
            })
          }
          if (res.status === 200 && res.message === `1 item deleted`) {
            Swal.fire({
              title: `Recipe deleted successfully..`,
              //html: `No undo.`,
              icon: 'success',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 3000,
            })
            reloadRecipes()
            .then(() => dispatch(allRecipesLoaded(true)))
            // .then(() => {
            //   Swal.fire({
            //     title: 'All cleared !',
            //     showConfirmButton: false,
            //     icon: 'success',
            //     timer: 1000,
            //   })
            // })
          }
        })
      }
    })
    .catch((rej) => {
      console.log("rej", rej)
      Swal.fire({
        title: `It's seems like server its sleeping..`,
        html: `So you cannot save your recipe.<br>We are sorry. Please try againg later..<br><br>Don't worry about everything you wrote, it will be saved in browser memory :) `,
        icon: 'error',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        timer: 3000,
      })
    })
  }

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
              onClick={(e) => handleDelete(e)}
            >
              <ClearIcon sx={s.iconDelete} />
            </Button>
            <Button
              className={`linkButton`}
              variant="contained"
              sx={s.buttonEditDelete}
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