import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "../../styles/Form.css";
import * as s from "../../styles/CreateRecipeSX";
import noImage1 from "../../images/noImage1.jpg";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { addNew } from '../../actions';
import { Box, Button, TextField, ListItemText, Checkbox, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import dietss from '../../db/diets.json';
import Tooltip from '@mui/joy/Tooltip';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function CreateRecipe({ GetAfterCreated }:any) {

  // onBlur={() => setInstructionsPlaceholder(`e.g. Cut pasta, fry tomatoes..`)}

  const dispatch = useDispatch()

  const [stepsState, setStepsState] = useState(['']);

  interface handlerI {
    index: number
  }

  const handlerDelete = ({ index }: handlerI) => {
    let copy = [...stepsState]
    copy.splice(index, 1)
    setStepsState([...copy])
  }

  interface handlerAddI {
    index: number,
  }


  const handlerAdd = ({ index }: handlerAddI) => {
    let copy = [...stepsState]
    copy.splice(index + 1, 0, "")
    setStepsState([...copy])
  }

  interface handlerUpdateI {
    index: number,
    value: string
  }

  const handlerUpdate = ({ index, value }: handlerUpdateI) => {
    let copy = [...stepsState]
    copy.splice(index, 1, value)
    setStepsState([...copy])
  }

  const [dietsArray, setDietsArray] = useState<string[]>([]);

  const [showAlert, setShowAlert] = useState(false)
  const [firstInstance, setFirstInstance] = useState(false)

  let [created, setCreated] = useState(0)
  const [dietSelected, setDietSelected] = useState([])
  let uniqueNamesDiets = Array.from(new Set(dietSelected));

  let handleDietSelected = (event:any[]) => {
    //setDietSelected([...dietSelected, event])
  }

  const [title, setTitle] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [summary, setSummary] = useState("");
  const [analyzedInstructions, setAnalyzedInstructions] = useState("");

  const [titlePlaceholder, setTitlePlaceholder] = useState<string>('e.g. Pasta with tomatoes..');
  const [healthScorePlaceholder, setHealthScorePlaceholder] = useState<string>('e.g. 73');
  const [summaryPlaceholder, setSummaryPlaceholder] = useState<string>('e.g. Healthy pasta recipe');
  const [instructionsPlaceholder, setInstructionsPlaceholder] = useState<string>('e.g. Cut pasta, fry tomatoes..');

  const [titleValue, setTitleValue] = useState<string>('');
  const [healthValue, setHealthValue] = useState<string>('');
  const [summaryValue, setSummaryValue] = useState<string>('');

  interface healthI {
    string?: boolean,
    max?: boolean
  }

  interface errorI {
    title: boolean,
    health: healthI,
    summary: boolean,
    instructions: boolean
  }

  const [error, setError] = useState<errorI>({
    title: false,
    health: {
      string: false,
      max: false
    },
    summary: false,
    instructions: false
  });

  function handleNewRecipe() {
    setDietSelected([])
    setCreated(0)
    setTitle("")
    setHealthScore("")
    setSummary("")
    setAnalyzedInstructions("")
    //setError(error, error.title = "", error.health.one = "", error.health.two = "", error.summary= "", error.instructions= "")

  }

  function handleSubmitButton() {
    // if (error.title || error.health.one || error.health.two || error.summary || error.instructions ||
    //   // (document.getElementById("checkerTitle")&&document.getElementById("checkerTitle").value.length === 0) ||
    //   // (document.getElementById("checkerHealth")&&document.getElementById("checkerHealth").value.length === 0) ||
    //   // (document.getElementById("checkerSummary")&&document.getElementById("checkerSummary").value.length === 0) ||
    //   // (document.getElementById("checkerInstructions")&&document.getElementById("checkerInstructions").value.length === 0) ||
    //   uniqueNamesDiets.length === 0) return true
    // else return false
  }

   const handleSubmit = async (e:any) => {
    e.preventDefault();
      if (created === 0) {
        dispatch(addNew({
            "id": Math.floor(100000 + Math.random() * 900000),
            "title": title,
            "diets": uniqueNamesDiets,
            "healthScore": healthScore,
            "summary": summary,
            "analyzedInstructions": analyzedInstructions,
            "image": Math.floor(Math.random() * 3)
      }))
        setCreated(1)
      } else {
        setShowAlert(true)
      }
 };




  interface validateStringI {
    type: string,
    value: string
  }

  const validator = ({ type, value }: validateStringI) => {
    console.log("value de adentro", value)
    switch (type) {
      case (`title`):
        if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)) setError({...error, [type]: true})
        else setError({...error, [type]: false});
        setTitleValue(value);
      break;
      case (`health`):
        let copyObj = {...error}
        if (!/^\d+$/.test(value) && value.length !== 0 ) { copyObj.health.string = true; setError({ ...copyObj })}
        else { copyObj.health.string = false; setError({ ...copyObj })}
        if (parseInt(value, 10) > 100 && value.length !== 0) {copyObj.health.max = true; setError({ ...copyObj })}
        else { copyObj.health.max = false; setError({ ...copyObj })}
        setHealthValue(value);
      break;
      case (`summary`):
        if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)) setError({...error, [type]: true})
        else setError({...error, [type]: false});
        setSummaryValue(value);
      break;
    }
  }


  let [dietChoosen, setDietChoosen] = useState({
    name: "-- select an option --",
    hidden: false
  })

  function formHandler(event:any) {
    setDietChoosen({
      name: event,
      hidden: true
    })
  }


  const handleChange = (event: SelectChangeEvent<typeof dietsArray>) => {
    const { target: { value } } = event
    setDietsArray( typeof value === 'string' ? value.split(',') : value );
  };

  //console.log("stepsState", stepsState)
  console.table(error)
  console.log("healthValue", typeof healthValue)
  console.log("healthValue.length", healthValue.length)

  return !firstInstance ?
    (

              <Box
                component="form"
                sx={s.form}
              >   
                <Box component="img" src={noImage1} />
                <Typography >Create your own recipe ! Please fill in all fields:</Typography>
                <Box sx={s.eachRow}>
                  <Box sx={s.text}>Title:</Box>
                  <Tooltip
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.title}
                    placement="bottom"
                    title={`Special characters not allowed in "Title" !`}
                  >
                    <TextField
                      sx={s.input}
                      type="text"
                      autoComplete='off'
                      id="title"
                      placeholder={titlePlaceholder}
                      onFocus={() => setTitlePlaceholder("")}
                      onBlur={() => setTitlePlaceholder(`e.g. Pasta with tomatoes..`)}
                      onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
                    />
                  </Tooltip>
                </Box>
                <Box sx={s.eachRow}>
                  <Box sx={s.text}>Health Score:</Box>
                  <Tooltip
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.health.string || error.health.max}
                    placement="bottom"
                    title={
                      error.health.string ?
                      `Only numbers allowed in "Health Score" !` :
                      `Allowed numbers are between 0 and 100 !`
                    }
                  >
                    <TextField
                      className={`inputPos`}
                      id="health"
                      sx={s.input}
                      autoComplete='off'
                      placeholder={healthScorePlaceholder}
                      onFocus={() => setHealthScorePlaceholder("")}
                      onBlur={() => setHealthScorePlaceholder(`e.g. 73`)}
                      onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
                    />
                  </Tooltip>
                </Box>
                <Box sx={s.eachRow}>
                  <Box sx={s.text}>Summary:</Box>
                  <Tooltip
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.summary}
                    placement="bottom"
                    title={`Special characters not allowed in "Summary" !`}
                  >
                    <TextField
                      id="summary"
                      autoComplete='off'
                      sx={s.input}
                      multiline
                      placeholder={summaryPlaceholder}
                      onFocus={() => setSummaryPlaceholder("")}
                      onBlur={() => setSummaryPlaceholder(`e.g. Healthy pasta recipe`)}
                      onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
                    />
                  </Tooltip>
                </Box>
                <Box sx={s.eachRow}>
                  <Box sx={s.text}>Diets:</Box>
                  <FormControl>
                    <InputLabel>Select Diets</InputLabel>
                    <Select
                      sx={s.input}
                      placeholder={`Select Diets`}
                      multiple
                      value={dietsArray}
                      label="Select Diets"
                      onChange={handleChange}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={ {PaperProps: { style: { maxHeight: `${48 * 4.5}px`, width: 300 }}}}
                    >
                      {dietss.slice(1).map(e => (
                        <MenuItem
                          key={e.title}
                          value={`${e.title}`}
                        >
                          <Checkbox checked={dietsArray.indexOf(e.title) > -1} />
                          <ListItemText primary={e.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={s.eachRow}>
                  <Box sx={s.text}>Instructions:</Box>
                  <Box sx={{ background: 'gold', display: 'flex', flexDirection: 'column' }}>

                    {stepsState.map((e, index) => (
                      <Box sx={{ display: 'flex', flexDirection: 'row', width: '68vw' }}>
                        <Box sx={s.step}>Step {index + 1}:</Box>
                        <TextField //test
                          id={`${index}`}
                          autoComplete='off'
                          multiline
                          value={stepsState[index]}
                          placeholder={'test'}
                          sx={s.inputStep}
                          onChange={(e) => { handlerUpdate({ index: parseInt((e.target as HTMLInputElement).id, 10), value: e.target.value }) }}
                        />
                        <Button
                          id={`${index}`}
                          sx={s.buttonNew}
                          onClick={(e) => handlerAdd({ index: parseInt((e.target as HTMLInputElement).id, 10) })}
                        >New Step</Button>
                        <Button
                          disabled={stepsState.length === 1 ? true : false}
                          id={`${index}`}
                          sx={s.buttonDelete}
                          onClick={(e) => { console.log("index", index); handlerDelete({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
                        >Detele Step</Button>
                      </Box>
                    ))}

                  </Box>
                </Box>
                <Box sx={s.eachRow}>
                  <Button
                    variant="contained"
                  >
                    CLEAR
                  </Button>
                  <Button
                    variant="contained"
                  >
                    SAVE RECIPE
                  </Button>
                </Box>
              </Box>
    )
    : !showAlert ?
    (
      <div className="alertButtonBGSuccess">
        <span>RECIPE CREATED SUCCESSFULLY !</span>
        <button className='alertButtonSuccess' id="success" onClick={() => {setShowAlert(false) ; setFirstInstance(false)}}></button>
        <div className="hiddenSuccess">
          {/* {
            setTimeout(() => {
              document.getElementById("success")&&document.getElementById("success").click()
            }, 1500)
          } */}
        </div>
      </div>
    )
    :
    (
      <div className="alertButtonBG">
        <span>Recipe was already created ! </span>
        <span>Please select 'CREATE NEW RECIPE!' to create a new one !</span>
        <button className='alertButton' onClick={() => {setShowAlert(false) ; setFirstInstance(false)}}><b>GO BACK !</b></button>
      </div>
    )
}