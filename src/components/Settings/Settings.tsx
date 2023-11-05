import { useEffect, useState } from "react";
import css from "./SettingsCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormControlLabel, Switch } from '@mui/material/';
import SettingsIcon from '@mui/icons-material/Settings';
import { easings } from '../../commons/easingsCSS';
import $ from 'jquery';
import { serverStatusI } from '../../interfaces/interfaces';
import { setServerStatusShown } from '../../actions';

const Settings = () =>  {

  const dispatch = useDispatch()
  easings() // JQuery easings..

  const serverStatus = useSelector((state: { serverStatus: serverStatusI }) => state.serverStatus)
  const serverStatusShown = useSelector((state: { serverStatusShown: boolean }) => state.serverStatusShown)
  //const serverStatusShown = true // DEV

  let showStatusLS: string | null = localStorage.getItem('showStatus');
  let showUserRecipesLS: string | null = localStorage.getItem('showUserRecipes');
  let showOnlineRecipesLS: string | null = localStorage.getItem('showOnlineRecipes');
  let showOfflineRecipesLS: string | null = localStorage.getItem('showOfflineRecipes');

  const [ showStatus, setShowStatus ] = useState(true)
  const [ showUserRecipes, setShowUserRecipes ] = useState(true)
  const [ showOnlineRecipes, setShowOnlineRecipes ] = useState(true)
  const [ showOfflineRecipes, setShowOfflineRecipes ] = useState(true)

  useEffect(() => { // CHECK LS VALUES
    if (showStatusLS !== null) setShowStatus(JSON.parse(showStatusLS))
    if (showUserRecipesLS !== null) setShowUserRecipes(JSON.parse(showUserRecipesLS))
    if (showOnlineRecipesLS !== null) setShowOnlineRecipes(JSON.parse(showOnlineRecipesLS))
    if (showOfflineRecipesLS !== null) setShowOfflineRecipes(JSON.parse(showOfflineRecipesLS))
  },[])

  return (
    <div className={css.background}>
      <div className={css.eachRow}>
        <Switch
          onClick={() => { setShowStatus(!showStatus); localStorage.setItem('showStatus', JSON.stringify(!showStatus)) }}
          checked={ showStatus ? true : false }
          className={css.switch}
          classes={{
            track: showStatus ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
            thumb: css.thumb,
            switchBase:  css.switchBase,
            checked: css.checked,
            colorPrimary: css.colorPrimary
          }}
        />
        <div className={css.text}>Show SERVER STATUS info</div>
      </div>
      <div className={css.eachRow}>
        <Switch
          onClick={() => { setShowUserRecipes(!showUserRecipes); localStorage.setItem('showUserRecipes', JSON.stringify(!showUserRecipes)) }}
          checked={ showUserRecipes ? true : false }
          className={css.switch}
          classes={{
            track: showUserRecipes ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
            thumb: css.thumb,
            switchBase:  css.switchBase,
            checked: css.checked,
            colorPrimary: css.colorPrimary
          }}
        />
        <div className={css.text}>Show User Recipes</div>
      </div>
      <div className={css.eachRow}>
        <Switch
          onClick={() => { setShowOnlineRecipes(!showOnlineRecipes); localStorage.setItem('showOnlineRecipes', JSON.stringify(!showOnlineRecipes)) }}
          checked={ showOnlineRecipes ? true : false }
          className={css.switch}
          classes={{
            track: showOnlineRecipes ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
            thumb: css.thumb,
            switchBase:  css.switchBase,
            checked: css.checked,
            colorPrimary: css.colorPrimary
          }}
        />
        <div className={css.text}>Show Online Database Recipes</div>
      </div>
      <div className={css.eachRow}>
        <Switch
          onClick={() => { setShowOfflineRecipes(!showOfflineRecipes); localStorage.setItem('showOfflineRecipes', JSON.stringify(!showOfflineRecipes)) }}
          checked={ showOfflineRecipes ? true : false }
          className={css.switch}
          classes={{
            track: showOfflineRecipes ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
            thumb: css.thumb,
            switchBase:  css.switchBase,
            checked: css.checked,
            colorPrimary: css.colorPrimary
          }}
        />
        <div className={css.text}>Show Offline Database Recipes</div>
      </div>
    </div>
  );
}

export default Settings;