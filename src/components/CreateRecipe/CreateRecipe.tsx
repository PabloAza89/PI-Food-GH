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
  //const [titleValue, setTitleValue] = useState<string>('<strong>ASDASDASD</strong>');
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

  // const validator = ({ type, value, index }: validateStringI) => {
  //   switch (type) {
  //     case (`title`):
  //       if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)) setError({...error, [type]: true})
  //       else setError({...error, [type]: false});
  //       setTitleValue(value);
  //     break;
  //     case (`health`):
  //       let copyObj = {...error}
  //       if (!/^\d+$/.test(value) && value.length !== 0 ) { copyObj.health.string = true; setError({ ...copyObj })}
  //       else { copyObj.health.string = false; setError({ ...copyObj })}
  //       if (parseInt(value, 10) > 100 && value.length !== 0) {copyObj.health.max = true; setError({ ...copyObj })}
  //       else { copyObj.health.max = false; setError({ ...copyObj })}
  //       setHealthValue(value);
  //     break;
  //     case (`summary`):
  //       if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)) setError({...error, [type]: true})
  //       else setError({...error, [type]: false});
  //       setSummaryValue(value);
  //     break;
  //     case (`instructions`):
  //       if (/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value)) {
  //         let copyObj = {...error}
  //         copyObj.instructions.splice(index!, 1, { error: true }  )
  //         setError(copyObj)
  //       } else {
  //         let copyObj = {...error}
  //         copyObj.instructions.splice(index!, 1, { error: false }  )
  //       }
  //     break;
  //   }
  // }

  const validator = ({ type, value, index }: validateStringI) => {
    switch (type) {
      case (`title`):
        if (/([^a-zA-Z0-9-,;.:¡!¿?'"()[\] ])/g.test(value) && value.length !== 0) setError({...error, [type]: true}) // NEW REGEX !
        // ALLOWED CHARACTERS: , ; . : - ! ¡ ¿ ? ' " () [] (15)
        else setError({...error, [type]: false});
        setTitleValue(value);




        let badWordsInDicEs = dicEs.map((e, idx) => {
          return (value.toLowerCase().search(RegExp(
            `^` + e + `$|` + // MATCH UNIQUE STRING WITH NOTHING AT START OR END
            `[-,;.:¡!¿?'"()\\][ ]` + e + `$|` + // ALLOWED CHARACTERS AT BEGGINING // TEST
            `^` + e + `[-,;.:¡!¿?'"()\\][ ]|` + // ALLOWED CHARACTERS AT END // TEST
            `[-,;.:¡!¿?'"()\\][ ]` + e + `[-,;.:¡!¿?'"()\\][ ]`  //+ `|` + // ALLOWED CHARACTERS AT START & END // TEST

            , "g" )) !== -1) ? { "target": e, "index": idx } : -1
        }).filter(e => e !== -1)

        // console.log(JSON.stringify(badWordsInDicEs, null, 4)) // ok

        let array: any = []

        
        //console.log(JSON.stringify(badWordsInDicEs, null, 4)) // ok

        badWordsInDicEs?.filter(e => e !== -1)?.forEach((x, idx) => {

          if (x !== -1) [...value.matchAll(RegExp(
            `^` + x.target + `$|` + // UNIQUE WORD WITH NOTHING AT START OR END
            `^` + x.target + `[-,;.:¡!¿?'"()\\][ ]|` + // START WORD WITH ALLOWED CHARACTER AT END
            `[-,;.:¡!¿?'"()\\][ ]` + x.target + `$|` + // ALLOWED CHARACTER AT BEGGINING AND NOTHING AT END
            x.target + `$|` + // WORD AT END
            x.target + `[-,;.:¡!¿?'"()\\][ ]` // WORD CONTINUED WITH ALLOWED CHARACTERS
            , "g")
          )].forEach((e) => {

            if (x.target[0] === e[0][0] && x.target.length === e[0].length) array.push({ "target": e[0].replace(/[^A-Za-z0-9]/g, ""), "start": e.index, "end": e.index! + e[0].length }) // EQUAL = START AND END ARE EQUAL
            if (x.target[0] !== e[0][0] && x.target.length === e[0].length - 1) array.push({ "target": e[0].replace(/[^A-Za-z0-9]/g, ""), "start": e.index! + 1, "end": e.index! + e[0].length }) // "SPACE" AT BEGGINING = FIRST LETTER IS DIFFERENT // + 1 LENGTH IN e[0].length
            if (x.target[0] !== e[0][0] && x.target.length === e[0].length - 2) array.push({ "target": e[0].replace(/[^A-Za-z0-9]/g, ""), "start": e.index! + 1, "end": e.index! + e[0].length - 1 }) // "SPACE" AT BEGGINING AND END = FIRST LETTER IS DIFFERENT // + 2 LENGTH IN e[0].length
            if (x.target[0] === e[0][0] && x.target.length === e[0].length - 1) array.push({ "target": e[0].replace(/[^A-Za-z0-9]/g, ""), "start": e.index! , "end": e.index! + e[0].length - 1 }) // "SPACE" AT END = FIRST LETTER ARE EQUAL // + 1 LENGTH IN e[0].length

            // console.log("in diceES", x.target[0])
            // console.log("written", e[0][0])
            // console.log("in diceES", x.target.length)
            // console.log("written", e[0].length)

          })

        })

        console.log(JSON.stringify(array, null, 4)) // ok

        //console.log("value", value) // ok

        $("#targetVVV")
          //console.log("AA", $("#targetVVV").html())
          //.html(`<plaintext style="color:blue">${titleValue}`).css("color", "blue")
          //.html(`<div style="color:blue">${titleValue}</div>`).css("color", "blue")
          //.html(`<div style="color:blue">${value}</div>`)//.css("color", "blue")
          //.html(`<div>${value}</div>`)//.css("color", "blue")
          //.html(`<div><div>${value}</div></div>`)//.css("color", "blue")
          //.html(`<div style="color:blue">${value.substring(0,1)}</div><mark style="color:green">${value.substring(1)}</mark>`)//.css("color", "blue")
          // .html(function() {
          //   var emphasis = "<em>" + " paragraphs!</em>";
          //   return "<p>All new content for " + emphasis + "</p>";
          // })
          .html(function() {
            return array.map((e) => {
              return "<mark>" + value.substring(e.start, e.end) + "</mark>" + value.substring(e.end)
            })
            
            //var emphasis = "<em>" + " paragraphs!</em>";
            //return "<p>All new content for " + emphasis + "</p>";
          })

        // $(function(){
        //   // let qq = $("#title").select(function(){
        //   //   //alert("Text marked!");
        //   //   console.log("qq", qq)
        //   // })
        //   $("#targetVVV").scrollLeft($("#title").scrollLeft()!)
        //   // $("#title").each(function() {               // ***
        //   //       let qq = $(this).data("original", $(this).text()); // ***
        //   //       console.log("qq", qq)
        //   //     })
        //   //$("#title").scrollLeft(0)
          
        //       //console.log(".scrollLeft()", $("#title").scrollLeft())
        // })

        //console.log("ACAA") // ok
        //console.log("value", value) // ok

      // $(function(){
      //     //$("#title")
      //     $("#targetVVV")
      //     //console.log("AA", $("#targetVVV").html())
      //     //.html(`<plaintext style="color:blue">${titleValue}`).css("color", "blue")
      //     .html(`${titleValue}`).css("color", "blue")
      //     //.text("new text");
      //     // .text(function(){
      //     //   $(this).css("color", "blue")
      //     // })
      //     //.html(`${titleValue}`)//.css("fontSize", "55px");
      //     //.html(`<string style="color:blue">${titleValue}</string>`).css("color", "green");
      //     //.html(`<span style="color:blue">${titleValue}</span>`)//.css("fontSize", "55px");
          
      //     //.text("<strong>new text</strong>");
      //     //.text("<strong>new text</strong>");
      //     //.text(<strong> + "new text" + </strong>);
      //     //.val("<p>" + "AA" + "</p>")
      //     ///.each(function() {               // ***
      //      // .css("color", "red")
      //       //.val("AAA").css("color", "blue")
            
      // })


        // $(function(){
        //   $("#title").each(function() {               // ***
        //     $(this).data("original", $(this).text()); // ***
        //     //console.log("this", this)
        //   })                                            // ***
          
          
        //     $('#title').each(function() {
        //         var text = $(this).data("original"),      // ***
        //         textL = text.toLowerCase(),
        //         index = textL.indexOf(this);         // ***
        //         //console.log("text", text)
          
        //       if (index !== -1) {
        //         //var htmlR = text.substr(0, index) + '<b>' + text.substr(index, text.length) + '</b>' + text.substr(index + text.length); // ***
        //         var htmlR = text.substr(0, 1) + '<p style="color:red">' + text.substr(1, 2) + '</p>' + text.substr(4); // ***
                
        //         //$(this).html(htmlR).show()
        //         $(this).html(htmlR)//.show()
        //       }/*  else {
        //         $(this).hide();
        //       } */
        //     });
         
              

        // })

        // $(function(){
        //   //$("#targetVVV")//.each(function() {               // ***
        //     //.val("ASDASD")
        //     //.text("<strong>" + "new text" + "</strong>")
        //     //let origin = $("#targetVVV").text()
        //     //$("#targetVVV").text(origin)
        //     //console.log($("#targetVVV").val())
        //     $("#targetVVV").val()
        //     //.val("AAA")
        //     //$("#title").append($("#title").css("color", "red"));
        //     //$("#targetVVV").replaceWith(<InputLabel id={"targetVVV"} shrink={false} sx={s.inputLabelContainer}>{titleValue}</InputLabel>);
        //   //   $("#targetVVV").on("mouseenter",function () {
        //   //     $(this).find('aa').css("color", "blue");
        //   // })//.trigger('change');
            
        // })     
              
          
              //.css("color", "red")
              
              //.css("color", "red")
              //.css("fontWeight", "bold")
              //.css("color", "red")
              //.val("AA")
              //.css("background", "red")
              //.css("color", "green")
            //console.log("#targetVVV", $("#targetVVV"))
              //$("#targetVVV>").css('color', 'green');
              //$("#targetVVV").animate({color:'black'},1000);

            //console.log("#targetVVV", $("#targetVVV").text())
            //let qq = $("#otherTest").data("original", $("#otherTest").text()); // ***
            //console.log("this", this)
            //if (qq) console.log("qq", (qq[0] as HTMLInputElement).value)
            //console.log("qq", (qq[0] as HTMLInputElement).value)

            //let ww = (qq[0] as HTMLInputElement)//.value
            //console.log("ww", ww)

              //var htmlR = <input>{ww.substring(0,1)} + <p style={{ color: "red" }}> + {ww.substring(1, 3)} + </p> + {ww.substring(3)}</input>
              //var htmlR = <Box>ASDASD</Box>

              //var htmlR = <input > + {ww.substring(0, 1)} + <p style="color:red"> {ww.substring(1, ww.length - 1)} </p> </input>
              //var htmlR = <Box id="otherTest"><strong>{titleValue}</strong></Box>

              //var htmlR = <TextField>ww.substring(0,1) + ww.substring(1, 3) + ww.substring(3)</TextField>
              //$("#title").html(htmlR)

              //$("#title").replaceWith(htmlR)

            //$("#title").css('font-weight', 'bold');
            //$("#title:first-letter").css('font-weight', 'bold');
           // $("#title").each(function(){     
              // if(ww.substr(0,1).toUpperCase() === 'B'){
              //   //$(this).addClass('someclass')
              //   var select = <p>333</p>
              //   $(this).css('font-weight', 'bold')//.add(select);
              // }
              
                //$(this).addClass('someclass')
                //$("#title").data("original", $("#title").text()).substring(0,1).css('font-weight', 'bold')
                
              
             //})
         //   })     
            
        //     //$("#title").append($("<p>").css("color", "red").text("*"));
        //     //$("#title").append($("<p>").css("color", "red").text("*"));
            
        //     //$("#title").html("<i>This is my italic text</i>");
        //     //let ww = (qq[0] as HTMLInputElement)
        //     //let ww = (qq[0] as HTMLInputElement)
        //     //ww.wrapInner("<strong />")
        //     //$("#title").text($("#title").text().replace("Bye"));
        //     // console.log("ww", ww[0])
        //     // let aa = '<b>' + ww[0] + '</b>';
        //     // let bb = ww[1]
        //     // let cc = aa + bb
        //     //  $("#title")
        //     //    .val(cc);
        //     //console.log("ww.innerHTML", ww.innerHTML)

        //     //$("#title").css('font-weight', 'bold');
        //     //$("#title")
        //     //$("#title[input]:last-child")
        //     //$("#title")
        //       //.css('font-weight', 'bold');
        //     //: {  marginBottom: '0px' }
            

        //     //var text = this.value
            
        //       //console.log("text", text)
              
        //       //console.log("this", (this as HTMLElement).value)
             
            



        //       // var htmlR = <input>{ww.substring(0,1)} + <p style={{ color: "red" }}> + {ww.substring(1, 3)} + </p> + {ww.substring(3)}</input>
        //       //var htmlR = <Box>ASDASD</Box>

        //       //var htmlR = <input > + {ww.substring(0, 1)} + <p style="color:red"> {ww.substring(1, ww.length - 1)} </p> </input>

        //       //var htmlR = <TextField>ww.substring(0,1) + ww.substring(1, 3) + ww.substring(3)</TextField>
        //       //$("#title").html(htmlR)

        //       //$("#title").replaceWith(htmlR)

             
              



        //   })                                  
          
          
         
              

     //   })



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

  // $(function(){
  //   $(`.dietCard${id}`).prop(`scrollWidth`) > $(`.dietCard${id}`).innerWidth()! ? setFitDiet(false) : setFitDiet(true)
  //   $(`.titleCard${id}`).prop(`scrollWidth`) > $(`.titleCard${id}`).innerWidth()! ? setFitTitle(false) : setFitTitle(true)
  //   $(`.dishCard${id}`).prop(`scrollWidth`) > $(`.dishCard${id}`).innerWidth()! ? setFitDish(false) : setFitDish(true)
  // })

  // $(function(){

  //   $(`.buttonDeleteStep`)
  //     .on( "mouseenter", function(){
  //       //if ()setButtonDeleteStepLast()
  //       //stepsState.length === 1 ? setButtonDeleteStepLast(true) : setButtonDeleteStepLast(false)
  //       console.log("enter")

  //   })
  //   .on( "mouseleave", function(){
  //     //stepsState.length === 1 ? setButtonDeleteStepLast(true) : setButtonDeleteStepLast(false)
  //     //setButtonDeleteStepLast(false)
  //     console.log("leave")
  //   })

  // })

  //   $(function(){

  //   $(`.buttonDeleteStep`)
  //     .on( "mouseenter", function(){
  //       //if ()setButtonDeleteStepLast()
  //       //stepsState.length === 1 ? setButtonDeleteStepLast(true) : setButtonDeleteStepLast(false)
  //       console.log("enter")

  //   })
  //   .on( "mouseleave", function(){
  //     //stepsState.length === 1 ? setButtonDeleteStepLast(true) : setButtonDeleteStepLast(false)
  //     //setButtonDeleteStepLast(false)
  //     console.log("leave")
  //   })

  // })


  // $(`.buttonDeleteStep`)
  //   .on( "mouseenter", function(){
  //     //if ()setButtonDeleteStepLast()
  //     //stepsState.length === 1 ? setButtonDeleteStepLast(true) : setButtonDeleteStepLast(false)
  //     console.log("enter")

  //   })
  //   .on( "mouseleave", function(){
  //     //stepsState.length === 1 ? setButtonDeleteStepLast(true) : setButtonDeleteStepLast(false)
  //     //setButtonDeleteStepLast(false)
  //     console.log("leave")
  //   })




  //console.log("stepsState", stepsState)
  //let qq = "estupido de mierda"
  //let qq = "11ab2dol"
  //let qq = "este es un pelotuda, bob"
  //console.log("dicEs", dicEs)

  //qq.map(e => ww.search(e))
  //let ww = dicEs.map(e => qq.search(e))
  //console.log("resultado", ww)
  //console.log("resultado", ww.filter(e => e !== -1))

  //console.table(error)
  //console.log("error", error)
  //console.log(JSON.stringify(error, null, 4));
  //console.log("healthValue", typeof healthValue)
  //console.log("healthValue.length", healthValue.length)

  // $(function(){
  //   $(`.testTitle`)
  //     .css("color", "red")
  // })

  // $(function(){
  //   $(`#title`)
  //     .css("color", "red")
  // })

  // $(function(){
  //   $(`.testTitle`)
  //     .css("color", "red")
  // })

  $(function(){
    $("#title").on("scroll",function(e) {
      
      $("#targetVVV").scrollLeft($("#title").scrollLeft()!)
      // $("#targetVVV")
      //     //console.log("AA", $("#targetVVV").html())
      //     //.html(`<plaintext style="color:blue">${titleValue}`).css("color", "blue")
      //     //.html(`<div style="color:blue">${titleValue}</div>`)
      //     .html(function() {
      //       //var emphasis = "<em>" + $( "p" ).length + " paragraphs!</em>";
      //       // var emphasis = "<em>" + " paragraphs!</em>";
      //       // return "<p>All new content for " + emphasis + "</p>";
      //       var emphasis = "<em>" + " paragraphs!</em>";
      //       return "<p>All new content for " + emphasis + "</p>";
      //     })
          //.css("color", "blue")
      // $("#targetVVV")
      //     //console.log("AA", $("#targetVVV").html())
      //     //.html(`<plaintext style="color:blue">${titleValue}`).css("color", "blue")
      //     .html(`${titleValue}`).css("color", "blue")
    })
    
   })


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
                    enterDelay={500}
                    leaveDelay={200}
                    enterTouchDelay={0}
                    open={error.title}
                    //open={true}
                    placement="bottom"
                    //onKeyDown={(e) => e.stopPropagation()}
                    variant="outlined"
                    size="lg"
                    title={
                      <Box sx={{ display: 'flex', flexDirection: 'column', color: '#25252d', background: '#f5f5f9', fontFamily: 'Roboto'}}>
                        <Box sx={{ fontWeight: '400', fontSize: '17px' }}>Special characters not allowed in "Title" !</Box>
                        <Box sx={{ color: '#42424f' }}>Allowed characters: <b>, ; . : - ! ¡ ¿ ? ' " ( ) [ ]</b> [15]</Box>
                        <Box sx={{ fontWeight: '400' }}><em>Please, <u>remove unallowed characters</u>.</em></Box>
                      </Box>
                    }
                  >

                    <Box>
                      {/* <InputLabel size="small" shrink={false} value={titleValue} sx={{ zIndex: 4000 }}>  AAAAAA  </InputLabel> */}
                      {/* <InputLabel shrink={false} sx={s.inputLabelContainer} ><TextField sx={s.textFieldInsideLabel}>{titleValue}</TextField></InputLabel> */}
                      {/* <InputLabel shrink={false} sx={s.inputLabelContainer} ><TextField sx={s.textFieldInsideLabel}>{<strong>${titleValue}</strong>}</TextField></InputLabel> */}
                      {/* <InputLabel shrink={false} sx={s.inputLabelContainer} ><TextField>{<strong>${titleValue}</strong>}</TextField></InputLabel> */}
                      {/* <InputLabel shrink={false} sx={s.inputLabelContainer} >{<strong>${titleValue}</strong>}</InputLabel> */}
                      {/* <InputLabel id={"targetVVV"} shrink={false} sx={s.inputLabelContainer} >{RegExp(titleValue, "g")}</InputLabel> */}
                      <InputLabel id={"targetVVV"} shrink={false} sx={s.inputLabelContainer}>{titleValue}</InputLabel>
                      {/* <p contentEditable="true" style={s.inputLabelContainer()}><strong>{titleValue}</strong></p> */}
                      {/* {titleValue} */}
                      <TextField
                        //label={titleValue}
                        //label={<><strong>"AAA"</strong> "AAA"<strong>"AAA"</strong></>}
                        //label={<strong>"AAA"</strong>}
                        //label={"AAA"}
                        //label={"AAAAAAAAAAAAAAAAAAAAAAAADASDASDASDWQqwe21sadfsdfsdfsdfsdf"}
                        
                        //label={'margin="none"'}
                        //shrink={false}
                        //hiddenLabel={false}
                        //label={'margin="none"'}
                        //InputLabelProps={{ shrink: false, focused: false, style: { color: 'black' } }}
                        //InputLabelProps={{ shrink: false, focused: false, style: { color: 'red', paddingTop: '0.5px', } }}

                        //InputLabelProps={{ /* sx: { userSelect: "text" }, */ shrink: true, focused: true, style: s.textFieldLabel() }}

                        //InputLabelProps={{ sx: { userSelect: "text" } }}
                        //LabelProps={{ shrink: false, focused: false, style: s.test1() }}
                        //onKeyDown={(e) => e.stopPropagation()}
                        //InputProps={{ color: 'red' }}
                        //InputProps={{ style: s.textFieldInput()/* , readOnly: true */ } }
                        //InputProps={{ style: { color: 'blue', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', khtmlUserSelect: 'none', MozUserSelect: 'none', MsUserSelect: 'none', UserSelect: 'none' } }}
                       
                        //InputProps={{ style: { color: 'black', userSelect: 'none' } }}
                        //InputProps={{ style: s.test() }}
                        //input={"ASDASD"}
                        //input={titleValue}
                        //placeholder={`ASDASD`}
                        //input={<OutlinedInput />}
                        
                        
                        className={`testTitle`}
                        //id={`testTitle`}
                        sx={s.input}
                        //sx={{label: s.test3}}
                        //inputRef={textInput}
                        //type="text"
                        autoComplete='off'
                        id="title"
                        value={titleValue}
                        //value={parse('<strong>' + 'AAA' + '</strong>')}
                        //value={parse('<strong>' + 'AAA' + '</strong>')}
                        //value={parse(`<strong>${titleValue}</strong>`)}
                        
                        //value="&lt;b&gt;Some text&lt;b/&gt;"
                        //value={"AAA".replace(new RegExp('(^|)(' + "AAA" + ')(|$)','ig'), '$1<b>$2</b>$3')}
                        //value="&quot;<b>http://sansoftmax.blogspot.com/</b>&quot;"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                        //value={<strong>"AAA"</strong>}
                        //value={<strong>"AAA"</strong>}
                        //value={JSON.parse(<strong>"AAA"</strong>)}
                        
                        //placeholder={<strong>"AAA"</strong>}
                        //placeholder={<strong>`BBBBBB`</strong>}
                        //placeholder={titlePlaceholder}
                        //placeholder={titleValue}
                        //onScroll={(e) => {$("#targetVVV").scrollLeft($("#title").scrollLeft()!)}}
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