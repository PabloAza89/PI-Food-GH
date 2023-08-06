import { useParams } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import "../../styles/Detail.css";
import * as s from "../../styles/DetailSX";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { Box, Button, TextField, Dialog, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';

export default function Detail() {

  let arrImages = [noImage1, noImage2, noImage3]

  const params = useParams()

  interface recipesI {
    id: any,
    title: any,
    diets: any,
    healthScore: any,
    summary: any,
    analyzedInstructions: any,
    image: any,
    dishTypes: any,
  }

  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)
  const recipe = allRecipes.filter((c:any) => parseInt(params.recipeId!) === c.id && parseInt(params.recipeId!).toString().length === params.recipeId!.length)[0]

  function regexInSummary(text: any) {
      return text.replaceAll(/(<[/]b>|<b>|<[/]a>|<a\b[^>]*>|[/]a>)/g, '');
  }

  if (recipe) {
    return (
      <Box sx={s.background}>
        <Box sx={s.card}>
          <Box component="img" sx={s.image} src={recipe.image.length > 1 ? recipe.image : arrImages[recipe.image] } alt="" />
          <Typography sx={s.text}><b>Title: </b>{recipe.title}</Typography>
          <Typography sx={s.text}>
            <b>Diets: </b>
            {recipe.diets[0] && recipe.diets.map((e:any) => {
              if ((recipe.diets.indexOf(e) !== recipe.diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            })}
          </Typography>
          <Typography sx={s.text}>
            <b>Healt Score: </b>{recipe.healthScore}
          </Typography>
          <Typography sx={s.text}>
            <b>Dish Types: </b>
            {recipe.dishTypes && recipe.dishTypes.map((e:any) => {
              if ((recipe.dishTypes.indexOf(e) !== recipe.dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            })}
          </Typography>
          <Typography sx={s.text}>
            <b>Summary: </b>
            {regexInSummary(recipe.summary)}
          </Typography>
          <Box sx={s.instructions}>
            <Typography sx={s.text}><b>{recipe.analyzedInstructions[0] ? `Instructions: ` : null}</b></Typography>
              {recipe.analyzedInstructions && recipe.analyzedInstructions.map((e: any, index: any) => {
                return (
                  <Box sx={s.eachStep}>
                    <Typography sx={s.eachStepTitle}>
                      <b>Step {++index}: </b>
                    </Typography>
                    <Typography sx={s.eachStepContent}>
                      {e}
                    </Typography>
                  </Box>
                )
              })}
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
          <Button sx={s.button} className="button">GO BACK !</Button>
        </Link>
      </Box>
    </Box>
  )
}