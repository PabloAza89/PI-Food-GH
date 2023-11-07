import { useEffect, useState } from "react";
import css from "./SettingsCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button, FormControlLabel, Switch, Typography } from '@mui/material/';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { easings } from '../../commons/easingsCSS';
import $ from 'jquery';
import { serverStatusI, settingsFiltersI } from '../../interfaces/interfaces';
import {
  setShowStatus, setShowUserRecipes,
  setShowOnlineRecipes, setShowOfflineRecipes,
  setSettingsFilters, applyFilters
} from '../../actions';

const Settings = () =>  {

  const dispatch = useDispatch()
  easings() // JQuery easings..

  const settingsFilters = useSelector((state: { settingsFilters:settingsFiltersI }) => state.settingsFilters)

  const [ expandStatus, setExpandStatus ] = useState(false)
  const [ expandUser, setExpandUser ] = useState(false)
  const [ expandOnline, setExpandOnline ] = useState(false)
  const [ expandOffline, setExpandOffline ] = useState(false)

  const settingsFiltersHandler = ({ type }: any) => {
    switch (type) {
      case 'showStatus':
        dispatch(setSettingsFilters({ type: type, value: !settingsFilters.showStatus }))
        localStorage.setItem('showStatus', JSON.stringify(!settingsFilters.showStatus))
      break;
      case 'showUserRecipes':
        dispatch(setSettingsFilters({ type: type, value: !settingsFilters.showUserRecipes }))
        localStorage.setItem('showUserRecipes', JSON.stringify(!settingsFilters.showUserRecipes))
        dispatch(applyFilters())
      break;
      case 'showOnlineRecipes':
        dispatch(setSettingsFilters({ type: type, value: !settingsFilters.showOnlineRecipes }))
        localStorage.setItem('showOnlineRecipes', JSON.stringify(!settingsFilters.showOnlineRecipes))
        dispatch(applyFilters())
      break;
      case 'showOfflineRecipes':
        dispatch(setSettingsFilters({ type: type, value: !settingsFilters.showOfflineRecipes }))
        localStorage.setItem('showOfflineRecipes', JSON.stringify(!settingsFilters.showOfflineRecipes))
        dispatch(applyFilters())
      break;
    }
  }

  return (
    <div className={css.background}>
      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandStatus}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandStatus(!expandStatus))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showStatus' })}
              checked={ settingsFilters.showStatus ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showStatus ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Show SERVER STATUS</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Show/Hide right-side button SERVER STATUS. The component displays the current server detailed status.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandUser}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandUser(!expandUser))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showUserRecipes' })}
              checked={ settingsFilters.showUserRecipes ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showUserRecipes ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Show User Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Show/Hide recipes made by users, as long as the Server is Online.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandOnline}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandOnline(!expandOnline))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showOnlineRecipes' })}
              checked={ settingsFilters.showOnlineRecipes ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showOnlineRecipes ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Show Online Database Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Show/Hide third-part recipes when server is Online.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandOffline}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandOffline(!expandOffline))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showOfflineRecipes' })}
              checked={ settingsFilters.showOfflineRecipes ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showOfflineRecipes ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Show Offline Database Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
            Show/Hide third-part recipes when server is Offline.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Settings;