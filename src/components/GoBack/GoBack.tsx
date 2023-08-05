import React, { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/GoBackSX';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import { 
  setIndexChoosen, filter
} from '../../actions';
import dietss from '../../db/diets.json';

const GoBack = () =>  {

  return (
   <Box sx={s.background}>
      <Box sx={s.logoTextContainer}>
        <Link to="/">
          <Box component="img" sx={s.logo} src={logo} alt=""></Box>
        </Link>
        <Link style={s.linkLink()} to="/">
          <Typography sx={s.linkText}>Go Back !</Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default GoBack;