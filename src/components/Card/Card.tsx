import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import notAvailable from "../../images/notAvailable.jpg";
import Swal from 'sweetalert2';
import { Box, Typography, Button, Divider } from '@mui/material';
import Tooltip from '@mui/joy/Tooltip';
import * as s from "../../styles/CardSX";
import $ from 'jquery';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB, getDishesFromDB
} from '../../actions';

interface CardI {
  id: string | number,
  image: string,
  title: string,
  healthScore: number,
  diets: any,
  dishTypes: any
  userRecipe: boolean,
  email: string,
  userData: any,
  retrieveLogin: any
  summary: any
  analyzedInstructions: any
}

const Card = ({
  id, image, title, healthScore , diets, email,
  dishTypes, userRecipe, userData, retrieveLogin,
  summary, analyzedInstructions
}: CardI) => {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  

  const reloadRecipes = async () => {
    dispatch(getDietsFromDB())
    dispatch(getDishesFromDB())
    dispatch(fetchRecipesFromAPI())
  }

  let arrImages = [noImage1, noImage2, noImage3]

  const [ fitTitle, setFitTitle ] = useState<boolean>(true)
  const [ fitDiet, setFitDiet ] = useState<boolean>(true)
  const [ fitDish, setFitDish ] = useState<boolean>(true)
  const [ brokenImage, setBrokenImage ] = useState<boolean>(false)

  $(function(){
    $(`.dietCard${id}`).prop(`scrollWidth`) > $(`.dietCard${id}`).innerWidth()! ? setFitDiet(false) : setFitDiet(true)
    $(`.titleCard${id}`).prop(`scrollWidth`) > $(`.titleCard${id}`).innerWidth()! ? setFitTitle(false) : setFitTitle(true)
    $(`.dishCard${id}`).prop(`scrollWidth`) > $(`.dishCard${id}`).innerWidth()! ? setFitDish(false) : setFitDish(true)
  })

  if (userRecipe && image.length > 1) {
    fetch( `https://res.cloudinary.com/dtembdocm/image/upload/` + image, {
      headers: { 'Cache-Control': 'no-cache' }
    })
    .then((res) => {
      if (res.ok) setBrokenImage(false)
      else setBrokenImage(true)
    })
    .catch((err) => { console.error(err) })
  }

  async function handleEdit(e:any) {

    Swal.fire({
      title: 'Do you want to edit this recipe ?',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'EDIT',
      denyButtonText: `CANCEL`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigate("/MyRecipe", {
          state: {
            editing: true,
            id,
            title,
            image,
            healthScore,
            diets,
            email,
            dishTypes,
            userRecipe,
            summary,
            analyzedInstructions
            //userData,
            //retrieveLogin
          }
        });
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
            id: id,
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

  return (
    <Box sx={s.background}>
      <Box
        sx={s.editDeleteContainer({ show: userRecipe && userData.email === email ? true : false })}
      >
        <Button
          className={`linkButton`}
          variant="contained"
          sx={s.buttonEditDelete}
          onClick={(e) => handleEdit(e)}
        >
          <EditIcon sx={s.iconEdit} />
        </Button>
        <Button
          className={`linkButton`}
          variant="contained"
          sx={s.buttonEditDelete}
          onClick={(e) => handleDelete(e)}
        >
          <ClearIcon sx={s.iconDelete} />
        </Button>
      </Box>
      <Link to={`/${id}`}>
        <Box
          component="img"
          sx={s.image}
          src={
            brokenImage ?
            notAvailable :
            userRecipe && image.length === 1 ?
            arrImages[parseInt(image, 10) - 1] :
            userRecipe && image.length > 1 ?
            `https://res.cloudinary.com/dtembdocm/image/upload/` + image :
            image
          }
          alt=""
        />
      </Link>
      <Link style={{ textDecoration: 'none' }} to={`/${id}`}>
        <Tooltip
          arrow
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={200}
          enterTouchDelay={0}
          disableFocusListener={fitTitle}
          disableHoverListener={fitTitle}
          placement="bottom"
          title={title}
        >
          <Typography className={`titleCard${id}`} sx={s.title}>{title}</Typography>
        </Tooltip>
      </Link>
      <Tooltip
        arrow
        enterDelay={700}
        enterNextDelay={700}
        leaveDelay={200}
        enterTouchDelay={0}
        disableFocusListener={fitDiet}
        disableHoverListener={fitDiet}
        placement="bottom"
        title={
          <Box>
            <b>Diets: </b>
            {diets[0] && diets.map((e:any) => {
              if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            })}
          </Box>
        }
      >
        <Typography
          className={`dietCard${id}`}
          sx={s.text}
        >
          <b>Diets: </b>
          {
            diets[0] !== undefined ?
            diets.map((e:any) => {
              if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            }) :
            `Not specified`
          }
        </Typography>
      </Tooltip>
      <Typography sx={s.text}>
        <b>Healt Score: </b>{healthScore}
      </Typography>
      <Tooltip
          arrow
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={200}
          enterTouchDelay={0}
          disableFocusListener={fitDish}
          disableHoverListener={fitDish}
          placement="bottom"
          title={
            <Box>
              <b>Dish Types: </b>
              {dishTypes && dishTypes.map((e:any) => {
                if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              })}
            </Box>
          }
      >
        <Typography
          className={`dishCard${id}`}
          sx={s.text}
        >
          <b>Dish Types: </b>
          {
            dishTypes[0] !== undefined ?
            dishTypes.map((e:any) => {
              if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            }) :
            `Not specified`
          }
        </Typography>
      </Tooltip>
    </Box>
  );
}

export default Card;