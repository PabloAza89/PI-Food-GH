import { useState, useEffect, useRef } from "react";
import css from "./MyRecipeCSS.module.css";
//import '../../commons/disableAutoFocusSA2.module.css';
import { useDispatch, useSelector } from 'react-redux';
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import noLoaded from "../../images/noLoaded.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { addNew, setHasScroll } from '../../actions';
import { Button, TextField, ListItemText, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import dietsEntireArray from '../../db/diets.json';
import dishesEntireArray from '../../db/dishes.json';
import Tooltip from '@mui/joy/Tooltip';
import Swal from 'sweetalert2';
import dicEs from '../../dictionary/es.json';
import dicEn from '../../dictionary/en.json';
import $ from 'jquery';
import {
  errorI, handlerUpdateInstructionsI, handlerAddInstructionsI,
  validateStringI, highlighterI, handlerDeleteInstructionsI
} from '../../interfaces/interfaces';

const MyRecipe = ({ retrieveLogin, userData, retrieveRecipeCreatedOrEdited }: any) => {

  const arrImages = [noImage1, noImage2, noImage3];

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const hasScroll = useSelector((state: { hasScroll: boolean }) => state.hasScroll)
  const scrollWidth = useSelector((state: { scrollWidth: number }) => state.scrollWidth)

  let titleValueLS: string | null = localStorage.getItem('titleValue');
  let imageValueLS: string | null = localStorage.getItem('imageValue');
  let healthValueLS: string | null = localStorage.getItem('healthValue');
  let summaryValueLS: string | null = localStorage.getItem('summaryValue');
  let dishesArrayLS: string | null = localStorage.getItem('dishesArray');
  let dietsArrayLS: string | null = localStorage.getItem('dietsArray');
  let stepsStateLS: string | null = localStorage.getItem('stepsState');
 
  const [isEditing, setIsEditing] = useState<boolean>( location.state && location.state.editing ? true : false );
  const [titlePlaceholder, setTitlePlaceholder] = useState<string>('e.g. Pasta with tomatoes..');
  const [healthScorePlaceholder, setHealthScorePlaceholder] = useState<string>('e.g. 73');
  const [summaryPlaceholder, setSummaryPlaceholder] = useState<string>('e.g. Healthy pasta recipe');
  const [titleValue, setTitleValue] = useState<string>('');
  const [imageValue, setImageValue] = useState<string>('');
  const [imageValueDoubleCheck, setImageValueDoubleCheck] = useState<string>('');
  const [healthValue, setHealthValue] = useState<string>('');
  const [summaryValue, setSummaryValue] = useState<string>('');
  const [dishesArray, setDishesArray] = useState<string[]>([]);
  const [dietsArray, setDietsArray] = useState<string[]>([]);
  const [stepsState, setStepsState] = useState<string[]>(['']);
  const [allDisabled, setAllDisabled] = useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handlerDeleteInstructions = ({ index }: handlerDeleteInstructionsI) => {
    let copyState = [...stepsState]
    copyState.splice(index, 1)
    setStepsState([...copyState])

    if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copyState]))

    let copyError = {...error}
    copyError.instructions.splice(index, 1)
    setError(copyError)

    copyState.forEach((e, idx) => {
        $(`#targetInstructions${idx}`).html(e)
        highlighter({value: e, type: 'instructions', index: idx})
    })
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
      if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copyState]))
    }
    const secondStep = async () => { // only highlight for last index
      let copyState2 = [...stepsState]
      if (copyState2.length > 1 && index !== copyState2.length - 1 ) highlighter({value: copyState2.slice(copyState2.length-1)[0], type: 'instructions', index: copyState2.length})
    }
    firstStep().then(() => secondStep())
  }

  const handlerUpdateInstructions = ({ index, value }: handlerUpdateInstructionsI) => {
    let copy = [...stepsState]
    copy.splice(index, 1, value)
    setStepsState([...copy])
    if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copy]))
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
      stepsStateLS !== null && !isEditing ?
      Array.from({length: JSON.parse(stepsStateLS).length}, (e,i) => ({character: false, badWord: false, empty: true})) :
      isEditing ?
      Array.from({length: location.state.analyzedInstructions.length}, (e,i) => ({character: false, badWord: false, empty: true})) :
      [
        {
          character: false,
          badWord: false,
          empty: true
        },
      ]
  });

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

        return array[0] ? parsedToReturn.join("") : value
      })
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
        if (!isEditing) localStorage.setItem('titleValue', value)
        highlighter({value, type})
      break;
      case (`health`):
        let copyObj = {...error}
        if (!/^\d+$/.test(value) && value.length !== 0 ) { copyObj.health.string = true; setError({ ...copyObj })}
        else { copyObj.health.string = false; setError({ ...copyObj })}
        if (parseInt(value, 10) > 100 && value.length !== 0) {copyObj.health.max = true; setError({ ...copyObj })}
        else { copyObj.health.max = false; setError({ ...copyObj })}
        setHealthValue(value);
        if (!isEditing) localStorage.setItem('healthValue', value)
      break;
      case (`summary`):
        let copyObjSummary = {...error}
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjSummary[type].character = true; setError({ ...copyObjSummary }) }
        else { copyObjSummary[type].character = false; setError({ ...copyObjSummary })}
        setSummaryValue(value);
        if (!isEditing) localStorage.setItem('summaryValue', value)
        highlighter({value, type})
      break;
      case (`instructions`):
        if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].character = true
          copyObjInstructions.instructions[index!].empty = value.replaceAll(" ","").replaceAll("\n", "") === "" ? true : false
          setError({ ...copyObjInstructions })
        } else {
          let copyObjInstructions = {...error}
          copyObjInstructions.instructions[index!].character = false
          copyObjInstructions.instructions[index!].empty = value.replaceAll(" ","").replaceAll("\n", "") === "" ? true : false
          setError({ ...copyObjInstructions })
        }
        highlighter({value, type, index})
      break;
    }
  }

  const handleChangeDishes = (event: SelectChangeEvent<typeof dishesArray>) => {
    const { target: { value } } = event
    setDishesArray( typeof value === 'string' ? value.split(',') : value );
    if (!isEditing) localStorage.setItem('dishesArray', JSON.stringify(value))
  };

  const handleChangeDiets = (event: SelectChangeEvent<typeof dietsArray>) => {
    const { target: { value } } = event
    setDietsArray( typeof value === 'string' ? value.split(',') : value );
    if (!isEditing) localStorage.setItem('dietsArray', JSON.stringify(value))
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

  const handleCancelEdit = () => {
    Swal.fire({
      title: 'Do you want to cancel editing and go back ?',
      text: 'Any changes you have made gonna be lost.',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CANCEL EDITING',
      denyButtonText: `CONTINUE EDITING`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6' // NO ACTION COLOR
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigate("/")
      }
    })
  }

  $(function(){
    $("#title").on("scroll",function(e) {
      $("#targetTitle").scrollLeft($("#title").scrollLeft()!)
    })
  })

  const handleSubmit = (e:any) => {
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
    }

    else if (emptyInputs.length === 0 && !userData.email) {
      Swal.fire({
        title: `You must be logged to do that ! `,
        html: `Please, log-in with Google with the right-upper side button.<br><br>Don't have a Google account ?<br>Please, follow this <a style="color:#0000EE"target="_blank" rel="noopener noreferrer" href="https://accounts.google.com/SignUp">link</a> and create a new one !`,
        icon: 'info',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        timer: 3000,
      })
    }

    else {
      fetch(`http://localhost:3001/recipe`, {
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
        if (res.status === 400 && res.message !== 'Invalid Credentials') {
          Swal.fire({
            title: `There was an error when saving your recipe.. `,
            text: `Please try again.`,
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
    }
  }

  const handleSaveEdit = (e:any) => {
    let emptyInputs = []

    if (titleValue.replaceAll(" ","").replaceAll("\n", "") === "") emptyInputs.push("Title")
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
    }

    else if (emptyInputs.length === 0 && !userData.email) {
      Swal.fire({
        title: `You must be logged to do that ! `,
        html: `Please, log-in with Google with the right-upper side button.<br><br>Don't have a Google account ?<br>Please, follow this <a style="color:#0000EE"target="_blank" rel="noopener noreferrer" href="https://accounts.google.com/SignUp">link</a> and create a new one !`,
        icon: 'info',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        timer: 3000,
      })
    }

    else {
      fetch(`http://localhost:3001/recipe`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id: location.state.id,
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
        if (res.status === 400 && res.message.name === 'SequelizeDatabaseError') {
          Swal.fire({
            title: `There was an error when updating your recipe.. `,
            text: `Please, try save again.`,
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
          setSaveButtonDisabled(false)
          setAllDisabled(false)
        }

        if (res.status === 200 && res.message === `1 item updated`) {
          Swal.fire({
            title: 'Recipe updated successfully !',
            icon: 'success',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 1500,
          })
          setSaveButtonDisabled(true)
          setAllDisabled(true)
        }

        if (res.status === 400 && res.message === 'Invalid Credentials') {
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
    }
  }

  useEffect(() => { // RETRIEVES INFO FROM LS
    if (isEditing) {
        setTitleValue(location.state.title) // validator not necessary since no badWords are stored.
        setHealthValue(location.state.healthScore)
        let dishesParsed = location.state.dishTypes.map((e:any, idx: any) => {
          return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
        })
        setDishesArray(dishesParsed)
        setSummaryValue(location.state.summary)
        setDietsArray(location.state.diets)
        setStepsState(location.state.analyzedInstructions)
      } else {
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
      }
  },[])

  useEffect(() => {
    if (saveButtonDisabled && allDisabled) retrieveRecipeCreatedOrEdited(true)
    else retrieveRecipeCreatedOrEdited(false)
  },[saveButtonDisabled, allDisabled])

  console.log("isEditing isEditing", isEditing)
  console.log("imageLoaded imageLoaded", imageLoaded)
  console.log("error.instructions error.instructions", error.instructions)
  console.log("location.state.analyzedInstructions.length", location.state && location.state.analyzedInstructions.length)
  console.log("hasScroll hasScroll", hasScroll)


  return (
    <div
      /* sx={s.form({ hasScroll, scrollWidth })} */
      className={css.form}
      style={{ marginRight: hasScroll ? `${96 + scrollWidth}px` : `96px` }}
    >
        <img // HIDDEN. ONLY FOR IMAGE VERIFICATION PURPOSES.
          style={{ width: '0px', height: '0px' }}
          src={imageValue}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
          alt=""
        />
      
        <img
          className={css.imageSearcher}
          src={
            isEditing && location.state.image.length === 1 && imageValue.length === 0 ?
            arrImages[parseInt(location.state.image, 10) - 1] : // DEFAULT IMAGE IS RANDOM // EDITING MODE
            isEditing && location.state.image.length > 1 && imageValue.length === 0 ?
            `https://res.cloudinary.com/dtembdocm/image/upload/` + location.state.image : // DEFAULT IMAGE IS UUID // EDITING MODE
            imageLoaded ?
            imageValue : // IMAGE IT'S NEW URL // DOUBLE CHECK/LOADING FOR EDITED ENCODED URL IMAGE
            noLoaded // IMAGE NOT FOUND
          }
          alt=""
        />
      

      <div className={css.title}>
        {
          isEditing ?
          `Edit your recipe. Don't forget to save it !` :
          `Create your own recipe ! Please fill in all fields:`
        }
      </div>

      <div className={css.eachRow}>
        <div className={css.text}>Title:</div>
        <Tooltip
          className={css.tooltipCenter}
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
            <div style={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
              { error.title.character ? <div style={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Title" !</div> : null }
              { error.title.character ? <div style={{ color: '#42424f' }}>Allowed characters:</div> : null }
              { error.title.character ? <div style={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></div> : null }
              { error.title.badWord ? <div style={{ fontWeight: '400' }}><em>Please, remove </em><mark>highlighted</mark> <em>bad words.</em></div> : null }
              { error.title.character ? <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '400', fontStyle: 'italic' }}>Please, 
                <Tooltip
                  title={`Ä ä % { } @ / \\ # À à ° ¬ $ & = * etc..`}
                  style={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                >
                  <u>remove unallowed characters</u></Tooltip>.
                
              </div> : null }
            </div>
          }
        >
          <div>
            <InputLabel
              id={"targetTitle"}
              disabled={allDisabled}
              shrink={false}
              className={css.inputShownTitle}
              style={{ color: 'rgba(0, 0, 0, 0.87)' }}
            >{ titleValue }</InputLabel>
            <TextField
              disabled={allDisabled}
              id="title"
              autoComplete='off'
              className={css.inputHiddenTitle}
              inputProps={{
                style: {
                  color: 'transparent',
                  caretColor: 'rgba(0, 0, 0, 0.87)'
                }
              }}
              value={titleValue}
              placeholder={`e.g. Pasta with tomatoes..`}
              onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
            />
          </div>
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Image:</div>
        <Tooltip
          className={css.tooltipLeft}
          arrow
          variant="outlined"
          size="lg"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          placement="bottom"
          title={
            <div style={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
              <div style={{ display: 'flex', flexDirection: 'column', color: '#25252d', fontWeight: '400' }}>
                { isEditing ? <div>Leave it empty for use the same image !</div> : <div>Please, copy and paste your food recipe image url here !</div> }
                { isEditing ? <div>Either if you want to use a new image, please, paste your new food recipe image url here !</div> : <div>If it's everything OK, you can preview your image in center upper box</div> }
                { isEditing ? <div>If your link its not valid, a random image gonna be used in your recipe.</div> : <div>If you dont give a link, or link its not valid, a random image gonna be used in your recipe.</div> }
                { <div><b>Tip: </b>If you can see the image in the upper-top box, the image will be saved safely.</div> }
              </div>
            </div>
          }
        >
          <TextField
            id={`image`}
            disabled={allDisabled}
            className={css.input}
            value={imageValue}
            autoComplete='off'
            placeholder={`e.g. https://commons.wikimedia.org/wiki/File:Elaboraci%C3%B3n_del_tomate_frito_(4).jpg`}
            onChange={(e) => { // DOUBLE CHECK/LOADING FOR EDITED ENCODED URL IMAGE
              let copyImageValue = e.target.value.trim()
              if (!isEditing) localStorage.setItem('imageValue', e.target.value)
              setImageValue(e.target.value.trim())
              setImageValueDoubleCheck(e.target.value.trim())
              setTimeout(() => {
                setImageValueDoubleCheck("")
              }, 100)
              setTimeout(() => {
                setImageValueDoubleCheck(copyImageValue)
              }, 200)
            }}
          />
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Health Score:</div>
        <Tooltip
          className={css.tooltipLeft}
          arrow
          variant="outlined"
          size="lg"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          open={error.health.string || error.health.max}
          placement="bottom-start"
          title={
            <div style={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
              <div
                style={{ color: '#25252d', fontWeight: '400' }}
              >{error.health.string ?
                `Only numbers allowed in "Health Score" !` :
                `Allowed numbers are between 0 and 100 !`}
              </div>
            </div>
          }
        >
          <TextField
            id="health"
            className={css.input}
            disabled={allDisabled}
            value={healthValue}
            autoComplete='off'
            placeholder={healthScorePlaceholder}
            onFocus={() => setHealthScorePlaceholder("")}
            onBlur={() => setHealthScorePlaceholder(`e.g. 73`)}
            onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
          />
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Dishes:</div>
        <FormControl>
          <InputLabel>Select Dishes</InputLabel>
          <Select
            className={css.input}
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
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Summary:</div>
        <Tooltip
          className={css.tooltipCenter}
          arrow
          variant="outlined"
          size="lg"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          open={error.summary.character || error.summary.badWord}
          placement="bottom"
          title={
            <div style={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
              { error.summary.character ? <div style={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Summary" !</div> : null }
              { error.summary.character ? <div style={{ color: '#42424f' }}>Allowed characters:</div> : null }
              { error.summary.character ? <div style={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></div> : null }
              { error.summary.badWord ? <div style={{ fontWeight: '400' }}><em>Please, remove </em><mark>highlighted</mark> <em>bad words.</em></div> : null }
              { error.summary.character ? <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '400', fontStyle: 'italic' }}>Please, 
                <Tooltip
                  title={`Ä ä % { } @ / \\ # À à ° ¬ $ & = * etc..`}
                  style={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                >
                  <u>remove unallowed characters</u>
                </Tooltip>.
              </div> : null }
            </div>
          }
        >
          <div>
            <InputLabel
              id={"targetSummary"}
              disabled={allDisabled}
              shrink={false}
              className={css.inputShownSummary}
            >{ summaryValue }</InputLabel>
            <TextField
              id={"summary"}
              className={css.inputHiddenSummary}
              inputProps={{
                style: {
                  color: 'transparent',
                  caretColor: 'rgba(0, 0, 0, 0.87)'
                }
              }}
              autoComplete='off'
              value={summaryValue}
              disabled={allDisabled}
              multiline
              placeholder={summaryPlaceholder}
              onFocus={() => setSummaryPlaceholder("")}
              onBlur={() => setSummaryPlaceholder(`e.g. Healthy pasta recipe`)}
              onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
            />
          </div>
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Diets:</div>
        <FormControl>
          <InputLabel>Select Diets</InputLabel>
          <Select
            className={css.input}
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
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Instructions:</div>
        <div className={css.stepsContainer}>

          {stepsState.map((e, index) => (
            <div key={index} className={css.eachStep}>
              <div className={css.stepTitle}>Step {index + 1}:</div>

              <Tooltip
                className={ index % 2 === 0 ? css.tooltipRight : css.tooltipLeft }
                key={index}
                arrow
                variant="outlined"
                size="lg"
                enterDelay={500}
                leaveDelay={200}
                enterTouchDelay={0}
                open={(error.instructions[index] && error.instructions[index].character) || (error.instructions[index] && error.instructions[index].badWord)}
                placement={ index % 2 === 0 ? `bottom-end` : `bottom-start` }
                title={
                  <div style={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                    { error.instructions[index] && error.instructions[index].character ? <div style={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Instructions" !</div> : null }
                    { error.instructions[index] && error.instructions[index].character ? <div style={{ color: '#42424f' }}>Allowed characters:</div> : null }
                    { error.instructions[index] && error.instructions[index].character ? <div style={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></div> : null }
                    { error.instructions[index] && error.instructions[index].badWord ? <div style={{ fontWeight: '400' }}><em>Please, remove </em><mark>highlighted</mark> <em>bad words on step {index + 1}.</em></div> : null }
                    { error.instructions[index] && error.instructions[index].character ?
                      <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '400', fontStyle: 'italic' }}>Please, 
                        <Tooltip
                          title={`Ä ä % { } @ / \\ # À à ° ¬ $ & = * etc..`}
                          style={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                        >
                          <u>remove unallowed characters</u>
                        </Tooltip> on step {index + 1}.
                      </div> : null }
                  </div>
                }
              >
                <div>
                  <InputLabel
                    disabled={allDisabled}
                    id={`targetInstructions${index}`}
                    shrink={false}
                    className={css.inputShownInstructions}
                  >{ stepsState[index] }</InputLabel>
                  <TextField
                    id={`${index}instructions`}
                    autoComplete='off'
                    multiline
                    disabled={allDisabled}
                    value={stepsState[index]}
                    placeholder={`e.g. Cut pasta, fry tomatoes..`}
                    className={css.inputHiddenInstructions}
                    onChange={(e) => {
                      handlerUpdateInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10), value: e.target.value });
                      validator({ value: e.target.value, type: e.target.id.replace(/[0-9]/g, ''), index: parseInt((e.target as HTMLInputElement).id, 10) })
                    }}
                  />
                </div>
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
                  <div className={css.newStepTooltip}>
                    <div>Max steps {`<`}10{`>`} reached !</div>
                    <div>Please, delete some old step to add new one.</div>
                  </div>
                }
              >
                {/* <Box sx={s.buttonNewHelper}> */}
                  <Button
                    variant="contained"
                    disabled={allDisabled ? true : stepsState.length >= 10 ? true : false}
                    id={`${index}`}
                    className={css.buttonNew}
                    onClick={(e) => { handlerAddInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10 )}) }}
                  >NEW STEP
                  </Button>
                {/* </Box> */}
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
                {/* <Box sx={s.buttonDeleteHelper}> */}
                  <Button
                    variant="contained"
                    disabled={allDisabled ? true : stepsState.length === 1 ? true : false}
                    id={`${index}`}
                    className={css.buttonDelete}
                    onClick={(e) => { handlerDeleteInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
                  >DELETE STEP
                  </Button>
                {/* </Box> */}
              </Tooltip>
            </div>
          ))}

        </div>
      </div>
      <div className={css.eachRow}>
        <Button
          className={css.buttonClearSave}
          variant="contained"
          onClick={() =>
            saveButtonDisabled && allDisabled ?
            navigate("/") : // `GO BACK`
            isEditing ?
            handleCancelEdit() : // `CANCEL`
            clearFieldsNotif() // `CLEAR`
          }
        >
          {
            saveButtonDisabled && allDisabled ?
            `GO BACK` :
            isEditing ?
            `CANCEL` :
            `CLEAR`
          }
        </Button>
        <Button
          className={css.buttonClearSave}
          variant="contained"
          onClick={(e) => isEditing ? handleSaveEdit(e) : handleSubmit(e) }
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
        >{ isEditing ? `SAVE EDIT` : `SAVE RECIPE` }
        </Button>
      </div>
    </div>
  )
}

export default MyRecipe;