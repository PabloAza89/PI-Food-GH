import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as s from "../../styles/CreateRecipeSX";
import "../../styles/CreateRecipeSX.css";
import noLoaded from "../../images/noLoaded.jpg";
import logo from "../../images/logo.png";
import { useLocation } from "react-router-dom";
import { addNew } from '../../actions';
import { Box, Button, OutlinedInput, Input, InputBase, TextField, ListItemText, Checkbox, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import dietsEntireArray from '../../db/diets.json';
import dishesEntireArray from '../../db/dishes.json';
import Tooltip from '@mui/joy/Tooltip';
import Swal from 'sweetalert2';
import dicEs from '../../dictionary/es.json';
import dicEn from '../../dictionary/en.json';
import $ from 'jquery';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const CreateRecipe = ({ retrieveLogin, userData }: any) => {

  let titleValueLS: string | null = localStorage.getItem('titleValue');
  let imageValueLS: string | null = localStorage.getItem('imageValue');
  let healthValueLS: string | null = localStorage.getItem('healthValue');
  let summaryValueLS: string | null = localStorage.getItem('summaryValue');
  let dishesArrayLS: string | null = localStorage.getItem('dishesArray');
  let dietsArrayLS: string | null = localStorage.getItem('dietsArray');
  let stepsStateLS: string | null = localStorage.getItem('stepsState');

  const dispatch = useDispatch()
  const location = useLocation()

  let target = location.hash

  let start = target.indexOf(`#access_token=`)
  let end = target.indexOf(`&token_type=`)

  let authTk = target.slice(start+14,end)

  const [titlePlaceholder, setTitlePlaceholder] = useState<string>('e.g. Pasta with tomatoes..');
  const [healthScorePlaceholder, setHealthScorePlaceholder] = useState<string>('e.g. 73');
  const [summaryPlaceholder, setSummaryPlaceholder] = useState<string>('e.g. Healthy pasta recipe');
  //const [doNothing, setDoNothing] = useState<boolean>(false);

  const [titleValue, setTitleValue] = useState<string>('');
  const [imageValue, setImageValue] = useState<string>('');
  const [healthValue, setHealthValue] = useState<string>('');
  const [summaryValue, setSummaryValue] = useState<string>('');
  const [dishesArray, setDishesArray] = useState<string[]>([]);
  const [dietsArray, setDietsArray] = useState<string[]>([]);
  const [stepsState, setStepsState] = useState(['']);

  const [allDisabled, setAllDisabled] = useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  interface handlerI {
    index: number
  }

  const handlerDeleteInstructions = ({ index }: handlerI) => {
    let copyState = [...stepsState]
    copyState.splice(index, 1)
    setStepsState([...copyState])

    localStorage.setItem('stepsState', JSON.stringify([...copyState]))

    let copyError = {...error}
    copyError.instructions.splice(index, 1)
    setError(copyError)

    copyState.forEach((e, idx) => {
        $(`#targetInstructions${idx}`).html(e)
        highlighter({value: e, type: 'instructions', index: idx})
    })
  }

  interface handlerAddInstructionsI {
    index: number,
  }

   const handlerAddInstructions = async ({ index }: handlerAddInstructionsI) => {
    const firstStep = async () => {

      let copyState = [...stepsState]
      copyState.splice(index + 1, 0, "")
      setStepsState([...copyState])

      let copyError = {...error}
      copyError.instructions.splice(index + 1, 0, { character: false, badWord: false, empty: true })
      setError(copyError)

       copyState.forEach((e,indexx) => {
        highlighter({value: e, type: 'instructions', index: indexx})
      })

      localStorage.setItem('stepsState', JSON.stringify([...copyState]))

    }

    const secondStep = async () => { // only highlight for last index
      let copyState2 = [...stepsState]
      if (copyState2.length > 1 && index !== copyState2.length - 1 ) highlighter({value: copyState2.slice(copyState2.length-1)[0], type: 'instructions', index: copyState2.length})
    }

    firstStep().then(() => secondStep())
  }

  interface handlerUpdateInstructionsI {
    index: number,
    value: string
  }

  const handlerUpdateInstructions = ({ index, value }: handlerUpdateInstructionsI) => {
    let copy = [...stepsState]
    copy.splice(index, 1, value)
    setStepsState([...copy])
    //localStorage.setItem('stepsState', [...copy])
    localStorage.setItem('stepsState', JSON.stringify([...copy]))
  }

  const [showAlert, setShowAlert] = useState(false)
  const [firstInstance, setFirstInstance] = useState(false)
  const [created, setCreated] = useState(0)

  interface titleI {
    character: boolean,
    badWord: boolean,
    empty: boolean
  }

  interface healthI {
    string?: boolean,
    max?: boolean,
    empty: boolean
  }

  interface instructionsI {
    character: boolean,
    badWord: boolean,
    empty: boolean
  }

  interface summaryI {
    character: boolean,
    badWord: boolean,
    empty: boolean
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
      badWord: false,
      empty: true
    },
    health: {
      string: false,
      max: false,
      empty: true
    },
    summary: {
      character: false,
      badWord: false,
      empty: true
    },
    instructions:
    stepsStateLS !== null ?
    Array.from({length: JSON.parse(stepsStateLS).length}, (e,i) => ({character: false, badWord: false, empty: true}))
    :
    [
      {
        character: false,
        badWord: false,
        empty: true
      },
    ]
  });

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

    console.log("QUE VALUE", value)

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

    let badWordsInDicEn = dicEn.map((e, idx) => {
      return (
        characterReplacer(value)
          .search(RegExp(
            `^` + e + `$|` + // MATCH UNIQUE STRING WITH NOTHING AT START OR END
            `[-,\n;.:¡!¿?'"()\\][ ]` + e + `$|` + // ALLOWED CHARACTERS AT BEGGINING // TEST
            `^` + e + `[-,\n;.:¡!¿?'"()\\][ ]|` + // ALLOWED CHARACTERS AT END // TEST
            `[-,\n;.:¡!¿?'"()\\][ ]` + e + `[-,\n;.:¡!¿?'"()\\][ ]`  //+ `|` + // ALLOWED CHARACTERS AT START & END // TEST
          , "g" )) !== -1) ? { "target": e, "index": idx } : -1
    }).filter(e => e !== -1)

    //console.log("badWordsInDicEs", badWordsInDicEs)

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

    badWordsInDicEn?.filter(e => e !== -1)?.forEach((x, idx) => {
      if (x !== -1) [...characterReplacer(value).matchAll(RegExp(x.target, "g"))].forEach((e, gg) => {
        if (
          x.target[0] === e[0][0] &&
          x.target.length === e[0].length &&
          ( RegExp(`[-,\n;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! + e[0].length]) || value[e.index! + e[0].length] === undefined ) &&
          ( RegExp(`[-,\n;.:¡!¿?'"()\\][ ]`, `g`).test(value[e.index! - 1 ]) || value[e.index! -1] === undefined )
        ) firstArrayFilter.push({ "target": e[0].trim().replaceAll(/[^A-Za-z0-9 ]/g, ""), "start": e.index, "end": e.index! + e[0].length })
      })
    })

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

    //let copyObj: any = {...error}
    let copyObj: any = {...error}
    //console.log("copyObj", copyObj)
    //console.log("copyObj", copyObj)
    //console.log("array", array)


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

    console.log("value inside", value)
    console.log("array inside", array)

    // if ($(`#target${type.slice(0,1).toUpperCase() + type.slice(1) + index}`).length) {
    //   alert(`Div ${index} exists`);
    // } else{
    //   alert(`Div ${index} does not exists`);
    // }

    $(index !== undefined ? `#target${type.slice(0,1).toUpperCase() + type.slice(1) + index}` : `#target${type.slice(0,1).toUpperCase() + type.slice(1)}`)
      .html( function() {
        let parsedToReturn:string[] = []
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
        //console.log("parsedToReturn", parsedToReturn)
        //console.log("parsedToReturn", parsedToReturn)

        return array[0] ? parsedToReturn.join("") : value
      })

  }

  interface validateStringI {
    type: string,
    value: string,
    index?: number,
  }

  const validator = async ({ type, value, index }: validateStringI) => {
    switch (type) {
      case (`title`):
        let copyObjTitle = {...error}
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjTitle[type].character = true; setError({ ...copyObjTitle }) }
        else { copyObjTitle[type].character = false; setError({ ...copyObjTitle })}
        if (value.replaceAll(" ","").replaceAll("\n", "") === "") { copyObjTitle[type].empty = true; setError({ ...copyObjTitle }) }
        else { copyObjTitle[type].empty = false; setError({ ...copyObjTitle }) }
        setTitleValue(value);
        localStorage.setItem('titleValue', value)
        highlighter({value, type})
      break;
      case (`health`):
        let copyObj = {...error}
        if (!/^\d+$/.test(value) && value.length !== 0 ) { copyObj.health.string = true; setError({ ...copyObj })}
        else { copyObj.health.string = false; setError({ ...copyObj })}
        if (parseInt(value, 10) > 100 && value.length !== 0) {copyObj.health.max = true; setError({ ...copyObj })}
        else { copyObj.health.max = false; setError({ ...copyObj })}
        setHealthValue(value);
        localStorage.setItem('healthValue', value)
      break;
      case (`summary`):
        let copyObjSummary = {...error}
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjSummary[type].character = true; setError({ ...copyObjSummary }) }
        else { copyObjSummary[type].character = false; setError({ ...copyObjSummary })}
        setSummaryValue(value);
        localStorage.setItem('summaryValue', value)
        highlighter({value, type})
      break;
      case (`instructions`):
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].character = true
          copyObjInstructions.instructions[index!].empty = value.replaceAll(" ","").replaceAll("\n", "") === "" ? true : false
          console.log("copyObjInstructions.instructions 1", copyObjInstructions.instructions)
          //title.replaceAll(" ","").replaceAll("\n", "") === ""
          setError({ ...copyObjInstructions })
        } else {
          //let copyObjInstructions = stepsStateLS !== null ? {...error} : {...error}
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].character = false
          copyObjInstructions.instructions[index!].empty = value.replaceAll(" ","").replaceAll("\n", "") === "" ? true : false
          console.log("copyObjInstructions.instructions 2", copyObjInstructions.instructions)
          setError({ ...copyObjInstructions })
        }
        highlighter({value, type, index})
      break;
    }
  }

  const handleChangeDishes = (event: SelectChangeEvent<typeof dishesArray>) => {
    const { target: { value } } = event
    setDishesArray( typeof value === 'string' ? value.split(',') : value );
    localStorage.setItem('dishesArray', JSON.stringify(value))
  };


  const handleChangeDiets = (event: SelectChangeEvent<typeof dietsArray>) => {
    const { target: { value } } = event
    setDietsArray( typeof value === 'string' ? value.split(',') : value );
    localStorage.setItem('dietsArray', JSON.stringify(value))
  };

  const clearHandler = () => {
    setTitleValue('');
    setImageValue('');
    setHealthValue('');
    setSummaryValue('');
    setDishesArray([]);
    setDietsArray([]);
    setStepsState(['']);
    setSaveButtonDisabled(false);
    setAllDisabled(false)
    setError({
      title: { character: false, badWord: false, empty: false },
      health: { string: false, max: false, empty: false },
      summary: { character: false, badWord: false, empty: false },
      instructions: [{ character: false, badWord: false, empty: false },]
    });
    localStorage.clear()
    $(`#targetInstructions0`)
      .html("<div></div>")
    $(`#targetTitle`)
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

  function handleSubmit(e:any) {
    let emptyInputs = []

    if (titleValue.replaceAll(" ","").replaceAll("\n", "") === "") emptyInputs.push("Title")
    if (healthValue.replaceAll(" ","").replaceAll("\n", "") === "") emptyInputs.push("Health Score")
    if (summaryValue.replaceAll(" ","").replaceAll("\n", "") === "") emptyInputs.push("Summary")
    if (dishesArray.length === 0) emptyInputs.push("Dishes")
    if (dietsArray.length === 0) emptyInputs.push("Diets")
    if (stepsState.map((e) => {if (e.replaceAll(" ","").replaceAll("\n", "") === "") return 1; else return -1}).some(e => e !== -1)) {
      let indexNumbers: any = []
      stepsState.forEach((e,i) => {if (e.replaceAll(" ","").replaceAll("\n", "") === "") indexNumbers.push(i+1) })
      emptyInputs.push(
        indexNumbers.length > 1 ?
        `Step ${indexNumbers.slice(0,-1).map((e:any) => e).join(", ") + " and " + indexNumbers.slice(-1)} on Instructions` :
        `Step ${indexNumbers[0]} on Instructions`,
      )
    }

    //console.log("emptyInputs.length", emptyInputs.length)
    console.log("emptyInputs", emptyInputs)

    if (emptyInputs.length > 0) {
      Swal.fire({
        title:
          emptyInputs.length > 1 ?
          `${emptyInputs.slice(0,-1).map(e => e).join(", ") + " & " + emptyInputs.slice(-1)}
          cannot be empty !` :
          `${emptyInputs[0]} cannot be empty !`,
        text: `Please, fill all fields`.concat(emptyInputs.some(e => e.includes('Instructions')) ? ` or either remove empty steps on Instructions` : `.`),
        icon: 'info',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        timer: 1000,
      })
    } // qq.some(e => e.includes('Instructions'))


    else if (emptyInputs.length === 0 && userData.email === '') {
    //if (userData.email === '') {
      Swal.fire({
        title: `You must be logged to do that ! `,
        //html: `Please, log-in with Google with the right-upper side button.<br><br>Don't have a Google account ?<br>Please, follow this <a target="_blank" rel="noopener noreferrer" href="https://accounts.google.com/SignUp">link</a> and create a new one !`,
        html: `Please, log-in with Google with the right-upper side button.<br><br>Don't have a Google account ?<br>Please, follow this <a style="color:#0000EE"target="_blank" rel="noopener noreferrer" href="https://accounts.google.com/SignUp">link</a> and create a new one !`,
        icon: 'info',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        timer: 3000,
      })
    }

    else {

          fetch(`http://localhost:3001/recipes`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              title: titleValue,
              image: imageValue,
              healthScore: healthValue,
              summary: summaryValue,
              dishes: dishesArray,
              diets: dietsArray,
              analyzedInstructions: stepsState,
              email: userData.email,
              fd_tkn: userData.fd_tkn
            })
          })
          .then((res) => res.json())
          .then((res) => {
            console.log("RES RES", res)
            if (res.status === 200) {
              Swal.fire({
                title: 'Recipe saved successfully !',
                icon: 'info',
                showConfirmButton: false,
                showDenyButton: false,
                showCancelButton: false,
                timer: 1000,
              })
              setSaveButtonDisabled(true)
              setAllDisabled(true)
            }
            if (res.status === 400 && res.message === 'Invalid Credentials') {
              console.log("PASS BY THIS WAY")
              retrieveLogin({ email: '', fd_tkn: '' })
              Swal.fire({
                title: `There was an error when cheking your loggin.. `,
                text: `Please, log in again.`,
                icon: 'info',
                showConfirmButton: false,
                showDenyButton: false,
                showCancelButton: false,
                timer: 3000,
              })
              setSaveButtonDisabled(false)
              setAllDisabled(false)
            }
          })
          // .then((res) => {
          //   setSaveButtonDisabled(true)
          //   setAllDisabled(true)
          // })

      // fetch(`http://localhost:3001/user`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   }
      // })
      // .then((res) => res.json())
      //.then((res) => {
       // console.log("RES RES", res)

        // if (res.status === 400 && res.message === 'Invalid Credentials') {
        //   console.log("PASS BY THIS WAY")
        //   retrieveLogin({ email: '', fd_tkn: '' })
        //   Swal.fire({
        //     title: `There was an error when cheking your loggin.. `,
        //     text: `Please, log in again.`,
        //     icon: 'info',
        //     showConfirmButton: false,
        //     showDenyButton: false,
        //     showCancelButton: false,
        //     timer: 3000,
        //   })
        // }

        // if (res.status === 200) {
        //   fetch(`http://localhost:3001/recipes`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       title: titleValue,
        //       image: imageValue,
        //       healthScore: healthValue,
        //       summary: summaryValue,
        //       dishes: dishesArray,
        //       diets: dietsArray,
        //       analyzedInstructions: stepsState,
        //       email: userData.email
        //   }),
        //   headers: {
        //       'Content-type': 'application/json; charset=UTF-8',
        //   }
        //   })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     if (res.status === 200) {
        //       Swal.fire({
        //         title: 'Recipe saved successfully !',
        //         icon: 'info',
        //         showConfirmButton: false,
        //         showDenyButton: false,
        //         showCancelButton: false,
        //         timer: 1000,
        //       })
        //     }

        //   })
        //   .then((res) => {
        //     setSaveButtonDisabled(true)
        //     setAllDisabled(true)
        //   })
        // }

        // if (res.status !== 200) { // TESTING
        //   Swal.fire({
        //     title: 'There was an error saving your Recipe..',
        //     text: 'Please try again.',
        //     icon: 'error',
        //     showConfirmButton: false,
        //     showDenyButton: false,
        //     showCancelButton: false,
        //     timer: 1000,
        //   })
        // }


       //})
      .catch((rej) => {
        console.log("rej", rej)
        Swal.fire({
          title: `It's seems like server its sleeping..`,
          html: `So you cannot save your recipe.<br>We are sorry. Please try againg later..<br><br>Don't worry about everything you wrote, it will be saved in browser memory :) `,
          icon: 'error',
          showConfirmButton: false,
          showDenyButton: false,
          showCancelButton: false,
          timer: 3000,
        })
      })
      ////.then((rej) => console.log(rej))
    }
  }

  
  

  //console.log("stepsState", stepsState)
  //console.log(JSON.stringify(error, null, 4))
  //localStorage.clear()
  console.log("dishesEntireArray", dishesEntireArray)
  

  useEffect(() => { // RETRIEVES INFO FROM LS
    if (titleValueLS !== null) { setTitleValue(titleValueLS); validator({ type: `title`, value: titleValueLS }) }
    if (imageValueLS !== null) setImageValue(imageValueLS)
    if (healthValueLS !== null) { setHealthValue(healthValueLS); validator({ type: `health`, value: healthValueLS }) }
    if (summaryValueLS !== null) { setSummaryValue(summaryValueLS); validator({ type: `summary`, value: summaryValueLS }) }
    if (dishesArrayLS !== null) setDishesArray(JSON.parse(dishesArrayLS))
    if (dietsArrayLS !== null) setDietsArray(JSON.parse(dietsArrayLS))
    if (stepsStateLS !== null) {
      setStepsState(JSON.parse(stepsStateLS))
      setTimeout(() => {
        stepsStateLS !== null && JSON.parse(stepsStateLS).forEach((el:any, idx:any) => {
          validator({ value: el, type: `instructions`, index: idx })
        })
       }, 0)
    }
  },[])

  return (
    <Box
      component="form"
      sx={s.form}
    >
      <Box component="img" sx={{ width: '0px', height: '0px' }} src={ imageValue } onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(false)} />  {/* HIDDEN, ONLY FOR IMAGE VERIFICATION PURPOSES. */}
      <Box>
        <Box component="img" sx={s.imageSearcher} src={ imageLoaded ? imageValue : noLoaded } />
      </Box>

      <Typography>Create your own recipe ! Please fill in all fields:</Typography>



      <GoogleAuth retrieveLogin={retrieveLogin} userData={userData} />

      <Box sx={s.eachRow}>
        <Box sx={s.text}>Title:</Box>
        <Tooltip
          sx={s.tooltipCenter}
          arrow
          variant="outlined"
          size="lg"
          enterDelay={5000}
          enterNextDelay={5000}
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
            <InputLabel disabled={allDisabled} id={"targetTitle"} shrink={false} sx={s.inputShownTitle({ disabled: allDisabled})}>{ titleValue }</InputLabel>
            <TextField
              //autoFocus
              className={`testTitle`}
              disabled={allDisabled}
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
        <Box sx={s.text}>Image:</Box>
        <Tooltip
          sx={s.tooltipLeft}
          arrow
          variant="outlined"
          size="lg"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          /* open={error.image.start} */
          placement="bottom"
          title={
            <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', fontWeight: '400' }}>
                <Box>Please, copy and paste your food recipe link image url here !</Box>
                <Box>If it's everything OK, you can preview your image in center upper box</Box>
                <Box>If you dont give a link, or link its not valid, a random image gonna be used in your recipe.</Box>
              </Box>
            </Box>
          }
        >
          <TextField
            className={`inputPos`}
            id="image"
            disabled={allDisabled}
            sx={s.input}
            value={imageValue}
            autoComplete='off'
            placeholder={`e.g. https://commons.wikimedia.org/wiki/File:Elaboraci%C3%B3n_del_tomate_frito_(4).jpg`}
            //onFocus={() => setHealthScorePlaceholder("")}
            //onBlur={() => setHealthScorePlaceholder(`e.g. https://commons.wikimedia.org/wiki/File:Elaboraci%C3%B3n_del_tomate_frito_(4).jpg`)}
            onChange={(e) => {
              setImageValue(e.target.value.trim())
              localStorage.setItem('imageValue', e.target.value)
            }}
          />
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
            disabled={allDisabled}
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
        <Box sx={s.text}>Dishes:</Box>
        <FormControl>
          <InputLabel>Select Dishes</InputLabel>
          <Select
            sx={s.input}
            placeholder={`Select Dishes`}
            multiple
            value={dishesArray}
            disabled={allDisabled}
            label="Select Dishes"
            onChange={handleChangeDishes}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={ {PaperProps: { style: { maxHeight: `${48 * 4.5}px`, width: 300 }}}}
          >
            {dishesEntireArray.filter(e => e.title !== `All Dishes`).map(e => (
              <MenuItem
                key={e.title}
                value={`${e.title}`}
              >
                <Checkbox checked={dishesArray.indexOf(e.title) > -1} />
                <ListItemText primary={e.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            <InputLabel disabled={allDisabled} id={"targetSummary"} shrink={false} sx={s.inputShownSummary}>{ summaryValue }</InputLabel>
            <TextField
              id="summary"
              autoComplete='off'
              sx={s.inputHiddenSummary}
              value={summaryValue}
              disabled={allDisabled}
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
            disabled={allDisabled}
            label="Select Diets"
            onChange={handleChangeDiets}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={ {PaperProps: { style: { maxHeight: `${48 * 4.5}px`, width: 300 }}}}
          >
            {dietsEntireArray.filter(e => e.title !== `All Diets`).map(e => (
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

          {/* stepsState[2] !== undefined &&  */stepsState.map((e, index) => (
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
                open={error.instructions[index].character || error.instructions[index].badWord}
                placement={ index % 2 === 0 ? `bottom-end` : `bottom-start` }
                title={
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                    { error.instructions[index].character ? <Box sx={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Instructions" !</Box> : null }
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
                
                <Box id={`testtest${index}`}>
                  {/* {console.log("a ver esto", index)} */}
                  {/* <InputLabel disabled={allDisabled} id={`targetInstructions${index}`} shrink={false} sx={s.inputShownInstructions}>{ stepsState[index] }</InputLabel> */}
                  <InputLabel disabled={allDisabled} id={`targetInstructions${index}`} shrink={false} sx={s.inputShownInstructions}>{ stepsState[index] }</InputLabel>
                  <TextField
                    id={`${index}instructions`}
                    autoComplete='off'
                    multiline
                    disabled={allDisabled}
                    value={stepsState[index]}
                    placeholder={`e.g. Cut pasta, fry tomatoes..`}
                    sx={s.inputHiddenInstructions}
                    onChange={(e) => {
                      handlerUpdateInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10), value: e.target.value });
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
                    disabled={allDisabled ? true : stepsState.length >= 10 ? true : false}
                    id={`${index}`}
                    sx={s.buttonNew}
                    onClick={(e) => { handlerAddInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10 )}) }}
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
                    disabled={allDisabled ? true : stepsState.length === 1 ? true : false}
                    id={`${index}`}
                    sx={s.buttonDelete}
                    onClick={(e) => { handlerDeleteInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
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
        >CLEAR
        </Button>
        <Button
          sx={s.buttonClearSave}
          variant="contained"
          onClick={(e) => handleSubmit(e)}
          disabled={
            saveButtonDisabled ||
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
        >SAVE RECIPE
        </Button>
      </Box>
    </Box>
  )
}

export default CreateRecipe;