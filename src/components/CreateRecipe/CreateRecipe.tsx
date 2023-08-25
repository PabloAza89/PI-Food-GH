import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
//import "../../styles/Form.css";
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
import $, { isWindow } from 'jquery';
import parse from 'html-react-parser';
//import Highlighter from "react-highlight-words";

export default function CreateRecipe() {

  // onBlur={() => setInstructionsPlaceholder(`e.g. Cut pasta, fry tomatoes..`)}

  interface E {
    target: string,
    start: number,
    end: number
  }

  let textInput = useRef(null)

  const dispatch = useDispatch()

  const [stepsState, setStepsState] = useState(['']);
  const [buttonDeleteStepLast, setButtonDeleteStepLast] = useState<boolean>(true);


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
    copyError.instructions.splice(index + 1, 0, { character: false, badWord: false })
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
        let copyObjTitle = {...error}
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjTitle[type].character = true; setError({ ...copyObjTitle }) }
        else { copyObjTitle[type].character = false; setError({ ...copyObjTitle })}
        setTitleValue(value);

        let badWordsInDicEsTitle = dicEs.map((e, idx) => {
          return (
            value
              .replaceAll("á", "a").replaceAll("Á", "A")
              .replaceAll("é", "e").replaceAll("É", "E")
              .replaceAll("í", "i").replaceAll("Í", "I")
              .replaceAll("ó", "o").replaceAll("Ó", "O")
              .replaceAll("ú", "u").replaceAll("Ú", "U")
              .replaceAll("ü", "u").replaceAll("Ü", "U")
              .toLowerCase().search(RegExp(
                `^` + e + `$|` + // MATCH UNIQUE STRING WITH NOTHING AT START OR END
                `[-,;.:¡!¿?'"()\\][ ]` + e + `$|` + // ALLOWED CHARACTERS AT BEGGINING // TEST
                `^` + e + `[-,;.:¡!¿?'"()\\][ ]|` + // ALLOWED CHARACTERS AT END // TEST
                `[-,;.:¡!¿?'"()\\][ ]` + e + `[-,;.:¡!¿?'"()\\][ ]`  //+ `|` + // ALLOWED CHARACTERS AT START & END // TEST
              , "g" )) !== -1) ? { "target": e, "index": idx } : -1
        }).filter(e => e !== -1)

        let firstArrayFilterTitle: any = []

        badWordsInDicEsTitle?.filter(e => e !== -1)?.forEach((x, idx) => {
          if (x !== -1) [...value
            .replaceAll("á", "a").replaceAll("Á", "A")
            .replaceAll("é", "e").replaceAll("É", "E")
            .replaceAll("í", "i").replaceAll("Í", "I")
            .replaceAll("ó", "o").replaceAll("Ó", "O")
            .replaceAll("ú", "u").replaceAll("Ú", "U")
            .replaceAll("ü", "u").replaceAll("Ü", "U")
            .toLowerCase().matchAll(RegExp(x.target, "g")
          )].forEach((e, gg) => {
            if (
              x.target[0] === e[0][0] &&
              x.target.length === e[0].length &&
              ( RegExp(`[-,;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! + e[0].length]) || value[e.index! + e[0].length] === undefined ) &&
              ( RegExp(`[-,;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! - 1 ]) || value[e.index! -1] === undefined )
            ) firstArrayFilterTitle.push({ "target": e[0].trim().replaceAll(/[^A-Za-z0-9 ]/g, ""), "start": e.index, "end": e.index! + e[0].length })
          })
        })

        let secondArrayFilterTitle = firstArrayFilterTitle.sort((a: E, b: E) => a.start - b.start)

        let arrayTitle = secondArrayFilterTitle.filter((e: any, index: any) => {
          if (e.start < secondArrayFilterTitle[index - 1]?.end || e.start < secondArrayFilterTitle[index - 2]?.end || e.start < secondArrayFilterTitle[index - 3]?.end || e.start < secondArrayFilterTitle[index - 4]?.end || e.start < secondArrayFilterTitle[index - 5]?.end) return null;
          return e
        })

        if (arrayTitle[0]) { copyObjTitle[type].badWord = true; setError({ ...copyObjTitle })}
        else { copyObjTitle[type].badWord = false; setError({ ...copyObjTitle })}

        $("#targetTitle")
          .html(function() {
            let parsedToReturnTitle:string[] = []
              if (arrayTitle[0]) arrayTitle.forEach((e:any, actualIndex:any) => {
                if (arrayTitle.length === 1) parsedToReturnTitle.push(
                  "<div>" + value.substring(0, e.start) + "</div>" + // OPTIONAL STRING
                  "<mark>" + value.substring(e.start, e.end) + "</mark>" + // ONLY ONE e
                  "<div>" + value.substring(e.end) + "</div>") // i.e.: "¿dumb" | " dumb"
                if (arrayTitle.length > 1) parsedToReturnTitle.push(
                  "<div>" + (actualIndex === 0 ? value.substring(0, e.start) : value.substring(arrayTitle[actualIndex - 1]?.end, e.start)) + "</div>" +
                  "<mark>" + value.substring(e.start, e.end) + "</mark>" + //
                  "<div>" + (actualIndex === 0 ? "" : !arrayTitle[actualIndex + 1 ]?.end ? value.substring(e.end) :"") + "</div>")
              })
            return arrayTitle[0] ? parsedToReturnTitle.join("") : value
          })

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
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjSummary[type].character = true; setError({ ...copyObjSummary }) }
        else { copyObjSummary[type].character = false; setError({ ...copyObjSummary })}
        setSummaryValue(value);

        let badWordsInDicEsSummary = dicEs.map((e, idx) => {
          return (
            value
              .replaceAll("á", "a").replaceAll("Á", "A")
              .replaceAll("é", "e").replaceAll("É", "E")
              .replaceAll("í", "i").replaceAll("Í", "I")
              .replaceAll("ó", "o").replaceAll("Ó", "O")
              .replaceAll("ú", "u").replaceAll("Ú", "U")
              .replaceAll("ü", "u").replaceAll("Ü", "U")
              .toLowerCase().search(RegExp(
                `^` + e + `$|` + // MATCH UNIQUE STRING WITH NOTHING AT START OR END
                `[-,;.:¡!¿?'"()\\][ ]` + e + `$|` + // ALLOWED CHARACTERS AT BEGGINING // TEST
                `^` + e + `[-,;.:¡!¿?'"()\\][ ]|` + // ALLOWED CHARACTERS AT END // TEST
                `[-,;.:¡!¿?'"()\\][ ]` + e + `[-,;.:¡!¿?'"()\\][ ]`  //+ `|` + // ALLOWED CHARACTERS AT START & END // TEST
              , "g" )) !== -1) ? { "target": e, "index": idx } : -1
        }).filter(e => e !== -1)

        let firstArrayFilterSummary: any = []

        badWordsInDicEsSummary?.filter(e => e !== -1)?.forEach((x, idx) => {
          if (x !== -1) [...value
            .replaceAll("á", "a").replaceAll("Á", "A")
            .replaceAll("é", "e").replaceAll("É", "E")
            .replaceAll("í", "i").replaceAll("Í", "I")
            .replaceAll("ó", "o").replaceAll("Ó", "O")
            .replaceAll("ú", "u").replaceAll("Ú", "U")
            .replaceAll("ü", "u").replaceAll("Ü", "U")
            .toLowerCase().matchAll(RegExp(x.target, "g")
          )].forEach((e, gg) => {
            if (
              x.target[0] === e[0][0] &&
              x.target.length === e[0].length &&
              ( RegExp(`[-,;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! + e[0].length]) || value[e.index! + e[0].length] === undefined ) &&
              ( RegExp(`[-,;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! - 1 ]) || value[e.index! -1] === undefined )
            ) firstArrayFilterSummary.push({ "target": e[0].trim().replaceAll(/[^A-Za-z0-9 ]/g, ""), "start": e.index, "end": e.index! + e[0].length })
          })
        })

        let secondArrayFilterSummary = firstArrayFilterSummary.sort((a: E, b: E) => a.start - b.start)

        let arraySummary = secondArrayFilterSummary.filter((e: any, index: any) => {
          if (e.start < secondArrayFilterSummary[index - 1]?.end || e.start < secondArrayFilterSummary[index - 2]?.end || e.start < secondArrayFilterSummary[index - 3]?.end || e.start < secondArrayFilterSummary[index - 4]?.end || e.start < secondArrayFilterSummary[index - 5]?.end) return null;
          return e
        })

        if (arraySummary[0]) {
          let copyObjSummary = {...error}
          copyObjSummary.summary.badWord = true
          setError({ ...copyObjSummary })
        } else {
          let copyObjSummary = {...error}
          copyObjSummary.summary.badWord = false
          setError({ ...copyObjSummary })
        }

        $("#targetSummary")
          .html(function() {
            let parsedToReturnSummary:string[] = []
              if (arraySummary[0]) arraySummary.forEach((e:any, actualIndex:any) => {
                // if (arraySummary.length === 1) parsedToReturnSummary.push(
                //   "<div>" + value.substring(0, e.start) + "</div>" + // OPTIONAL STRING
                //   "<div><mark>" + value.substring(e.start, e.end) + "</mark></div>" + // ONLY ONE e
                //   "<div>" + value.substring(e.end) + "</div>") // i.e.: "¿dumb" | " dumb"
                // if (arraySummary.length > 1) parsedToReturnSummary.push(
                //   "<div>" + (actualIndex === 0 ? value.substring(0, e.start) : value.substring(arraySummary[actualIndex - 1]?.end, e.start)) + "</div>" +
                //   "<div><mark>" + value.substring(e.start, e.end) + "</mark></div>" + //
                //   "<div>" + (actualIndex === 0 ? "" : !arraySummary[actualIndex + 1 ]?.end ? value.substring(e.end) :"") + "</div>")

                  if (arraySummary.length === 1) parsedToReturnSummary.push(
                    value.substring(0, e.start) + // OPTIONAL STRING
                    "<mark>" + value.substring(e.start, e.end) + "</mark>" + // ONLY ONE e
                     value.substring(e.end)) // i.e.: "¿dumb" | " dumb"
                  if (arraySummary.length > 1) parsedToReturnSummary.push(
                    (actualIndex === 0 ? value.substring(0, e.start) : value.substring(arraySummary[actualIndex - 1]?.end, e.start)) +
                    "<mark>" + value.substring(e.start, e.end) + "</mark>" + //
                    (actualIndex === 0 ? "" : !arraySummary[actualIndex + 1 ]?.end ? value.substring(e.end) :""))

              })
              // parsedToReturnSummary.unshift("<div style='display:flex; flexDirection:row; height:23px'>")
              // parsedToReturnSummary.push("</div>")
              parsedToReturnSummary.unshift("<div>")
              parsedToReturnSummary.push("</div>")

              //console.log("parsedToReturnSummary.join", parsedToReturnSummary.join(""))
              console.log("parsedToReturnSummary", parsedToReturnSummary)
              console.log("value", value)

            return arraySummary[0] ? parsedToReturnSummary.join("") : value
          })




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

        let badWordsInDicEsInstructions = dicEs.map((e, idx) => {
          return (
            value
              .replaceAll("á", "a").replaceAll("Á", "A")
              .replaceAll("é", "e").replaceAll("É", "E")
              .replaceAll("í", "i").replaceAll("Í", "I")
              .replaceAll("ó", "o").replaceAll("Ó", "O")
              .replaceAll("ú", "u").replaceAll("Ú", "U")
              .replaceAll("ü", "u").replaceAll("Ü", "U")
              .toLowerCase().search(RegExp(
                `^` + e + `$|` + // MATCH UNIQUE STRING WITH NOTHING AT START OR END
                `[-,;.:¡!¿?'"()\\][ ]` + e + `$|` + // ALLOWED CHARACTERS AT BEGGINING // TEST
                `^` + e + `[-,;.:¡!¿?'"()\\][ ]|` + // ALLOWED CHARACTERS AT END // TEST
                `[-,;.:¡!¿?'"()\\][ ]` + e + `[-,;.:¡!¿?'"()\\][ ]`  //+ `|` + // ALLOWED CHARACTERS AT START & END // TEST
              , "g" )) !== -1) ? { "target": e, "index": idx } : -1
        }).filter(e => e !== -1)

        let firstArrayFilterInstructions: any = []

        badWordsInDicEsInstructions?.filter(e => e !== -1)?.forEach((x, idx) => {
          if (x !== -1) [...value
            .replaceAll("á", "a").replaceAll("Á", "A")
            .replaceAll("é", "e").replaceAll("É", "E")
            .replaceAll("í", "i").replaceAll("Í", "I")
            .replaceAll("ó", "o").replaceAll("Ó", "O")
            .replaceAll("ú", "u").replaceAll("Ú", "U")
            .replaceAll("ü", "u").replaceAll("Ü", "U")
            .toLowerCase().matchAll(RegExp(x.target, "g")
          )].forEach((e, gg) => {
            if (
              x.target[0] === e[0][0] &&
              x.target.length === e[0].length &&
              ( RegExp(`[-,;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! + e[0].length]) || value[e.index! + e[0].length] === undefined ) &&
              ( RegExp(`[-,;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! - 1 ]) || value[e.index! -1] === undefined )
            ) firstArrayFilterInstructions.push({ "target": e[0].trim().replaceAll(/[^A-Za-z0-9 ]/g, ""), "start": e.index, "end": e.index! + e[0].length })
          })
        })

        let secondArrayFilterInstructions = firstArrayFilterInstructions.sort((a: E, b: E) => a.start - b.start)

        let arrayInstructions = secondArrayFilterInstructions.filter((e: any, index: any) => {
          if (e.start < secondArrayFilterInstructions[index - 1]?.end || e.start < secondArrayFilterInstructions[index - 2]?.end || e.start < secondArrayFilterInstructions[index - 3]?.end || e.start < secondArrayFilterInstructions[index - 4]?.end || e.start < secondArrayFilterInstructions[index - 5]?.end) return null;
          return e
        })

        if (arrayInstructions[0]) {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].badWord = true
          setError({ ...copyObjInstructions })
        } else {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].badWord = false
          setError({ ...copyObjInstructions })
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
      title: { character: false, badWord: false },
      health: { string: false, max: false },
      summary: { character: false, badWord: false },
      instructions: [{ character: false, badWord: false },]
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

  $(function(){
    $("#title").on("scroll",function(e) {
      $("#targetTitle").scrollLeft($("#title").scrollLeft()!)
    })
    console.log("summary height", $("#summary").innerHeight())
  })

  //console.log("titleValue", titleValue.length)
  console.log("stepsState", stepsState)
  console.log("error.instructions", error.instructions)

  return !firstInstance ?
    (

              <Box
                component="form"
                sx={s.form}
              >
                {/* <Box component="img" src={noImage1} /> */}
                <Typography >Create your own recipe ! Please fill in all fields:</Typography>
                <Box sx={s.eachRow}>
                  <Box sx={s.text}>Title:</Box>
                  <Tooltip
                    sx={s.genericTooltip}
                    arrow
                    variant="outlined"
                    size="lg"
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.title.character || error.title.badWord}
                    //open={true}
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
                        sx={s.inputHiddenTitle({ length:titleValue.length })}
                        autoComplete='off'
                        id="title"
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
                    sx={s.genericTooltip}
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
                    sx={s.genericTooltip}
                    arrow
                    variant="outlined"
                    size="lg"
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.summary.character || error.summary.badWord}
                    placement="bottom"
                    //title={`Special characters not allowed in "Summary" !`}
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
                        //sx={s.input}
                        sx={s.inputHiddenSummary({ length:summaryValue.length })}
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
                          sx={s.genericTooltip}
                          key={index}
                          arrow
                          variant="outlined"
                          size="lg"
                          enterDelay={500}
                          leaveDelay={200}
                          enterTouchDelay={0}
                          //open={error.instructions[`${index}`].character || error.instructions[`${index}`].badWord}
                          open={error.instructions[`${index}`].character}
                          placement="bottom"
                          title={
                            <Box 
                              sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}
                            >
                              <Box>
                                {`Special characters not allowed on step ${index + 1} of "Instructions" !`}
                              </Box>
                                
                            </Box>
                          }
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
                          <Box
                            //disableRipple={stepsState.length >= 10 ? true : false}
                            sx={s.buttonNewHelper}
                          >
                            <Button
                              variant="contained"
                              disabled={stepsState.length >= 10 ? true : false}
                              id={`${index}`}
                              sx={s.buttonNew}
                              onClick={(e) => handlerAdd({ index: parseInt((e.target as HTMLInputElement).id, 10) })}
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
                          <Box
                            //disableRipple={stepsState.length === 1 ? true : false}
                            sx={s.buttonDeleteHelper}
                          >
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