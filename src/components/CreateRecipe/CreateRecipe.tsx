import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as s from "../../styles/CreateRecipeSX";
import "../../styles/CreateRecipeSX.css";
import noImage1 from "../../images/noImage1.jpg";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { addNew } from '../../actions';
import { Box, Button, OutlinedInput, Input, InputBase, TextField, ListItemText, Checkbox, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import dietss from '../../db/diets.json';
import Tooltip from '@mui/joy/Tooltip';
import Swal from 'sweetalert2';
import dicEs from '../../dictionary/es.json';
import $ from 'jquery';

const CreateRecipe = () => {

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

    copyState.forEach((e, idx) => {
        //return $(`#targetInstructions${idx}`).html(e)
        $(`#targetInstructions${idx}`).html(e)
        highlighter({value: e, type: 'instructions', index: idx})
    })

    // copyState.map((e, idx) => {
    //   return highlighter({value: e, type: 'instructions', index: idx})
    // })
  }

  interface handlerAddI {
    index: number,
  }

   const handlerAdd = async ({ index }: handlerAddI) => {
    const firstStep = async () => {
    
      let copyState = [...stepsState]
      copyState.splice(index + 1, 0, "")
      setStepsState([...copyState])

      let copyError = {...error}
      copyError.instructions.splice(index + 1, 0, { character: false, badWord: false })
      setError(copyError)

       copyState.forEach((e,indexx) => {
        highlighter({value: e, type: 'instructions', index: indexx})
      })

      

      
    }

    const secondStep = async () => { // only highlight for last index
      let copyState2 = [...stepsState]
      if (copyState2.length > 1 && index !== copyState2.length - 1 ) highlighter({value: copyState2.slice(copyState2.length-1)[0], type: 'instructions', index: copyState2.length})
    }
    
    firstStep().then(() => secondStep())
    //firstStep()
    //secondStep()
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

  const [created, setCreated] = useState(0)
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
  //const [titleValue, setTitleValue] = useState<string>('<strong>ASDASDASD</strong>');
  const [healthValue, setHealthValue] = useState<string>('');
  const [summaryValue, setSummaryValue] = useState<string>('');

  interface titleI {
    character: boolean,
    badWord: boolean
  }

  interface healthI {
    string?: boolean,
    max?: boolean
  }

  interface instructionsI {
    //[index: number]: boolean,
    //error: boolean,
    character: boolean,
    badWord: boolean,
  }

  interface summaryI {
    character: boolean,
    badWord: boolean,
  }

  interface errorI {
    title: titleI,
    health: healthI,
    summary: summaryI,
    instructions: instructionsI[]
  }

  const [error, setError] = useState<errorI>({
    title: {
      character: false,
      badWord: false
    },
    health: {
      string: false,
      max: false
    },
    summary: {
      character: false,
      badWord: false
    },
    instructions: [
      {
        character: false,
        badWord: false
      },
    ]
  });

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

  interface highlighterI {
    value: string,
    type: any,
    index?: number
  }

  const highlighter = ({value, type, index}: highlighterI) => {

    const characterReplacer = (string: string) => {
      return  string.replaceAll("á", "a").replaceAll("Á", "A")
        .replaceAll("é", "e").replaceAll("É", "E")
        .replaceAll("í", "i").replaceAll("Í", "I")
        .replaceAll("ó", "o").replaceAll("Ó", "O")
        .replaceAll("ú", "u").replaceAll("Ú", "U")
        .replaceAll("ü", "u").replaceAll("Ü", "U")
        .toLowerCase()
    }

    let badWordsInDicEs = dicEs.map((e, idx) => {
      return (
        characterReplacer(value)
          .search(RegExp(
            `^` + e + `$|` + // MATCH UNIQUE STRING WITH NOTHING AT START OR END
            `[-,\n;.:¡!¿?'"()\\][ ]` + e + `$|` + // ALLOWED CHARACTERS AT BEGGINING // TEST
            `^` + e + `[-,\n;.:¡!¿?'"()\\][ ]|` + // ALLOWED CHARACTERS AT END // TEST
            `[-,\n;.:¡!¿?'"()\\][ ]` + e + `[-,\n;.:¡!¿?'"()\\][ ]`  //+ `|` + // ALLOWED CHARACTERS AT START & END // TEST
          , "g" )) !== -1) ? { "target": e, "index": idx } : -1
    }).filter(e => e !== -1)

    //console.log("badWordsInDicEs badWordsInDicEs", badWordsInDicEs)

    let firstArrayFilter: any = []

    

    badWordsInDicEs?.filter(e => e !== -1)?.forEach((x, idx) => {
      if (x !== -1) [...characterReplacer(value).matchAll(RegExp(x.target, "g"))].forEach((e, gg) => {
        if (
          x.target[0] === e[0][0] &&
          x.target.length === e[0].length &&
          ( RegExp(`[-,\n;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! + e[0].length]) || value[e.index! + e[0].length] === undefined ) &&
          ( RegExp(`[-,\n;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! - 1 ]) || value[e.index! -1] === undefined )
        ) firstArrayFilter.push({ "target": e[0].trim().replaceAll(/[^A-Za-z0-9 ]/g, ""), "start": e.index, "end": e.index! + e[0].length })
      })
    })

    //console.log("badWordsInDicEs badWordsInDicEs", badWordsInDicEs)

    let secondArrayFilter = firstArrayFilter.sort((a:any, b:any) => {
      if (a.start - b.start) return a.start - b.start
      else if (b.end - a.end) return b.end - a.end
      return null
    })

    let array:any = []

    secondArrayFilter.forEach((el:any,idx:any) => {
      if (idx === 0) array.push(el) // for first index
      if (idx !== 0 && idx !== secondArrayFilter.length - 1) { // for the rest
         if (el.start > array[array.length-1].end) array.push(el)
      }
       if (idx === secondArrayFilter.length - 1 && el.start > array[array.length-1].end) array.push(el) // for last index
    })

   //console.log("array array", array)

    let copyObj: any = {...error}

    if (array[0] && type === 'instructions') {
      copyObj.instructions[index!].badWord = true
      setError({ ...copyObj })
    }

    if (!array[0] && type === 'instructions') {
      copyObj.instructions[index!].badWord = false
      setError({ ...copyObj })
    }

    if (array[0] && type !== 'instructions') {
      copyObj[type].badWord = true
      setError({ ...copyObj })
    }

    if (!array[0] && type !== 'instructions') {
      copyObj[type].badWord = false
      setError({ ...copyObj })
    }

    $(index !== undefined ? `#target${type.slice(0,1).toUpperCase() + type.slice(1) + index}` : `#target${type.slice(0,1).toUpperCase() + type.slice(1)}`)
      .html(function() {
        let parsedToReturn:string[] = []
        //console.log("array ???", array)
        if (array[0]) array.forEach((e:any, actualIndex:any) => {
          if (array.length === 1) parsedToReturn.push(
            value.substring(0, e.start) + // OPTIONAL STRING
            "<mark>" + value.substring(e.start, e.end) + "</mark>" + // ONLY ONE e
              value.substring(e.end)) // i.e.: "¿dumb" | " dumb"
          if (array.length > 1) parsedToReturn.push(
            (actualIndex === 0 ? value.substring(0, e.start) : value.substring(array[actualIndex - 1]?.end, e.start)) +
            "<mark>" + value.substring(e.start, e.end) + "</mark>" + //
            (actualIndex === 0 ? "" : !array[actualIndex + 1 ]?.end ? value.substring(e.end) :""))
        })
        parsedToReturn.unshift("<div>")
        parsedToReturn.push("</div>")
        //console.log("parsedtoreturn", parsedToReturn)
        return array[0] ? parsedToReturn.join("") : value
      })
  }




  interface validateStringI {
    type: string,
    value: string,
    index?: number,
  }

  const validator = ({ type, value, index }: validateStringI) => {
    switch (type) {
      case (`title`):
        let copyObjTitle = {...error}
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjTitle[type].character = true; setError({ ...copyObjTitle }) }
        else { copyObjTitle[type].character = false; setError({ ...copyObjTitle })}
        setTitleValue(value);
        highlighter({value, type})
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
        let copyObjSummary = {...error}
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjSummary[type].character = true; setError({ ...copyObjSummary }) }
        else { copyObjSummary[type].character = false; setError({ ...copyObjSummary })}
        setSummaryValue(value);
        highlighter({value, type})
      break;
      case (`instructions`):
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].character = true
          setError({ ...copyObjInstructions })
        } else {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].character = false
          setError({ ...copyObjInstructions })
        }
        highlighter({value, type, index})
      break;
    }
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
      title: { character: false, badWord: false },
      health: { string: false, max: false },
      summary: { character: false, badWord: false },
      instructions: [{ character: false, badWord: false },]
    });
    $(`#targetInstructions0`)
      .html("<div></div>")
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

  $(function(){
    $("#title").on("scroll",function(e) {
      $("#targetTitle").scrollLeft($("#title").scrollLeft()!)
    })
  })

  //console.log("titleValue", titleValue.length)
  //console.log("stepsState", stepsState)
  //console.log("error.instructions", error.instructions)

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
            sx={s.tooltipCenter}
            arrow
            variant="outlined"
            size="lg"
            enterDelay={500}
            leaveDelay={200}
            enterTouchDelay={0}
            open={error.title.character || error.title.badWord}
            placement="bottom"

            title={
              <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                { error.title.character ? <Box sx={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Title" !</Box> : null }
                { error.title.character ? <Box sx={{ color: '#42424f' }}>Allowed characters:</Box> : null }
                { error.title.character ? <Box sx={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></Box> : null }
                { error.title.badWord ? <Box sx={{ fontWeight: '400' }}><em>Please, remove </em><mark>highlighted</mark> <em>bad words.</em></Box> : null }
                { error.title.character ? <Box sx={{ display: 'flex', flexDirection: 'row', fontWeight: '400' }}><em>Please, 
                  <Tooltip
                    title={`Ä ä % { } @ / \\ # À à ° ¬ $ & = * etc..`}
                    sx={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                  >
                    <u>remove unallowed characters</u>
                  </Tooltip>.</em>
                </Box> : null }
              </Box>
            }
          >
            <Box>
              <InputLabel id={"targetTitle"} shrink={false} sx={s.inputShownTitle}>{ titleValue }</InputLabel>
              <TextField
                className={`testTitle`}
                id="title"
                autoComplete='off'
                sx={s.inputHiddenTitle({ length:titleValue.length })}
                value={titleValue}
                placeholder={titlePlaceholder}
                onFocus={() => setTitlePlaceholder("")}
                onBlur={() => setTitlePlaceholder(`e.g. Pasta with tomatoes..`)}
                onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
              />
            </Box>
          </Tooltip>
        </Box>
        <Box sx={s.eachRow}>
          <Box sx={s.text}>Health Score:</Box>
          <Tooltip
            sx={s.tooltipLeft}
            arrow
            variant="outlined"
            size="lg"
            enterDelay={500}
            leaveDelay={200}
            enterTouchDelay={0}
            open={error.health.string || error.health.max}
            placement="bottom-start"
            title={
              <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                <Box
                  sx={{ color: '#25252d', fontWeight: '400' }}
                >{error.health.string ?
                  `Only numbers allowed in "Health Score" !` :
                  `Allowed numbers are between 0 and 100 !`}
                </Box>
              </Box>

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
            sx={s.tooltipCenter}
            arrow
            variant="outlined"
            size="lg"
            enterDelay={500}
            leaveDelay={200}
            enterTouchDelay={0}
            open={error.summary.character || error.summary.badWord}
            placement="bottom"
            title={
              <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                { error.summary.character ? <Box sx={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Summary" !</Box> : null }
                { error.summary.character ? <Box sx={{ color: '#42424f' }}>Allowed characters:</Box> : null }
                { error.summary.character ? <Box sx={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></Box> : null }
                { error.summary.badWord ? <Box sx={{ fontWeight: '400' }}><em>Please, remove </em><mark>highlighted</mark> <em>bad words.</em></Box> : null }
                { error.summary.character ? <Box sx={{ display: 'flex', flexDirection: 'row', fontWeight: '400' }}><em>Please, 
                  <Tooltip
                    title={`Ä ä % { } @ / \\ # À à ° ¬ $ & = * etc..`}
                    sx={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                  >
                    <u>remove unallowed characters</u>
                  </Tooltip>.</em>
                </Box> : null }
              </Box>
            }
          >
            <Box>
              <InputLabel id={"targetSummary"} shrink={false} sx={s.inputShownSummary}>{ summaryValue }</InputLabel>
              <TextField
                id="summary"
                autoComplete='off'
                sx={s.inputHiddenSummary}
                value={summaryValue}
                multiline
                placeholder={summaryPlaceholder}
                onFocus={() => setSummaryPlaceholder("")}
                onBlur={() => setSummaryPlaceholder(`e.g. Healthy pasta recipe`)}
                onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
              />
            </Box>
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
                  sx={ index % 2 === 0 ? s.tooltipRight : s.tooltipLeft }
                  key={index}
                  arrow
                  variant="outlined"
                  size="lg"
                  enterDelay={500}
                  leaveDelay={200}
                  enterTouchDelay={0}
                  open={error.instructions[`${index}`].character || error.instructions[`${index}`].badWord}
                  placement={ index % 2 === 0 ? `bottom-end` : `bottom-start` }
                  title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                      { error.instructions[index].character ? <Box sx={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Summary" !</Box> : null }
                      { error.instructions[index].character ? <Box sx={{ color: '#42424f' }}>Allowed characters:</Box> : null }
                      { error.instructions[index].character ? <Box sx={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></Box> : null }
                      { error.instructions[index].badWord ? <Box sx={{ fontWeight: '400' }}><em>Please, remove </em><mark>highlighted</mark> <em>bad words on step {index + 1}.</em></Box> : null }
                      { error.instructions[index].character ?
                        <Box sx={{ display: 'flex', flexDirection: 'row', fontWeight: '400' }}><em>Please, 
                          <Tooltip
                            title={`Ä ä % { } @ / \\ # À à ° ¬ $ & = * etc..`}
                            sx={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                          >
                            <u>remove unallowed characters</u>
                          </Tooltip> on step {index + 1}.</em>
                        </Box> : null }
                    </Box>
                  }
                >
                  <Box>
                    <InputLabel id={`targetInstructions${index}`} shrink={false} sx={s.inputShownInstructions}>{ stepsState[index] }</InputLabel>
                    <TextField
                      id={`${index}instructions`}
                      autoComplete='off'
                      multiline
                      value={stepsState[index]}
                      placeholder={`e.g. Cut pasta, fry tomatoes..`}
                      sx={s.inputHiddenInstructions}
                      onChange={(e) => {
                        handlerUpdate({ index: parseInt((e.target as HTMLInputElement).id, 10), value: e.target.value });
                        validator({ value: e.target.value, type: e.target.id.replace(/[0-9]/g, ''), index: parseInt((e.target as HTMLInputElement).id, 10) })
                      }}
                    />
                  </Box>
                </Tooltip>

                <Tooltip
                  arrow
                  enterDelay={700}
                  enterNextDelay={700}
                  leaveDelay={200}
                  enterTouchDelay={0}
                  disableFocusListener={stepsState.length >= 10 ? false : true}
                  disableHoverListener={stepsState.length >= 10 ? false : true}
                  placement="bottom-end"
                  title={
                    <Box sx={s.newStepTooltip}>
                      <Box>Max steps {`<`}10{`>`} reached !</Box>
                      <Box>Please, delete some old step to add new one.</Box>
                    </Box>
                  }
                >
                  <Box sx={s.buttonNewHelper}>
                    <Button
                      variant="contained"
                      disabled={stepsState.length >= 10 ? true : false}
                      id={`${index}`}
                      sx={s.buttonNew}
                      onClick={(e) => {handlerAdd({ index: parseInt((e.target as HTMLInputElement).id, 10 )})}}
                    >New Step
                    </Button>
                  </Box>
                </Tooltip>

                <Tooltip
                  arrow
                  enterDelay={700}
                  enterNextDelay={700}
                  leaveDelay={200}
                  enterTouchDelay={0}
                  disableFocusListener={stepsState.length === 1 ? false : true}
                  disableHoverListener={stepsState.length === 1 ? false : true}
                  placement="bottom-end"
                  title={"You can't delete first step !"}
                >
                  <Box sx={s.buttonDeleteHelper}>
                    <Button
                      className={`buttonDeleteStep`}
                      variant="contained"
                      disabled={stepsState.length === 1 ? true : false}
                      id={`${index}`}
                      sx={s.buttonDelete}
                      onClick={(e) => { handlerDelete({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
                    >Detele Step
                    </Button>
                  </Box>
                </Tooltip>
              </Box>
            ))}

          </Box>
        </Box>
        <Box sx={s.eachRow}>
          <Button
            sx={s.buttonClearSave}
            variant="contained"
            onClick={() => clearFieldsNotif()}
          >
            CLEAR
          </Button>
          <Button
            sx={s.buttonClearSave}
            variant="contained"
            disabled={
              error.title.character ||
              error.title.badWord ||
              error.health.string ||
              error.health.max ||
              error.summary.character ||
              error.summary.badWord ||
              error.instructions.filter(e => e.character === true)[0] ||
              error.instructions.filter(e => e.badWord === true)[0] ?
              true : false
            }
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

export default CreateRecipe;