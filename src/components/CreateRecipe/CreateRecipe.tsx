import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
//import "../../styles/Form.css";
import * as s from "../../styles/CreateRecipeSX";
import "../../styles/CreateRecipeSX.css";
import noImage1 from "../../images/noImage1.jpg";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { addNew } from '../../actions';
import { Box, Button, TextField, ListItemText, Checkbox, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import dietss from '../../db/diets.json';
import Tooltip from '@mui/joy/Tooltip';
import Swal from 'sweetalert2';

export default function CreateRecipe() {

  // onBlur={() => setInstructionsPlaceholder(`e.g. Cut pasta, fry tomatoes..`)}

  const dispatch = useDispatch()

  const [stepsState, setStepsState] = useState(['']);

  interface handlerI {
    index: number
  }

  const handlerDelete = ({ index }: handlerI) => {
    let copyState = [...stepsState]
    copyState.splice(index, 1)
    setStepsState([...copyState])

    let copyError = {...error}
    copyError.instructions.splice(index, 1)
    setError(copyError)
  }

  interface handlerAddI {
    index: number,
  }

  const handlerAdd = ({ index }: handlerAddI) => {
    let copyState = [...stepsState]
    copyState.splice(index + 1, 0, "")
    setStepsState([...copyState])

    let copyError = {...error}
    copyError.instructions.splice(index + 1, 0, { error: false })
    setError(copyError)
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

  const [titleValue, setTitleValue] = useState<string>('');
  const [healthValue, setHealthValue] = useState<string>('');
  const [summaryValue, setSummaryValue] = useState<string>('');

  interface healthI {
    string?: boolean,
    max?: boolean
  }

  // interface instructionsI {
  //   index: number,
  //   error: boolean
  // }

  interface instructionsI {
    //[index: number]: boolean,
    error: boolean,
  }

  interface errorI {
    title: boolean,
    health: healthI,
    summary: boolean,
    instructions: instructionsI[]
  }

  const [error, setError] = useState<errorI>({
    title: false,
    health: {
      string: false,
      max: false
    },
    summary: false,
    instructions: [
      { error: false }
    ]
  });

  function handleNewRecipe() {
    // setDietSelected([])
    // setCreated(0)
    // setTitle("")
    // setHealthScore("")
    // setSummary("")
    // setAnalyzedInstructions("")
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
    value: string,
    index?: number,
  }

  const validator = ({ type, value, index }: validateStringI) => {
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
      case (`instructions`):
        if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)) {
          let copyObj = {...error}
          copyObj.instructions.splice(index!, 1, { error: true }  )
          setError(copyObj)
        } else {
          let copyObj = {...error}
          copyObj.instructions.splice(index!, 1, { error: false }  )
        }
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

  const clearHandler = () => {
    setTitleValue('');
    setHealthValue('');
    setSummaryValue('');
    setDietsArray([]);
    setStepsState(['']);
    setError({
      title: false,
      health: { string: false, max: false },
      summary: false,
      instructions: [{ error: false }]
    });
  };


  const clearFieldsNotif = () => {

    Swal.fire({
      title: 'Do you want to clear all fields ?',
      text: 'No undo.',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CLEAR',
      denyButtonText: `CANCEL`,
    }).then((result) => {
      if (result.isConfirmed) {
        clearHandler()
          Swal.fire({
            title: 'All cleared !',
            showConfirmButton: false,
            icon: 'success',
            timer: 1000,
          })
        

      }
    })

  }

  console.log("stepsState", stepsState)
  //console.table(error)
  //console.log("error", error)
  //console.log(JSON.stringify(error, null, 4));
  //console.log("healthValue", typeof healthValue)
  //console.log("healthValue.length", healthValue.length)

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
                    sx={s.genericTooltip}
                    arrow
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
                      value={titleValue}
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
                    sx={s.genericTooltip}
                    arrow
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
                      value={healthValue}
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
                    sx={s.genericTooltip}
                    arrow
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
                      value={summaryValue}
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
                  <Box sx={s.stepsContainer}>

                    {stepsState.map((e, index) => (
                      <Box key={index} sx={s.eachStep}>
                        <Box sx={s.stepTitle}>Step {index + 1}:</Box>

                        <Tooltip
                          sx={s.genericTooltip}
                          key={index}
                          arrow
                          enterDelay={500}
                          leaveDelay={200}
                          enterTouchDelay={0}
                          open={error.instructions[`${index}`].error}
                          placement="bottom"
                          title={`Special characters not allowed on step ${index + 1} of "Instructions" !`}
                        >
                          <TextField
                            id={`${index}instructions`}
                            autoComplete='off'
                            multiline
                            value={stepsState[index]}
                            placeholder={`e.g. Cut pasta, fry tomatoes..`}
                            sx={s.inputStep}
                            onChange={(e) => {
                              handlerUpdate({ index: parseInt((e.target as HTMLInputElement).id, 10), value: e.target.value });
                              validator({ value: e.target.value, type: e.target.id.replace(/[0-9]/g, ''), index: parseInt((e.target as HTMLInputElement).id, 10) })
                            }}
                          />
                        </Tooltip>

                        <Button
                          disabled={stepsState.length >= 10 ? true : false}
                          id={`${index}`}
                          sx={s.buttonNew}
                          onClick={(e) => handlerAdd({ index: parseInt((e.target as HTMLInputElement).id, 10) })}
                        >New Step</Button>
                        <Button
                          disabled={stepsState.length === 1 ? true : false}
                          id={`${index}`}
                          sx={s.buttonDelete}
                          onClick={(e) => { handlerDelete({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
                        >Detele Step</Button>
                      </Box>
                    ))}

                  </Box>
                </Box>
                <Box sx={s.eachRow}>
                  <Button
                    sx={s.buttonClearSave}
                    variant="contained"
                    //onClick={() => clearHandler()}
                    onClick={() => clearFieldsNotif()}
                  >
                    CLEAR
                  </Button>
                  <Button
                    sx={s.buttonClearSave}
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