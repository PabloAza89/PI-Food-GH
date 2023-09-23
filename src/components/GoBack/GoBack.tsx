import React, { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/GoBackSX';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { 
  setIndexChoosen, filter
} from '../../actions';
import dietss from '../../db/diets.json';

const GoBack = ({ recipeCreated }: any) =>  {

  //console.log("recipeCreated", recipeCreated)

  const location = useLocation()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState<boolean>( location.state && location.state.editing ? true : false );

  console.log("location.state", location.state && location.state)
  console.log("location.pathname", location.pathname)
  //console.log("location.pathname", location.pathname.toLowerCase() === `myrecipe`,  location.state && location.state === )
  console.log("location.pathname", location.pathname.toLowerCase() === `/myrecipe`, "isEditing", isEditing)

  // useEffect(() => {
  //   if (location.pathname.toLowerCase() === `/myrecipe` && isEditing) {
  //     Swal.fire({
  //       title: 'Do you want go back and cancel editing ?',
  //       text: 'Every changes you have made gonna be lost.',
  //       icon: 'info',
  //       showDenyButton: true,
  //       showCancelButton: false,
  //       confirmButtonText: 'CANCEL EDITING',
  //       denyButtonText: `CONTINUE EDITING`,
  //     })
  //   }
  // },[])

  const handleReturn = () => {
    if (location.pathname.toLowerCase() === `/myrecipe` && isEditing ) {
      Swal.fire({
        title: 'Do you want to cancel editing and go back ?',
        text: 'Any changes you have made gonna be lost.',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'CANCEL EDITING',
        denyButtonText: `CONTINUE EDITING`,
        confirmButtonColor: '#d14141', // NEW ACTION COLOR
        denyButtonColor: '#3085d6' // NO ACTION COLOR
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/")
        }
      })
    } else navigate("/")
  }  

  // useEffect(() => {

  // },[])

  console.log("recipeCreated", recipeCreated)

  return (
    <Box sx={s.background}>
      <Box onClick={() => handleReturn()} sx={s.logoTextContainer}>
        <Box component="img" sx={s.logo} src={logo} alt=""/>
        <Typography sx={s.linkText}>Go Back !</Typography>
      </Box>
    </Box>
  );
}

export default GoBack;