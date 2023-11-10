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
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Settings = () =>  {

  const dispatch = useDispatch()
  easings() // JQuery easings..

  const settingsFilters = useSelector((state: { settingsFilters:settingsFiltersI }) => state.settingsFilters)

  const toShow = useSelector((state: { toShow:any }) => state.toShow)

  console.log("toShow", toShow)

  const [ expandStatus, setExpandStatus ] = useState(false)
  const [ expandUser, setExpandUser ] = useState(false)
  const [ expandUserNumber, setExpandUserNumber ] = useState(false)
  const [ expandOnline, setExpandOnline ] = useState(false)
  const [ expandOnlineNumber, setExpandOnlineNumber ] = useState(false)
  const [ expandOffline, setExpandOffline ] = useState(false)
  const [ expandOfflineNumber, setExpandOfflineNumber ] = useState(false)

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

  const quantityUserRecipesHandler = ({ type, value }: any) => {
    switch (type) {
      case 'decrementButton':
        dispatch(setSettingsFilters({ type: `quantityUserRecipes`, value: settingsFilters.quantityUserRecipes - 1 }))
        localStorage.setItem('quantityUserRecipes', JSON.stringify(settingsFilters.quantityUserRecipes - 1))
      break;
      case 'incrementButton':
        dispatch(setSettingsFilters({ type: `quantityUserRecipes`, value: settingsFilters.quantityUserRecipes + 1 }))
        localStorage.setItem('quantityUserRecipes', JSON.stringify(settingsFilters.quantityUserRecipes + 1))
      break;
      case 'directChange':
        if (parseInt(value, 10) > 100) {
          dispatch(setSettingsFilters({ type: `quantityUserRecipes`, value: 100 }))
          localStorage.setItem('quantityUserRecipes', JSON.stringify(100))
        }
        else if (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100) {
          dispatch(setSettingsFilters({ type: `quantityUserRecipes`, value: parseInt(value, 10) }))
          localStorage.setItem('quantityUserRecipes', JSON.stringify(parseInt(value, 10)))
        }
    }
  }

  const quantityOnlineRecipesHandler = ({ type, value }: any) => {
    switch (type) {
      case 'decrementButton':
        dispatch(setSettingsFilters({ type: `quantityOnlineRecipes`, value: settingsFilters.quantityOnlineRecipes - 1 }))
        localStorage.setItem('quantityOnlineRecipes', JSON.stringify(settingsFilters.quantityOnlineRecipes - 1))
      break;
      case 'incrementButton':
        dispatch(setSettingsFilters({ type: `quantityOnlineRecipes`, value: settingsFilters.quantityOnlineRecipes + 1 }))
        localStorage.setItem('quantityOnlineRecipes', JSON.stringify(settingsFilters.quantityOnlineRecipes + 1))
      break;
      case 'directChange':
        if (parseInt(value, 10) > 100) {
          dispatch(setSettingsFilters({ type: `quantityOnlineRecipes`, value: 100 }))
          localStorage.setItem('quantityOnlineRecipes', JSON.stringify(100))
        }
        else if (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100) {
          dispatch(setSettingsFilters({ type: `quantityOnlineRecipes`, value: parseInt(value, 10) }))
          localStorage.setItem('quantityOnlineRecipes', JSON.stringify(parseInt(value, 10)))
        }
    }
  }

  const quantityOfflineRecipesHandler = ({ type, value }: any) => {
    switch (type) {
      case 'decrementButton':
        dispatch(setSettingsFilters({ type: `quantityOfflineRecipes`, value: settingsFilters.quantityOfflineRecipes - 1 }))
        localStorage.setItem('quantityOfflineRecipes', JSON.stringify(settingsFilters.quantityOfflineRecipes - 1))
      break;
      case 'incrementButton':
        dispatch(setSettingsFilters({ type: `quantityOfflineRecipes`, value: settingsFilters.quantityOfflineRecipes + 1 }))
        localStorage.setItem('quantityOfflineRecipes', JSON.stringify(settingsFilters.quantityOfflineRecipes + 1))
      break;
      case 'directChange':
        if (parseInt(value, 10) > 100) {
          dispatch(setSettingsFilters({ type: `quantityOfflineRecipes`, value: 100 }))
          localStorage.setItem('quantityOfflineRecipes', JSON.stringify(100))
        }
        else if (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100) {
          dispatch(setSettingsFilters({ type: `quantityOfflineRecipes`, value: parseInt(value, 10) }))
          localStorage.setItem('quantityOfflineRecipes', JSON.stringify(parseInt(value, 10)))
        }
    }
  }

  $('.numberInputOnline').on('keypress', function (event) {
    if (!RegExp(/^[0-9]$/g).test(event.key)) {
      event.preventDefault();
      return false;
    }
  })

  $('.numberInputOffline').on('keypress', function (event) {
    if (!RegExp(/^[0-9]$/g).test(event.key)) {
      event.preventDefault();
      return false;
    }
  })

  $('.numberInputUser').on('keypress', function (event) {
    if (!RegExp(/^[0-9]$/g).test(event.key)) {
      event.preventDefault();
      return false;
    }
  })

  useEffect(() => {
    if (settingsFilters.quantityUserRecipes === 0) {
      $('#decrementUser')
        .css("background", "rgba(0, 0, 0, 0.2)")
        .css("color", "rgba(0, 0, 0, 0.2)")
        .css("cursor", "default")
    }
    else if (settingsFilters.quantityUserRecipes === 100) {
      $('#incrementUser')
        .css("background", "rgba(0, 0, 0, 0.2)")
        .css("color", "rgba(0, 0, 0, 0.2)")
        .css("cursor", "default")
    }
    else {
      $('#incrementUser, #decrementUser')
        .css("background", "#78909c")
        .css("color", "#212121")
        .css("cursor", "pointer")
    }
  },[settingsFilters.quantityUserRecipes])

  useEffect(() => {
    if (settingsFilters.quantityOnlineRecipes === 0) {
      $('#decrementOnline')
        .css("background", "rgba(0, 0, 0, 0.2)")
        .css("color", "rgba(0, 0, 0, 0.2)")
        .css("cursor", "default")
    }
    else if (settingsFilters.quantityOnlineRecipes === 100) {
      $('#incrementOnline')
        .css("background", "rgba(0, 0, 0, 0.2)")
        .css("color", "rgba(0, 0, 0, 0.2)")
        .css("cursor", "default")
    }
    else {
      $('#incrementOnline, #decrementOnline')
        .css("background", "#78909c")
        .css("color", "#212121")
        .css("cursor", "pointer")
    }
  },[settingsFilters.quantityOnlineRecipes])

  useEffect(() => {
    if (settingsFilters.quantityOfflineRecipes === 0) {
      $('#decrementOffline')
        .css("background", "rgba(0, 0, 0, 0.2)")
        .css("color", "rgba(0, 0, 0, 0.2)")
        .css("cursor", "default")
    }
    else if (settingsFilters.quantityOfflineRecipes === 100) {
      $('#incrementOffline')
        .css("background", "rgba(0, 0, 0, 0.2)")
        .css("color", "rgba(0, 0, 0, 0.2)")
        .css("cursor", "default")
    }
    else {
      $('#incrementOffline, #decrementOffline')
        .css("background", "#78909c")
        .css("color", "#212121")
        .css("cursor", "pointer")
    }
  },[settingsFilters.quantityOfflineRecipes])

  useEffect(() => { // FIRED WHEN WINDOW IS CLOSED OR REFRESH
    const onBeforeUnloadd = () => {
      console.log("al final")
    };
    window.addEventListener("beforeunload", onBeforeUnloadd);
    return () => window.removeEventListener("beforeunload", onBeforeUnloadd);
    // eslint-disable-next-line
  },[])

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

      <div className={css.accordionContainerDouble}>
        <Accordion
          expanded={expandUser}
          //className={css.accordion}
          className={`${css.accordionDouble} ${css.accordionDoubleUpper}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            // expandIcon={
            //   <ErrorOutlineIcon
            //     className={css.iconInfo}
            //     onClick={(() => setExpandUser(!expandUser))}
            //   />
            // }
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                //onClick={(() => setExpandOnline(!expandOnline))}
                onClick={(() => {
                  setExpandUser(!expandUser)
                  setExpandUserNumber(false)
                })}
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

        <Accordion
          expanded={expandUserNumber}
          className={`${css.accordionDouble} ${css.accordionDoubleLower}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => {
                  setExpandUserNumber(!expandUserNumber);
                  setExpandUser(false);
                })}
              />
            }
          >
            <BaseNumberInput
              //defaultValue={2}
              className={`numberInputUser`}
              value={settingsFilters.quantityUserRecipes}
              // ↓↓ direct input handler ↓↓
              onInputChange={(e) => quantityUserRecipesHandler({ type: `directChange`, value: (e.target as HTMLInputElement).value })}
              // ↓↓ - + buttons handler ↓↓
              onChange={(e) => quantityUserRecipesHandler({ type: (e.target as HTMLInputElement).value })}
              min={0}
              max={100}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: { className: css.numberInputInput },
                decrementButton: {
                  value: `decrementButton`,
                  /* className: css.numberInputButton, */
                  className: css.numberInputButton,
                  id: `decrementUser`,
                  children:
                    <RemoveIcon
                      className={css.incrementButtonIcon}
                      fontSize="small"
                    />
                },
                incrementButton: {
                  value: `incrementButton`,
                  className: `${css.numberInputButton} ${css.increment}`,
                  id: `incrementUser`,
                  children:
                    <AddIcon
                      className={css.incrementButtonIcon}
                      fontSize="small"
                    />
                }
              }}
            />
            <div className={css.text}>Quantity of User Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Quantity of User Recipes required to the Server as long as the server is Online (min: 0, max: 100, default: 30).
            </div>
            <div className={css.text}>
              There are no rate-limits on this type of requests to the Online Database.
            </div>
          </AccordionDetails>
        </Accordion>




      </div>

      <div className={css.accordionContainerDouble}>
        <Accordion
          expanded={expandOnline}
          //className={css.accordion}
          className={`${css.accordionDouble} ${css.accordionDoubleUpper}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                //onClick={(() => setExpandOnline(!expandOnline))}
                onClick={(() => {
                  setExpandOnline(!expandOnline)
                  setExpandOnlineNumber(false)
                })}
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
        <Accordion
          expanded={expandOnlineNumber}
          className={`${css.accordionDouble} ${css.accordionDoubleLower}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => {
                  setExpandOnlineNumber(!expandOnlineNumber);
                  setExpandOnline(false);
                })}
              />
            }
          >
            <BaseNumberInput
              //defaultValue={2}
              className={`numberInputOnline`}
              value={settingsFilters.quantityOnlineRecipes}
              // ↓↓ direct input handler ↓↓
              onInputChange={(e) => quantityOnlineRecipesHandler({ type: `directChange`, value: (e.target as HTMLInputElement).value })}
              // ↓↓ - + buttons handler ↓↓
              onChange={(e) => quantityOnlineRecipesHandler({ type: (e.target as HTMLInputElement).value })}
              min={0}
              max={100}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: { className: css.numberInputInput },
                decrementButton: {
                  value: `decrementButton`,
                  /* className: css.numberInputButton, */
                  className: css.numberInputButton,
                  id: `decrementOnline`,
                  children:
                    <RemoveIcon
                      className={css.incrementButtonIcon}
                      fontSize="small"
                    />
                },
                incrementButton: {
                  value: `incrementButton`,
                  className: `${css.numberInputButton} ${css.increment}`,
                  id: `incrementOnline`,
                  children:
                    <AddIcon
                      className={css.incrementButtonIcon}
                      fontSize="small"
                    />
                }
              }}
            />
            <div className={css.text}>Quantity of Online Database Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Quantity of recipes required to the Server as long as the server is Online (min: 0, max: 100, default: 15).
            </div>
            <div className={css.text}>
              Note that the greater the number of requests, the sonner get rate-limited by third-part Online Database Recipes.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={css.accordionContainerDouble}>
        <Accordion
          expanded={expandOffline}
          className={`${css.accordionDouble} ${css.accordionDoubleUpper}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => {
                  setExpandOffline(!expandOffline)
                  setExpandOfflineNumber(false)
                })}
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
        <Accordion
          expanded={expandOfflineNumber}
          className={`${css.accordionDouble} ${css.accordionDoubleLower}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => {
                  setExpandOfflineNumber(!expandOfflineNumber);
                  setExpandOffline(false);
                })}
              />
            }
          >
            <BaseNumberInput
              className={`numberInputOffline`}
              value={settingsFilters.quantityOfflineRecipes}
              // ↓↓ direct input handler ↓↓
              onInputChange={(e) => quantityOfflineRecipesHandler({ type: `directChange`, value: (e.target as HTMLInputElement).value })}
              // ↓↓ - + buttons handler ↓↓
              onChange={(e) => quantityOfflineRecipesHandler({ type: (e.target as HTMLInputElement).value })}
              min={0}
              max={100}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: { className: css.numberInputInput },
                decrementButton: {
                  value: `decrementButton`,
                  className: css.numberInputButton,
                  id: `decrementOffline`,
                  children:
                    <RemoveIcon
                      className={css.incrementButtonIcon}
                      fontSize="small"
                    />
                },
                incrementButton: {
                  value: `incrementButton`,
                  className: `${css.numberInputButton} ${css.increment}`,
                  id: `incrementOffline`,
                  children:
                    <AddIcon
                      className={css.incrementButtonIcon}
                      fontSize="small"
                    />
                }
              }}
            />
            <div className={css.text}>Quantity of Offline Database Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Quantity of recipes required as long as the server is Offline (min: 0, max: 100, default: 30).
            </div>
            <div className={css.text}>
              There are no rate-limits on this type of requests to the Offline Database.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Settings;