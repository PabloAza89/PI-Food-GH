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

  const dispatch = useDispatch()

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

 

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

  const [title, setTitle] = useState('');
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

  // function validateTitle(value:any) {
  //   if(/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value) && value.length !== 0) {
       //setError( error, error.title = 'Special characters not allowed in "Title" !');
  //   } else { /* setError(error, error.title = '') */ }
  //   setTitle(value);
  // }

  function validateHealthScore(value:any) {
    //if (value.toString().length === 0 ) //setError( error, error.health.one = '', error.health.two = '');
    //else {
    //  if (!/^\d+$/.test(value)) //setError( error, error.health.one = 'Only numbers allowed in "Health Score" !', error.health.two = '');
    //  else {
        //setError( error, error.health.one = '');
      //  if (value > 100 ) //setError( error, error.health.two = '', error.health.two = 'Allowed numbers are between 0 and 100 !');
        //else /* setError( error, error.health.two = '', error.health.two = ''); */
     // }
  //  }
    setHealthScore(value)
  }

  // const validateSummary = (value:string) => {
  //   if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)/*  && summaryValue.length !== 0 */) setError({...error, summary: true})
  //   else setError({...error, summary: false})
  //   //setSummaryValue(value)
  // }

  // interface dynFuncI {
  //   name: string,
  //   arrayParams: string
  // }

  // function dynFunc({name, arrayParams}: dynFuncI){
  //   return `set[${name}](${arrayParams})`
  // }


  interface validateStringI {
    type: string,
    value: string
  }

  const validator = ({ type, value }: validateStringI) => {
    switch (type) {
      case (`title`):
        if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)/*  && summaryValue.length !== 0 */) setError({...error, [type]: true})
        else setError({...error, [type]: false});
        setTitleValue(value);
      break;
      case (`health`):
        if (!/^\d+$/.test(value) && value.length !== 0 ) {
          let copyObj = {...error}
          copyObj.health.string = true
          setError({ ...copyObj })
        }
        if (parseInt(value, 10) > 100 ) {
          let copyObj = {...error}
          copyObj.health.max = true
          setError({ ...copyObj })
          //setError({ ...error, health: { max: true } })
        }
        if (/^\d+$/.test(value) && value.length !== 0 ) {
          let copyObj = {...error}
          copyObj.health.string = false
          setError({ ...copyObj })
        }
        if (!(parseInt(value, 10) > 100)) {
          let copyObj = {...error}
          copyObj.health.max = false
          setError({ ...copyObj })
        }
        //else setError({ ...error, health: { string: false, max: false } });
        setHealthValue(value);
      break;
      case (`summary`):
        if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)/*  && summaryValue.length !== 0 */) setError({...error, [type]: true})
        else setError({...error, [type]: false});
        setSummaryValue(value);
      break;
    }

    //setSummaryValue(string);

    //setsummary(string);
    //dynFunc({name:`set_${type}`, arrayParams:string})


  }

  function validateAnalyzedInstructions(value:any) {
    if(/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value) && value.length !== 0) {
      //setError( error, error.instructions = 'Special characters not allowed in "Instructions" !');
    } else { /* setError( error, error.instructions = '') */ }
    setAnalyzedInstructions(value)
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

  function createHandler() {
    setDietChoosen({
      name: "-- select an option --",
      hidden: false
    })
  }

  const handleChange = (event: SelectChangeEvent<typeof dietsArray>) => {
    const {
      target: { value },
    } = event;
    setDietsArray(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  // useEffect(() => {


  //   if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(summaryValue)/*  && summaryValue.length !== 0 */) {
  //     console.log("ERROR")
  //     setError({...error, summary: true})
  //   } else {
  //     setError({...error, summary: false})
  //   }



  // //},[summaryValue, error])

  //console.log("abc", dietss)
  //console.log("summaryValue", summaryValue)
  //console.log("healthValue", healthValue)
  //console.log("error.health", error.health)
  console.log("stepsState", stepsState)
  

  return !firstInstance ?
    (
      <Box sx={s.background}>
        <Link  id="iconImageDiv"  to="/" >
          <img onClick={() => GetAfterCreated()} className="iconImageForm" src={logo} alt=""></img>
        </Link>
        <Link  id="iconText" to="/">
          <h2 onClick={() => GetAfterCreated()} >Go Back !</h2>
        </Link>
        <form className="form" onSubmit={handleSubmit}>
          <img className="image-form" src={noImage1} alt=""></img>
          <div className="titleFormRecipe">Create your own recipe ! Please fill in all fields:</div>
          <div className="options-main-align">
            <Box sx={s.optionsRight}>
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column' }}
                //onSubmit={(e: any) => { e.preventDefault(); dispatch(filter(entireFilter)) }}
              >
                <Box sx={{ background: 'lightgray', display: 'flex', flexDirection: 'row' }}>
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
                      //className={`inputPos`}
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
                <Box sx={{ background: 'lightgray', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={s.text}>Health Score:</Box>
                  <Tooltip
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.health.string || error.health.max}
                    //open={error.health.string}
                    placement="bottom"
                    //title={`Only numbers allowed in "Health Score" !`}
                    //title={`Allowed numbers are between 0 and 100 !`}
                    title={
                      error.health.string ?
                      `Only numbers allowed in "Health Score" !` :
                      `Allowed numbers are between 0 and 100 !`
                    }
                  >
                    <TextField
                      className={`inputPos`}
                      //type="text"
                      id="health"
                      autoComplete='off'
                      placeholder={healthScorePlaceholder}
                      onFocus={() => setHealthScorePlaceholder("")}
                      onBlur={() => setHealthScorePlaceholder(`e.g. 73`)}
                      onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
                    />
                  </Tooltip>
                </Box>
                <Box sx={{ background: 'lightgray', display: 'flex', flexDirection: 'row' }}>
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
                      //type="text"
                      id="summary"
                      autoComplete='off'
                      placeholder={summaryPlaceholder}
                      onFocus={() => setSummaryPlaceholder("")}
                      onBlur={() => setSummaryPlaceholder(`e.g. Healthy pasta recipe`)}
                      onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
                    />
                  </Tooltip>
                </Box>
                <Box sx={{ background: 'lightgray', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={s.text}>Instructions:</Box>
                  <TextField
                    className={`inputPos`}
                    type="text"
                    autoComplete='off'
                    placeholder={instructionsPlaceholder}
                    onFocus={() => setInstructionsPlaceholder("")}
                    onBlur={() => setInstructionsPlaceholder(`e.g. Cut pasta, fry tomatoes..`)}
                  />
                </Box>
                <Box sx={{ background: 'lightgray', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={s.text}>Diets:</Box>
                  <FormControl>
                    <InputLabel>Select Diets</InputLabel>
                    <Select
                      sx={{ width: '150px' }}
                      placeholder={`Select Diets`}
                      multiple
                      value={dietsArray}
                      label="Select Diets"
                      onChange={handleChange}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={ {PaperProps: { style: { maxHeight: `${48 * 4.5}px`, width: 300 }}}}
                      //renderValue={(selected) => selected.join(', ')}
                      //value={entireFilter.diet}
                      //onChange={(e) => setEntireFilter({...entireFilter, diet:e.target.value})}
                    >
                    {/*  {dietss.slice(1).map(e => {
                        return (
                          <MenuItem
                            key={e.title}
                            value={`${e.title}`}
                          >{e.title}</MenuItem>
                        )
                      })} */}
                      {dietss.slice(1).map(e => (
                          <MenuItem
                            key={e.title}
                            value={`${e.title}`}
                          >
                            <Checkbox checked={dietsArray.indexOf(e.title) > -1} />
                            {/* {e.title} */}
                            <ListItemText primary={e.title} />
                          </MenuItem>
                        )
                      )}
                    </Select>

                    <Box sx={{ background: 'gold', display: 'flex', flexDirection: 'column' }}>
                      
                      {stepsState.map((e, index) => (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={s.text}>Step {index + 1}:</Box>
                          <TextField //test
                            //type="text"
                            //id="summary"
                            id={`${index}`}
                            autoComplete='off'
                            multiline
                            value={stepsState[index]}
                            //placeholder={summaryPlaceholder}
                            placeholder={'test'}
                            //onFocus={() => setSummaryPlaceholder("")}
                            //onBlur={() => setSummaryPlaceholder(`e.g. Healthy pasta recipe`)}
                            //onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
                            //onChange={(e) => { console.log(e.target.value) }}
                            onChange={(e) => { handlerUpdate({ index: parseInt((e.target as HTMLInputElement).id, 10), value: e.target.value }) }}
                          />
                          <Button 
                            id={`${index}`}
                            sx={{ background: 'green', color: 'white' }}
                            //onClick={e => console.log("test", (e.target as HTMLInputElement).id)}
                            onClick={(e) => handlerAdd({ index: parseInt((e.target as HTMLInputElement).id, 10) })}
                            
                            >V</Button>
                          <Button
                            disabled={stepsState.length === 1 ? true : false}
                            id={`${index}`}
                            sx={{ background: 'red' }}
                            //onClick={e => console.log("test", (e.target as HTMLInputElement).id)}
                            onClick={(e) => { console.log("index", index); handlerDelete({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
                            
                            >X</Button>
                        </Box>

                      ))
                      }
                        
                    </Box>
                    

                    
                  </FormControl>


                  
                </Box>
              </Box>
            </Box>
          </div>
        </form>
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