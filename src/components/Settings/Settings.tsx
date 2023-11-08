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

  const [ expandStatus, setExpandStatus ] = useState(false)
  const [ expandUser, setExpandUser ] = useState(false)
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
      // case 'quantityOfflineRecipes':
      //   dispatch(setSettingsFilters({ type: type, value: !settingsFilters.showOfflineRecipes }))
      //   localStorage.setItem('showOfflineRecipes', JSON.stringify(!settingsFilters.showOfflineRecipes))
      //   dispatch(applyFilters())
      // break;
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
              defaultValue={2}
              min={0}
              max={3}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: { className: css.numberInputInput },
                decrementButton: {
                  className: css.numberInputButton,
                  children: <RemoveIcon fontSize="small" />
                },
                incrementButton: {
                  className: `${css.numberInputButton} ${css.increment}`,
                  children: <AddIcon fontSize="small" />
                }
              }}
            />
            <div className={css.text}>Quantity of Online Database Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Quantity of recipes required to the Server as long as the server is Online (min: 0, max: 10).
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
              //defaultValue={10}
              //value={settingsFilters.quantityOfflineRecipes}
              defaultValue={settingsFilters.quantityOfflineRecipes}
              //onChange={(e) => {console.log("este", e.target.value)}}
              //onChange={(e) => {console.log("este", e)}}
              //onChange={(e) => {console.log("este", e)}}
              //onChange={(e) => {console.log("este", e)}}
              //onChange={(e) => {console.log("este", e.target)}}
              //onInputChange={(e) => {console.log("este", e)}}
              //onClick={(e) => {console.log("este", e.target)}}
              //onClick={(e) => {console.log("este", e.target.id)}}
              //onClick={(e) => { if (e.target.id) console.log(e.target.id) }}
              onClick={(e) => { console.log(e.target.value) }}
              
              //style={button: `${css.numberInputButton} ${css.increment}`}
              
              min={0}
              max={100}
              slots={{
                //incrementButton: {onClick={{ () => console.log("INCREMENT") }}},
                //decrementButton: StyledButton,
                //incrementButton: css.numberInputButton/* } ${css.increment */}
              }}
              //getDecrementButtonProps={(e) => console.log(e)}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: { className: css.numberInputInput },
                decrementButton: {
                  value: `decrementButton`,
                  id: `decrementButton`,
                  className: css.numberInputButton,
                  children:
                    <RemoveIcon
                      id={`decrementButton`}
                      fontSize="small"
                      //onClick={() => console.log("decrementButton")}
                    />
                },
                incrementButton: {
                  //() => {console.log("INCREMENT")},
                  //onClick: function() {console.log("INCREMENT BUTTON")},
                  //function() {console.log("INCREMENT BUTTON")},
                  //function: function() {console.log("INCREMENT BUTTON")},
                  id: `incrementButton`,
                  value: `incrementButton`,
                  //onclick: console.log("INCREMENT BUTTON"),
                  className: `${css.numberInputButton} ${css.increment}`,
                  //onClick: () => console.log("INCREMENT BUTTON"),
                  children:
                    <AddIcon
                      id={`incrementButtonIcon`}
                      className={css.testTestTest}
                      fontSize="small"
                      //onClick={() => console.log("incrementButton")}
                    />
                } // incrementButton: function() {console.log("INCREMENT BUTTON")}
                
              }
            }
            />
            <div className={css.text}>Quantity of Offline Database Recipes</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Quantity of recipes required as long as the server is Offline (min: 0, max: 100).
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