import { useState, useEffect, useRef } from "react";
import css from "./MyRecipeCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { useSelector, useDispatch } from 'react-redux';
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import noLoaded from "../../images/noLoaded.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button, TextField, ListItemText, Checkbox, FormControl,
  InputLabel, MenuItem, Select, SelectChangeEvent
} from '@mui/material/';
import dietsEntireArray from '../../db/diets.json';
import dishesEntireArray from '../../db/dishes.json';
import Tooltip from '@mui/joy/Tooltip';
import Swal from 'sweetalert2';
import dicEs from '../../dictionary/es.json';
import dicEn from '../../dictionary/en.json';
import $ from 'jquery';
import { setSettingsFilters } from '../../actions';
import {
  errorI, handlerUpdateInstructionsI, handlerAddInstructionsI,
  validatorI, highlighterI, handlerDeleteInstructionsI,
  settingsFiltersI
} from '../../interfaces/interfaces';

const MyRecipe = ({
  setUserData, userData,
  retrieveRecipeCreatedOrEdited, paginateAmount
}: any) => {

  const arrImages = [noImage1, noImage2, noImage3];

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  let titleValueLS: string | null = localStorage.getItem('titleValue');
  let imageValueLS: string | null = localStorage.getItem('imageValue');
  let healthValueLS: string | null = localStorage.getItem('healthValue');
  let summaryValueLS: string | null = localStorage.getItem('summaryValue');
  let dishesArrayLS: string | null = localStorage.getItem('dishesArray');
  let dietsArrayLS: string | null = localStorage.getItem('dietsArray');
  let stepsStateLS: string | null = localStorage.getItem('stepsState');
 
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  const settingsFilters = useSelector((state: { settingsFilters: settingsFiltersI }) => state.settingsFilters)
  // eslint-disable-next-line
  const [isEditing, setIsEditing] = useState<boolean>( location.state && location.state.editing ? true : false );
  const [titleValue, setTitleValue] = useState<string>('');
  const [imageValue, setImageValue] = useState<string>('');
  // eslint-disable-next-line
  const [imageValueDoubleCheck, setImageValueDoubleCheck] = useState<string>('');
  const [healthValue, setHealthValue] = useState<string>('');
  const [summaryValue, setSummaryValue] = useState<string>('');
  const [dishesArray, setDishesArray] = useState<string[]>([]);
  const [dietsArray, setDietsArray] = useState<string[]>([]);
  const [stepsState, setStepsState] = useState<string[]>(['']);
  const recipeCreated = useRef(false);
  const [allDisabled, setAllDisabled] = useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handlerDeleteInstructions = ({ index }: handlerDeleteInstructionsI) => {
    let copyState = [...stepsState]
    copyState.splice(index, 1)
    setStepsState([...copyState])
    if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copyState]))

    if (settingsFilters.showBadWords) {
      let copyError = {...error}
      copyError.instructions.splice(index, 1)
      setError(copyError)

      copyState.forEach((e, idx) => {
          $(`#targetInstructions${idx}`).html(e)
          highlighter({value: e, type: 'instructions', index: idx})
      })
    }
      

  }

  const handlerAddInstructions = async ({ index }: handlerAddInstructionsI) => {

      let copyState = [...stepsState]
      copyState.splice(index + 1, 0, "")
      setStepsState([...copyState])

    const firstStep = async () => {

      

      let copyError = {...error}
      copyError.instructions.splice(index + 1, 0, { character: false, badWord: false, empty: true })
      setError(copyError)

      copyState.forEach((e,indexx) => {
        highlighter({value: e, type: 'instructions', index: indexx})

        // let qwee = document.getElementById(`${indexx + 1}instructions`)
        // function auto_grow(element: any) {
        // element.style.height = "5px";
        // element.style.height = (element.scrollHeight - 33) + "px";
        // }
        // qwee && auto_grow(qwee)

        // let qwee = document.getElementById(`${indexx}instructions`)
        // function auto_grow(element: any) {
        // element.style.height = "5px";
        // element.style.height = (element.scrollHeight - 33) + "px";
        // }
        // qwee && auto_grow(qwee)

      })
      if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copyState]))
    }
    const secondStep = async () => { // only highlight for last index
      let copyState2 = [...stepsState]

    


      if (copyState2.length > 1 && index !== copyState2.length - 1 ) {
        highlighter({value: copyState2.slice(copyState2.length-1)[0], type: 'instructions', index: copyState2.length})

        
        //var qwee = document.getElementById('instructions');
        //let qwee = document.getElementById('targetSummary')
       
        //qwee && auto_grow(qwee)

      }
      
    }


    if (settingsFilters.showBadWords) {
      firstStep().then(() => secondStep())
    }
    





  }

  const handlerUpdateInstructions = ({ index, value }: handlerUpdateInstructionsI) => {
    // let copy = [...stepsState]
    // copy.splice(index, 1, value)
    // setStepsState([...copy])
    // if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copy]))
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
    //$(`#target${type.slice(0,1).toUpperCase() + type.slice(1) + index}`)
    //$(`#targetInstructions${index}`)
    //$(`#${index}instructions`)
    
    //$(`#targetSummary`)
    //$(`#targetInstructions`)
    //$(`#targetInstructions0`)
    //$(`#targetInstructions${index}`)
    //$(`#0instructions`)
    //$(`#targetSummary`)
    
    //$(`#targetInstructions0`)
    //$(`#targetInstructions`)
    //$(`#0instructions`)
      .html(function() {
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

        if (type === `summary` || type === `instructions`) parsedToReturn.unshift("<div style='text-wrap: wrap'>")
        else parsedToReturn.unshift("<div>")
        //parsedToReturn.unshift("<div style='text-wrap: wrap'>")
        //parsedToReturn.unshift("<div>")
        parsedToReturn.push("</div>")

        return array[0] ? parsedToReturn.join("") : value
      })
  }

  const validator = async ({ manual, type, value, index }: validatorI) => {
    switch (type) {
      case (`title`):
        setTitleValue(value);
        if (!isEditing) localStorage.setItem('titleValue', value)
        if (settingsFilters.showBadWords) {
          let copyObjTitle = {...error}
          if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjTitle[type].character = true; setError({ ...copyObjTitle }) }
          else { copyObjTitle[type].character = false; setError({ ...copyObjTitle })}
          if (value.replaceAll(" ","").replaceAll("\n", "") === "") { copyObjTitle[type].empty = true; setError({ ...copyObjTitle }) }
          else { copyObjTitle[type].empty = false; setError({ ...copyObjTitle }) }
          highlighter({value, type})
        }
      break;
      case (`health`):
        setHealthValue(value);
        if (!isEditing) localStorage.setItem('healthValue', value)
        if (settingsFilters.showBadWords) {
          let copyObj = {...error}
          if (!/^\d+$/.test(value) && value.length !== 0 ) { copyObj.health.string = true; setError({ ...copyObj })}
          else { copyObj.health.string = false; setError({ ...copyObj })}
          if (parseInt(value, 10) > 100 && value.length !== 0) {copyObj.health.max = true; setError({ ...copyObj })}
          else { copyObj.health.max = false; setError({ ...copyObj })}
        }
      break;
      case (`summary`):
        setSummaryValue(value);
        if (!isEditing) localStorage.setItem('summaryValue', value)
        if (settingsFilters.showBadWords) {
          let copyObjSummary = {...error}
          if (/[^A-Za-z0-9-(áÁéÉíÍóÓúÚüÜñÑ),\n;.:¡!¿?'"()[\] ]/g.test(value) && value.length !== 0) { copyObjSummary[type].character = true; setError({ ...copyObjSummary }) }
          else { copyObjSummary[type].character = false; setError({ ...copyObjSummary })}
          if (value.replaceAll(" ","").replaceAll("\n", "") === "") { copyObjSummary[type].empty = true; setError({ ...copyObjSummary }) }
          else { copyObjSummary[type].empty = false; setError({ ...copyObjSummary }) }
          highlighter({value, type})
        }
      break;
      case (`instructions`):
        if (manual) {
          console.log("se ejecuto entro aca 123")
          let copyStepsState = [...stepsState]
          copyStepsState.splice(index!, 1, value)
          setStepsState([...copyStepsState])
          if (!isEditing) localStorage.setItem('stepsState', JSON.stringify([...copyStepsState]))
        }
        if (settingsFilters.showBadWords) {
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
        }
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
    // setSaveButtonDisabled(false);
    // setAllDisabled(false)
    setError({
      title: { character: false, badWord: false, empty: false },
      health: { string: false, max: false, empty: false },
      summary: { character: false, badWord: false, empty: false },
      instructions: [{ character: false, badWord: false, empty: false },]
    });
    localStorage.removeItem('titleValue');
    localStorage.removeItem('imageValue');
    localStorage.removeItem('healthValue');
    localStorage.removeItem('summaryValue');
    localStorage.removeItem('dishesArray');
    localStorage.removeItem('dietsArray');
    localStorage.removeItem('stepsState');
    $(`#targetTitle`)
      .html("<div></div>") // clear all highlighted
    $(`#targetSummary`)
      .html("<div></div>")
    $(`#targetInstructions0`)
      .html("<div></div>")
  };

  const clearFieldsNotif = () => {

    Swal.fire({
      title: 'Do you want to clear all&nbspfields&nbsp?',
      text: 'No undo.',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'CLEAR',
      denyButtonText: `CANCEL`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6', // NO ACTION COLOR
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
      text: 'Any changes you made will be lost.',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CANCEL EDITING',
      denyButtonText: `CONTINUE EDITING`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6' // NO ACTION COLOR
    })
    .then((result) => { if (result.isConfirmed) navigate("/") })
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
    if (dishesArray.length === 0) emptyInputs.push("Dishes")
    if (summaryValue.replaceAll(" ","").replaceAll("\n", "") === "") emptyInputs.push("Summary")
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
        title: `You must be logged to&nbspdo&nbspthat&nbsp!`,
        html: `Please, log-in with Google with the right‑upper&nbspside&nbspbutton.<br><br>Don't have a Google account ?<br>Please, follow this <a style="color:#0000EE"target="_blank" rel="noopener noreferrer" href="https://accounts.google.com/SignUp">link</a> and create a new one !`,
        icon: 'info',
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
        timer: 3000,
      })
    }

    else {
      fetch(`${process.env.REACT_APP_SV}/recipe`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
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
          recipeCreated.current = true
        }
        if (res.status === 400 && res.message === 'Invalid Credentials') {
          setUserData({ email: '', fd_tkn: '' })
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
        Swal.fire({
          title: `It looks like server its sleeping..`,
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
      fetch(`${process.env.REACT_APP_SV}/recipe`, {
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
          setUserData({ email: '', fd_tkn: '' })
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
        console.log(rej)
        Swal.fire({
          title: `It looks like server its sleeping..`,
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
    console.log("SE EJECUTO USEEFFECT")
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
          console.log("se ejecuto ESTE DE ACA")
          setTimeout(() => {
            // function auto_grow(element: any) { // EXECUTED AFTER LS READING/RETRIEVING
            //   element.style.height = "5px";
            //   element.style.height = (element.scrollHeight - 33) + "px";
            // }
            //stepsStateLS !== null && JSON.parse(stepsStateLS).forEach((el:any, idx:any) => {
            stepsStateLS && JSON.parse(stepsStateLS).forEach((el:any, idx:any) => {
              validator({ value: el, type: `instructions`, index: idx })
              // let qwe = document.getElementById(`${idx}instructions`)
              // qwe && auto_grow(qwe)
            })
          }, 0)
       }
      }
      return () => {
        if (recipeCreated.current) {
          clearHandler() // CLEAR FORM: SAVED && FIRES WHEN USER GO TO ANOTHER ROUTE/COMPONENT
          console.log("se ejecuto clearHandler")

        }
      }
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    console.log("SE EJECUTO USEEFFECT")
    if (saveButtonDisabled && allDisabled) retrieveRecipeCreatedOrEdited(true)
    else retrieveRecipeCreatedOrEdited(false)
    // eslint-disable-next-line
  },[allDisabled])

  useEffect(() => {
    console.log("SE EJECUTO USEEFFECT")
    if (paginateAmount === 45 && localStorage.getItem('showVisuals') === null) {
      $(`[class*="formDetail"]`)
        .css('backdrop-filter', 'unset')
        .css('box-shadow', 'unset')
        .css('background', 'rgba(196, 34, 147, 0.2)')
    } else if (paginateAmount === 90 && localStorage.getItem('showVisuals') === null) {
      $(`[class*="formDetail"]`)
        .css('backdrop-filter', 'blur(20px)')
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
        .css('background', 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))')
    } else if (settingsFilters.showVisuals) {
      console.log("entro aca 3")
      $(`[class*="formDetail"]`)
        .css('backdrop-filter', 'blur(20px)')
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
        .css('background', 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))')
    } else {
      console.log("entro aca 4")
      $(`[class*="formDetail"]`)
        .css('backdrop-filter', 'unset')
        .css('box-shadow', 'unset')
        .css('background', 'rgba(196, 34, 147, 0.2)')
    }
  },[])

  useEffect(() => {
    console.log("SE EJECUTO USEEFFECT")
    if (paginateAmount === 45 && localStorage.getItem('showVisuals') === null) {
      console.log("dispatched 1")
      dispatch(setSettingsFilters({ type: `showVisuals`, value: false }))
      //dispatch(setSettingsFilters({ type: `showBadWords`, value: false }))
    } else if (paginateAmount === 90 && localStorage.getItem('showVisuals') === null) {
      console.log("dispatched 2")
      dispatch(setSettingsFilters({ type: `showVisuals`, value: true }))
      //dispatch(setSettingsFilters({ type: `showBadWords`, value: true }))
    }
  },[paginateAmount, dispatch])
  
  window.onbeforeunload = function() { // CLEAR FORM: SAVED && FIRES WHEN WINDOW IS CLOSED OR REFRESH
    if (recipeCreated.current) clearHandler() // RESET ALL FORM
  }

  useEffect(() => {
    console.log("SE EJECUTO USEEFFECT")
    $(window).scrollTop(0)
  },[])

  //console.log("$('#test').prop('scrollHeight')", $('#summary').prop('scrollHeight'))
  
  // $('#summary')
  //   .css("height", `${$('#summary').prop('scrollHeight')}`)
  // let qwe = document.getElementById('summary')
  // function auto_grow(element: any) {
  //   element.style.height = "5px";
  //   element.style.height = (element.scrollHeight) + "px";
  // }
  // auto_grow(qwe)

  // useEffect(() => {
  //   let qwe = document.getElementById('summary')
  //   var qwee = document.querySelectorAll('[id$=instructions]');
  //   function auto_grow(element: any) {
  //     element.style.height = "5px";
  //     element.style.height = (element.scrollHeight - 33) + "px";
  //   }
  //   qwe && auto_grow(qwe)
  //   qwee && qwee.forEach(e => { auto_grow(e) })

  // })

  useEffect(() => {
    let qwe = document.getElementById('summary')
    var qwee = document.querySelectorAll('[id$=instructions]');
    function auto_grow(element: any) {
      element.style.height = "5px";
      element.style.height = (element.scrollHeight - 33) + "px";
    }
    qwe && auto_grow(qwe)
    qwee && qwee.forEach(e => { auto_grow(e) })
    function handleResizee() {
      qwe && auto_grow(qwe)
      qwee && qwee.forEach(e => { auto_grow(e) })
      
    }
    window.addEventListener("resize", handleResizee);
    return () => {
      window.removeEventListener("resize", handleResizee);
    }
  })

  // useEffect(() => {
  //   let qwe = document.getElementById('targetSummary')
  //   function auto_grow(element: any) {
  //     element.style.height = "5px";
  //     element.style.height = (element.scrollHeight - 33) + "px";
  //   }
  //   auto_grow(qwe)
  // })


  return (
    <div
      className={css.background}
      style={{ marginTop: menuShown ? '150px' : '100px' }}
    >
    <div
      className={`${css.formDetail} ${com.noSelect}`}
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
      <div className={`${css.createYourOwnRecipe} ${com.noSelect}`}>
        {
          isEditing ?
          `Edit your recipe. Don't forget to save it !` :
          `Create your own recipe ! Please fill in all fields:`
        }
      </div>

      <div className={css.eachRow}>
        <div className={css.text}>Title:</div>
        <Tooltip
          arrow
          variant="outlined"
          size="md"
          enterDelay={5000}
          enterNextDelay={5000}
          leaveDelay={200}
          enterTouchDelay={0}
          open={error.title.character || error.title.badWord}
          placement="bottom"
          style={{ zIndex: '1' }}
          hidden={ settingsFilters.showTooltips ? false : true }
          //style={{ zIndex: '1', display: 'none' }}
          // style={{
          //   zIndex: '1',
          //   display: // hidden={true} DONT WORK ON INPUT CHILDREN
          //     settingsFilters.showTooltips ?
          //     'inherit' :
          //     'none'
          // }}
          //hidden={true} // Deactivate Tooltip render
          //hidden={false} // Deactivate Tooltip render
          title={
            <div className={css.innerTooltip}>
              { error.title.character ? <div style={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Title" !</div> : null }
              { error.title.character ? <div style={{ color: '#42424f' }}>Allowed characters:</div> : null }
              { error.title.character ? <div style={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></div> : null }
              { error.title.badWord ? <div style={{ fontWeight: '400' }}><em>Please, remove </em><mark style={{ background: 'rgba(0, 255, 0, 0.4)' }}>highlighted</mark> <em>bad words.</em></div> : null }
              { error.title.character ? <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '400', fontStyle: 'italic' }}>Please, 
                <Tooltip
                  title={`Ä ä % { } @ / \\ # À à ° + ¬ $ & = * etc..`}
                  style={{ display: 'flex', flexDirection: 'column', color: '#42424f', background: '#f5f5f9', fontFamily: 'Roboto'}}
                >
                  <u>remove unallowed characters</u></Tooltip>.
              </div> : null }
            </div>
          }
        >
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              id={"targetTitle"}
              className={css.inputLayer}
            />
            <input
              id="title"
              disabled={allDisabled}
              autoComplete='off'
              className={css.inputBase}
              value={titleValue}
              placeholder={
                paginateAmount === 45 ?
                `Enter your title` :
                `e.g. Pasta with tomatoes..`
              }
              //onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
              onChange={(e) => {
                //settingsFilters.showBadWords ?
                //validator({ value: e.target.value, type: e.target.id }) :
                //setTitleValue(e.target.value)
                validator({ value: e.target.value, type: e.target.id })
              }}
            />
          </div>
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Image:</div>
        <Tooltip
          arrow
          variant="outlined"
          size="md"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          placement="bottom"
          disableFocusListener={ saveButtonDisabled && allDisabled ? true : false }
          disableHoverListener={ saveButtonDisabled && allDisabled ? true : false }
          style={{ zIndex: '1' }}
          //style={{ zIndex: '1', display: 'none' }}
          //style={{ zIndex: '1', display: 'inherit' }}
          hidden={ settingsFilters.showTooltips ? false : true }
          //settingsFilters.showTooltips ?
          title={
            <div className={css.innerTooltip}>
              { isEditing ? <div>Leave it empty for use the same image !</div> : <div>Please, copy and paste your food recipe image url here !</div> }
              { isEditing ? <div>Either if you want to use a new image, please, paste your new food recipe image url here !</div> : <div>If it's everything OK, you can preview your image in center upper box</div> }
              { isEditing ? <div>If your link its not valid, a random image gonna be used in your recipe.</div> : <div>If you dont give a link, or link its not valid, a random image gonna be used in your recipe.</div> }
              { <div><b>Tip: </b>If you can see the {isEditing ? `new ` : null}image in the upper-top box, the image will be saved safely.</div> }
            </div>
          }
        >
          <input
            id={`image`}
            disabled={allDisabled}
            //className={css.input}
            className={css.inputBase}
            // InputProps={{
            //   className: css.inputBaseImage
            // }}
            value={imageValue}
            autoComplete='off'
            placeholder={
              paginateAmount === 45 ?
              `Enter image url` :
              `e.g. https://commons.wikimedia.org/wiki/File:Elaboraci%C3%B3n_del_tomate_frito_(4).jpg`
            }
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
          arrow
          variant="outlined"
          size="md"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          open={error.health.string || error.health.max}
          placement="bottom-start"
          style={{ zIndex: '1' }}
          //style={{ zIndex: '1', display: 'none' }}
          hidden={ settingsFilters.showTooltips ? false : true }
          title={
            <div className={css.innerTooltip}>
              <div
                style={{ color: '#25252d', fontWeight: '400' }}
              >{error.health.string ?
                `Only numbers allowed in "Health Score" !` :
                `Allowed numbers are between 0 and 100 !`}
              </div>
            </div>
          }
        >
          <input
            id="health"
            //className={css.input}
            className={css.inputBase}
            // InputProps={{
            //   className: css.inputHealth
            // }}
            disabled={allDisabled}
            value={healthValue}
            autoComplete='off'
            placeholder={
              paginateAmount === 45 ?
              `Enter health level` :
              `e.g. 73`
            }
            onChange={(e) => {
              validator({ value: e.target.value, type: e.target.id })
              //setHealthValue(e.target.value)
            }}
          />
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Dishes:</div>
        <FormControl className={css.selectContainer}>
          <InputLabel className={css.label}>Select Dishes</InputLabel>
          <Select
            className={css.select}
            placeholder={`Select Dishes`}
            inputProps={{
              className: css.selectInput
            }}
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
          arrow
          variant="outlined"
          size="md"
          enterDelay={500}
          leaveDelay={200}
          enterTouchDelay={0}
          open={error.summary.character || error.summary.badWord}
          placement="bottom"
          style={{ zIndex: '1' }}
          //style={{ zIndex: '1', display: 'none' }}
          hidden={ settingsFilters.showTooltips ? false : true }
          title={
            <div className={css.innerTooltip}>
              { error.summary.character ? <div style={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Summary" !</div> : null }
              { error.summary.character ? <div style={{ color: '#42424f' }}>Allowed characters:</div> : null }
              { error.summary.character ? <div style={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></div> : null }
              { error.summary.badWord ? <div style={{ fontWeight: '400' }}><em>Please, remove </em><mark style={{ background: 'rgba(0, 255, 0, 0.4)' }}>highlighted</mark> <em>bad words.</em></div> : null }
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
          {/* <div className={css.summaryContainer}> */}
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              id={"targetSummary"}
              className={css.inputLayer}
            />
            <textarea
              id={"summary"}
              className={css.inputBase}
              autoComplete='off'
              value={summaryValue}
              placeholder={`e.g. Healthy pasta recipe`}
              //onChange={(e) => { validator({ value: e.target.value, type: e.target.id }) }}
              onChange={(e) => {
                validator({ value: e.target.value, type: e.target.id })
                //setSummaryValue(e.target.value)
              }}
            />
          </div>
        </Tooltip>
      </div>
      <div className={css.eachRow}>
        <div className={css.text}>Diets:</div>
        <FormControl className={css.selectContainer}>
          <InputLabel className={css.label}>Select Diets</InputLabel>
          <Select
            className={css.select}
            placeholder={`Select Diets`}
            multiple
            value={dietsArray}
            disabled={allDisabled}
            inputProps={{
              className: css.selectInput
            }}
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
                key={index}
                arrow
                variant="outlined"
                size="md"
                enterDelay={500}
                leaveDelay={200}
                enterTouchDelay={0}
                open={(error.instructions[index] && error.instructions[index].character) || (error.instructions[index] && error.instructions[index].badWord)}
                placement={ index % 2 === 0 ? `bottom-end` : `bottom-start` }
                style={{ zIndex: '1' }}
                //style={{ zIndex: '1', display: 'none' }}
                hidden={ settingsFilters.showTooltips ? false : true }
                title={
                  <div className={css.innerTooltip}>
                    { error.instructions[index] && error.instructions[index].character ? <div style={{ fontWeight: '400' }}>Special characters not allowed in "Instructions" !</div> : null }
                    { error.instructions[index] && error.instructions[index].character ? <div style={{ color: '#42424f' }}>Allowed characters:</div> : null }
                    { error.instructions[index] && error.instructions[index].character ? <div style={{ color: '#42424f', textAlign: 'center' }}><b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ] á Á é É í Í ó Ó ú Ú ü Ü ñ Ñ</b></div> : null }
                    { error.instructions[index] && error.instructions[index].badWord ? <div style={{ fontWeight: '400' }}><em>Please, remove </em><mark style={{ background: 'rgba(0, 255, 0, 0.4)' }}>highlighted</mark> <em>bad words on step {index + 1}.</em></div> : null }
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
                {/* <div className={css.instructionsContainer}> */}
                {/* <div style={{ width: '50%' }}> */}
                <div style={{ display: 'flex', width: '100%' }}>
                  <div
                    id={`targetInstructions${index}`}
                    //id={`targetInstructions`}
                    //disabled={allDisabled}
                    //shrink={false}
                    //className={css.inputShownInstructions}
                    className={`${css.inputLayer} ${css.inputLayerInstructions}`}
                  />
                  <textarea
                    id={`${index}instructions`}
                    className={`${css.inputBase} ${css.inputBaseInstructions}`}
                    // InputProps={{
                    //   className: css.inputInstructions
                    // }}
                    disabled={allDisabled}
                    autoComplete='off'
                    //multiline
                    value={stepsState[index]}
                    placeholder={`e.g. Cut pasta, fry tomatoes..`}
                    // sx={{
                    //   "& .MuiInputBase-input": { // 'pre-wrap' - AUTO-FITS // 'nowrap' - 1 SINGLE LINE
                    //     whiteSpace: stepsState[index] !== '' ? 'pre-wrap' : 'nowrap'
                    //   }
                    // }}
                    onChange={(e) => {
                      console.log("XXX e.target.value", e.target.value)
                      console.log("XXX e.target.id", e.target.id)
                      console.log("(e.target as HTMLTextAreaElement).id", (e.target as HTMLTextAreaElement).id)
                      
                      //handlerUpdateInstructions({ index: parseInt((e.target as HTMLTextAreaElement).id, 10), value: e.target.value });
                      validator({ manual: true, value: (e.target as HTMLTextAreaElement).value, type: (e.target as HTMLTextAreaElement).id.replace(/[0-9]/g, ''), index: parseInt((e.target as HTMLTextAreaElement).id, 10) });
                      //setSummaryValue(e.target.value)

                      //var qwee = document.querySelectorAll('[id$=instructions]');
                      
                      //var qwee = document.getElementById('instructions');
                      //let qwee = document.getElementById('targetSummary')

                      let qwee = document.getElementById(`${parseInt((e.target as HTMLTextAreaElement).id, 10)}instructions`)
                      function auto_grow(element: any) {
                        element.style.height = "5px";
                        element.style.height = (element.scrollHeight - 33) + "px";
                      }
                      qwee && auto_grow(qwee)
                      
                      
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
                disableFocusListener={ saveButtonDisabled && allDisabled ? true : stepsState.length >= 10 ? false : true }
                disableHoverListener={ saveButtonDisabled && allDisabled ? true : stepsState.length >= 10 ? false : true }
                placement="bottom-end"
                style={{ zIndex: '1' }}
                hidden={ settingsFilters.showTooltips ? false : true } // Deactivate Tooltip render
                //hidden={false} // Deactivate Tooltip render
                //style={{ zIndex: '1', display: 'contents' }}
                //style={{ zIndex: '1', display: 'inherit' }}
                //style={{ zIndex: '1', display: 'inherit' }}
                title={
                  <div className={css.newStepTooltip}>
                    <div>Max steps {`<`}10{`>`} reached !</div>
                    <div>Please, delete some old step to add new one.</div>
                  </div>
                }
              >
                <div
                  className={css.buttonAddHelper}
                >
                  <Button
                    variant="contained"
                    disabled={allDisabled ? true : stepsState.length >= 10 ? true : false}
                    id={`${index}`}
                    className={css.buttonNew}
                    sx={{ background: 'green' }}
                    onClick={(e) => handlerAddInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10 )})}
                  >
                  </Button>
                </div>
              </Tooltip>

              <Tooltip
                arrow
                enterDelay={700}
                enterNextDelay={700}
                leaveDelay={200}
                enterTouchDelay={0}
                disableFocusListener={ saveButtonDisabled && allDisabled ? true : stepsState.length === 1 ? false : true }
                disableHoverListener={ saveButtonDisabled && allDisabled ? true : stepsState.length === 1 ? false : true }
                placement="bottom-end"
                style={{ zIndex: '1' }}
                hidden={ settingsFilters.showTooltips ? false : true }
                //hidden={true} // Deactivate Tooltip render
                //hidden={false} // Deactivate Tooltip render
                //style={{ zIndex: '1', display: 'none' }}
                //style={{ zIndex: '1', display: 'contents' }}
                //style={{ zIndex: '1', display: 'inherit' }}
                title={"You can't delete first step !"}
              >
                <div
                  className={css.buttonDeleteHelper}
                >
                  <Button
                    variant="contained"
                    disabled={allDisabled ? true : stepsState.length === 1 ? true : false}
                    id={`${index}`}
                    className={css.buttonDelete}
                    sx={{ background: 'red' }}
                    onClick={(e) => { handlerDeleteInstructions({ index: parseInt((e.target as HTMLInputElement).id, 10) }) }}
                  >
                    


                  </Button>
                </div>
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
        >
          {
            isEditing ?
            `SAVE EDIT` :
            paginateAmount === 45 ?
            `SAVE` :
            `SAVE RECIPE`
          }
        </Button>
      </div>
    </div>
    </div>
  )
}

export default MyRecipe;