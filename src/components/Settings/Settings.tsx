import { useEffect, useState } from "react";
import css from "./SettingsCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Switch } from '@mui/material/';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { easings } from '../../commons/easingsCSS';
import $ from 'jquery';
import { settingsFiltersI, colorsArrayI } from '../../interfaces/interfaces';
import { setSettingsFilters, applyFilters } from '../../actions';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Settings = () =>  {

  const dispatch = useDispatch()
  easings() // JQuery easings..

  const settingsFilters = useSelector((state: { settingsFilters:settingsFiltersI }) => state.settingsFilters)

  const [ expandColor, setExpandColor ] = useState(false)
  const [ expandStatus, setExpandStatus ] = useState(false)
  const [ expandVisuals, setExpandVisuals ] = useState(false)
  const [ expandBadWords, setExpandBadWords ] = useState(false)
  const [ expandTooltips, setExpandTooltips ] = useState(false)
  const [ expandUser, setExpandUser ] = useState(false)
  const [ expandUserNumber, setExpandUserNumber ] = useState(false)
  const [ expandOnline, setExpandOnline ] = useState(false)
  const [ expandOnlineNumber, setExpandOnlineNumber ] = useState(false)
  const [ expandOffline, setExpandOffline ] = useState(false)
  const [ expandOfflineNumber, setExpandOfflineNumber ] = useState(false)
  const [ focusUser, setFocusUser ] = useState(false)
  const [ focusOnline, setFocusOnline ] = useState(false)
  const [ focusOffline, setFocusOffline ] = useState(false)

  const settingsFiltersHandler = ({ type, value }: any) => {
    if (value) {
      if (settingsFilters.showColor) {
        dispatch(setSettingsFilters({ type: type, value: value }))
        localStorage.setItem(`${type}`, JSON.stringify(value))
      }
    }
    else {
      dispatch(setSettingsFilters({ type: type, value: !settingsFilters[type] }))
      localStorage.setItem(`${type}`, JSON.stringify(!settingsFilters[type]))
    }
    if (type.slice(-7) === `Recipes`) dispatch(applyFilters())
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

  $(function() {
    $(`#incrementUser, #decrementUser`).on("click", function() { // NO FOCUS
      $(`#numberInputUser`)
        .css("box-shadow", "0 0 0 2px transparent inset")
        .css("caret-color", "transparent")
        setFocusUser(true)
    })
    $(`#numberInputUser`)
      .on("click", function() { // FOCUS ONLY ON DIRECT INPUT
        $(this)
          .css("box-shadow", "0 0 0 2px #90caf9 inset")
          .css("caret-color", "black")
          setFocusUser(false)
      })
      .on("blur", function() { // NO FOCUS
        $(this)
          .css("box-shadow", "0 0 0 2px transparent inset")
          .css("caret-color", "transparent")
          setFocusUser(false)
      })
  })

  $(function() {
    $(`#incrementOnline, #decrementOnline`).on("click", function() { // NO FOCUS
      $(`#numberInputOnline`)
        .css("box-shadow", "0 0 0 2px transparent inset")
        .css("caret-color", "transparent")
        setFocusOnline(true)
    })
    $(`#numberInputOnline`)
      .on("click", function() { // FOCUS ONLY ON DIRECT INPUT
        $(this)
          .css("box-shadow", "0 0 0 2px #90caf9 inset")
          .css("caret-color", "black")
          setFocusOnline(false)
      })
      .on("blur", function() { // NO FOCUS
        $(this)
          .css("box-shadow", "0 0 0 2px transparent inset")
          .css("caret-color", "transparent")
          setFocusOnline(false)
      })
  })

  $(function() {
    $(`#incrementOffline, #decrementOffline`).on("click", function() { // NO FOCUS
      $(`#numberInputOffline`)
        .css("box-shadow", "0 0 0 2px transparent inset")
        .css("caret-color", "transparent")
        setFocusOffline(true)
    })
    $(`#numberInputOffline`)
      .on("click", function() { // FOCUS ONLY ON DIRECT INPUT
        $(this)
          .css("box-shadow", "0 0 0 2px #90caf9 inset")
          .css("caret-color", "black")
          setFocusOffline(false)
      })
      .on("blur", function() { // NO FOCUS
        $(this)
          .css("box-shadow", "0 0 0 2px transparent inset")
          .css("caret-color", "transparent")
          setFocusOffline(false)
      })
  })

  useEffect(() => {
    if (settingsFilters.showColor) {
      $(`[id^=boxColor]`) // NOT SELECTED
        .not(`#boxColor${settingsFilters.backgroundColor.slice(1)}`)
        .css("box-shadow", "0 0 0 2px transparent inset")
      $(`[id^=boxColorText]`)
        .not(`#boxColorText${settingsFilters.backgroundColor.slice(1)}`)
        .css("font-weight", "400")
        .css("font-size", "16px")
      $(`#boxColor${settingsFilters.backgroundColor.slice(1)}`) // SELECTED
        .css("box-shadow", "0 0 0 2px #90caf9 inset")
      $(`#boxColorText${settingsFilters.backgroundColor.slice(1)}`)
        .css("font-weight", "500")
        .css("font-size", "15.5px")
    } else { // NOT SELECTED
      $(`[id^=boxColor]`)
        .css("box-shadow", "0 0 0 2px transparent inset")
      $(`[id^=boxColorText]`)
        .css("font-weight", "400")
        .css("font-size", "16px")
    }
  })

  const colorsArray: colorsArrayI[] = [
    { value: '#808080', name: 'DARKGRAY' },
    { value: '#dcdcdc', name: 'LIGHTGRAY' },
    { value: '#2e074a', name: 'DARKVIOLET' },
    { value: '#4f6b16', name: 'DARKOLIVE' },
    { value: '#5c0606', name: 'DARKRED' },
    { value: '#030380', name: 'DARKBLUE' }
  ]

  return (
    <div className={css.background}>
      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandColor}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandColor(!expandColor))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showColor' })}
              checked={ settingsFilters.showColor ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showColor ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Enable custom background color</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              <div className={css.boxColorContainer}>
                {
                  colorsArray.map((e,index) => {
                    return (
                      <div
                        key={index}
                        className={css.eachBoxColor}
                        onClick={() => settingsFiltersHandler({ type: 'backgroundColor', value: e.value })}
                      >
                        <div
                          id={`boxColor${e.value.slice(1)}`}
                          className={css.boxColor}
                          style={{ background: e.value }}
                        />
                        <div id={`boxColorText${e.value.slice(1)}`}>
                          {e.name}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              Enable/Disable custom background color. If enabled, improved performance on mobile devices.
              If disabled, default background image is displayed.
              (Default value on mobile devices: enabled, default color: darkviolet)
            </div>
          </AccordionDetails>
        </Accordion>
      </div>


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
          expanded={expandVisuals}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandVisuals(!expandVisuals))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showVisuals' })}
              checked={ settingsFilters.showVisuals ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showVisuals ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Enable Visuals Effects</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Enable/Disable glass effect filters. If disabled, improved performance on mobile devices. (Default value on mobile devices: disabled)
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandBadWords}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandBadWords(!expandBadWords))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showBadWords' })}
              checked={ settingsFilters.showBadWords ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showBadWords ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Enable bad words real time processing</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Enable/Disable bad words real time processing. If disabled, improved performance on mobile devices & bad words are processed after you submit. (Default value on mobile devices: disabled)
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className={css.accordionContainer}>
        <Accordion
          expanded={expandTooltips}
          className={css.accordion}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
                onClick={(() => setExpandTooltips(!expandTooltips))}
              />
            }
          >
            <Switch
              onClick={() => settingsFiltersHandler({ type: 'showTooltips' })}
              checked={ settingsFilters.showTooltips ? true : false }
              className={css.switch}
              classes={{
                track: settingsFilters.showTooltips ? `${css.track} ${css.trackEnabled}` : `${css.track} ${css.trackDisabled}`,
                thumb: css.thumb,
                switchBase:  css.switchBase,
                checked: css.checked,
                colorPrimary: css.colorPrimary
              }}
            />
            <div className={css.text}>Enable tooltips</div>
          </AccordionSummary>
          <AccordionDetails
            className={com.noSelect}
          >
            <div className={css.text}>
              Enable/Disable tooltips. Tooltips display informative text when users hover over, focus on, or tap an element. If disabled, improved performance on mobile devices. (Default value on mobile devices: disabled)
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className={css.accordionContainerDouble}>
        <Accordion
          expanded={expandUser}
          className={`${css.accordionDouble} ${css.accordionDoubleUpper}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
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
              className={`numberInputUser`}
              value={settingsFilters.quantityUserRecipes}
              // ↓↓ direct input handler ↓↓
              onInputChange={(e) => quantityUserRecipesHandler({ type: `directChange`, value: (e.target as HTMLInputElement).value })}
              // ↓↓ - + buttons handler ↓↓
              onChange={(e) => quantityUserRecipesHandler({ type: (e.target as HTMLInputElement).value })}
              min={0}
              max={100}
              readOnly={focusUser}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: {
                  className: css.numberInputInput,
                  id: `numberInputUser`
                },
                decrementButton: {
                  value: `decrementButton`,
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
              Quantity of User Recipes required to the Server as long as the server is Online. (min: 0, max: 100, default: 30)
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
          className={`${css.accordionDouble} ${css.accordionDoubleUpper}`}
        >
          <AccordionSummary
            className={css.defaultCursor}
            expandIcon={
              <ErrorOutlineIcon
                className={css.iconInfo}
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
              className={`numberInputOnline`}
              value={settingsFilters.quantityOnlineRecipes}
              // ↓↓ direct input handler ↓↓
              onInputChange={(e) => quantityOnlineRecipesHandler({ type: `directChange`, value: (e.target as HTMLInputElement).value })}
              // ↓↓ - + buttons handler ↓↓
              onChange={(e) => quantityOnlineRecipesHandler({ type: (e.target as HTMLInputElement).value })}
              min={0}
              max={100}
              readOnly={focusOnline}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: {
                  className: css.numberInputInput,
                  id: `numberInputOnline`
                },
                decrementButton: {
                  value: `decrementButton`,
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
              Quantity of recipes required to the Server as long as the server is Online (min: 0, max: 100, default: 15)
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
              readOnly={focusOffline}
              slotProps={{
                root: { className: css.numberInputRoot },
                input: {
                  className: css.numberInputInput,
                  id: `numberInputOffline`
                },
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
              Quantity of recipes required as long as the server is Offline (min: 0, max: 100, default: 30)
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