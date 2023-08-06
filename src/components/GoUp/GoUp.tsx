import React, { useState, useEffect } from "react";
import '../../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as s from '../../styles/GoUpSX';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import {
  setIndexChoosen, filter, setMenuShown
} from '../../actions';
import dietss from '../../db/diets.json';
import $ from 'jquery';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';

const GoUp = () =>  {
  
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)

  return (
    <Button
      onClick={() => $(window).scrollTop(0)}
      sx={s.button({ scrollPosition })}
    >
      <TurnLeftIcon sx={{ fontSize: 35 }} />
    </Button>
  );
}

export default GoUp;