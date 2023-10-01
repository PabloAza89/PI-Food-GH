import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/GoBackSX';
import Swal from 'sweetalert2';
import { Box, Typography } from '@mui/material/';

interface GoBackI {
  recipeCreatedOrEdited?: boolean,
  recipeNotFound?: boolean
}

const GoBack = ({ recipeCreatedOrEdited, recipeNotFound }: GoBackI) =>  {

  const location = useLocation()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState<boolean>( location.state && location.state.editing ? true : false );

  const handleReturn = () => {
    if (location.pathname.toLowerCase() === `/myrecipe` && isEditing && !recipeCreatedOrEdited) {
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
        if (result.isConfirmed) navigate("/")
      })
    } 
    else if (location.pathname.toLowerCase() === `/myrecipe` && !isEditing && !recipeCreatedOrEdited) {
      Swal.fire({
        title: 'Do you want to cancel create a new recipe and go back ?',
        text: `Don't worry about everything you wrote, it will be saved in browser memory :)`,
        icon: 'info',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'CANCEL CREATING',
        denyButtonText: `CONTINUE CREATING`,
        confirmButtonColor: '#d14141', // NEW ACTION COLOR
        denyButtonColor: '#3085d6' // NO ACTION COLOR
      })
      .then((result) => {
        if (result.isConfirmed) navigate("/")
      })
    }
    else navigate("/")
  }

  return (
    <Box onClick={() => handleReturn()}sx={s.background({ recipeNotFound })}>
      <Box component="img" sx={s.logo} src={logo} alt=""/>
    {
      location.pathname.toLowerCase() === `/myrecipe`  ?
      <Box sx={s.columnContainer}>
        <Box sx={s.letters}>
          <Box>G</Box><Box>o</Box><Box sx={{ marginTop: '13px' }} /><Box>B</Box><Box>a</Box><Box>c</Box><Box sx={{ marginTop: '2px' }}>k</Box>
        </Box>
        <Box sx={s.exclamationMarkContainer}>
          <Box sx={s.exclamationMark}>!</Box>
        </Box>
      </Box> :
      `G<br/>o<br/><br/>B<br/>a<br/>c<br/>k<br/>!`
    }
    </Box>
  );
}

export default GoBack;