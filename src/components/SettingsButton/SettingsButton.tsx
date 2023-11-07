import { useEffect, useState } from "react";
import css from "./SettingsButtonCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormControlLabel, Switch } from '@mui/material/';
import SettingsIcon from '@mui/icons-material/Settings';
import { easings } from '../../commons/easingsCSS';
import $ from 'jquery';
import { serverStatusI } from '../../interfaces/interfaces';
import { setServerStatusShown } from '../../actions';

const SettingsButton = () =>  {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  easings() // JQuery easings..

  const inHome = useMatch("/")?.pattern.path === "/" ? true : false; // "/" === Home
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  const serverStatus = useSelector((state: { serverStatus: serverStatusI }) => state.serverStatus)
  const serverStatusShown = useSelector((state: { serverStatusShown: boolean }) => state.serverStatusShown)
  //const serverStatusShown = true // DEV

  return (
    <div
      className={css.background}
      style={{
        /* position: inHome ? 'absolute' : 'fixed', */
        visibility: menuShown ? 'visible' : 'hidden'
      }}
    >
      <Button
        variant="contained"
        className={css.buttonIn}
        onClick={() => navigate("/Settings")}
      >
        <SettingsIcon className={css.iconEdit} />
      </Button>
    </div>
  );
}

export default SettingsButton;