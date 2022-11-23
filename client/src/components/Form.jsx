import React, { useState } from "react";
import "../styles/Form.css";
import noImage1 from "../images/noImage1.jpg";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

export default function Form({ GetAfterCreated }) {
  
  const [showAlert, setShowAlert] = useState(false)
  const [firstInstance, setFirstInstance] = useState(false)

  const [created, setCreated] = useState(0)
  const [dietSelected, setDietSelected] = useState([])
  let uniqueNamesDiets = Array.from(new Set(dietSelected));

  let handleDietSelected = (event) => {   
    setDietSelected(current => [...current, event])
  }

  const [title, setTitle] = useState('');
  const [healthScore, setHealthScore] = useState("");
  const [summary, setSummary] = useState("");
  const [analyzedInstructions, setAnalyzedInstructions] = useState("");
  
  const [error, setError] = useState({
    title: "",
    health: {
      one: "",
      two: ""
    },
    summary: "",
    instructions: ""
  });

  function handleNewRecipe() {    
    setDietSelected([])
    setCreated(0)
    setTitle("")
    setHealthScore("")
    setSummary("")
    setAnalyzedInstructions("")
    setError(error, error.title = "", error.health.one = "", error.health.two = "", error.summary= "", error.instructions= "")
    
  }
  
  function handleSubmitButton() {
    if (error.title || error.health.one || error.health.two || error.summary || error.instructions ||
      (document.getElementById("checkerTitle")&&document.getElementById("checkerTitle").value.length === 0) ||
      (document.getElementById("checkerHealth")&&document.getElementById("checkerHealth").value.length === 0) ||
      (document.getElementById("checkerSummary")&&document.getElementById("checkerSummary").value.length === 0) ||
      (document.getElementById("checkerInstructions")&&document.getElementById("checkerInstructions").value.length === 0) ||
      uniqueNamesDiets.length === 0) return true
    else return false
  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (created === 0) {      
      await fetch('http://localhost:3001/recipes', {
       method: 'POST',
       body: JSON.stringify({
          title: title,
          diets: uniqueNamesDiets,
          healthScore: healthScore,
          summary: summary,
          analyzedInstructions: analyzedInstructions
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },       
    }).then((res) => res.json())     
      .then(setCreated(1))
      .catch((err) => {
        if (err.message === "Unexpected token 'T', \"THERE WAS \"... is not valid JSON") setCreated(0)
      });
    } else {
      setShowAlert(true)
      
    }
    
 };

  function validateTitle(value) {
    if(/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value) && value.length !== 0) {
      setError( error, error.title = 'Special characters not allowed in "Title" !');
    } else { setError(error, error.title = '') }
    setTitle(value);
  }

  function validateHealthScore(value) {
    if (value.toString().length === 0 ) setError( error, error.health.one = '', error.health.two = '');
    else {
      if (!/^\d+$/.test(value)) setError( error, error.health.one = 'Only numbers allowed in "Health Score" !', error.health.two = '');
      else {
        setError( error, error.health.one = '');
        if (value > 100 ) setError( error, error.health.two = '', error.health.two = 'Allowed numbers are between 0 and 100 !');
        else setError( error, error.health.two = '', error.health.two = '');        
      }
    }
    setHealthScore(value)
  }

  function validateSummary(value) {
    if(/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value) && value.length !== 0) {
      setError( error, error.summary = 'Special characters not allowed in "Summary" !');
    } else { setError( error, error.summary = '') }
    setSummary(value)
  }

  function validateAnalyzedInstructions(value) {
    if(/(!|¡|@|[?]|¡|<|>|[/]|[\\]|%|[[]|]|[|]|°|#|[$]|&|[()]|[)]|=|_|[*]|¿|[+]|~|{|}|`|\^)/.test(value) && value.length !== 0) {
      setError( error, error.instructions = 'Special characters not allowed in "Instructions" !');
    } else { setError( error, error.instructions = '') }
    setAnalyzedInstructions(value)
  }

  let [dietChoosen, setDietChoosen] = useState({
    name: "-- select an option --",
    hidden: false
  })

  function formHandler(event) {
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
 
  return !firstInstance ?
    (
      <div className="form-body">
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
            <div className="options-main-left">
              <div className="options-left">Title:</div>
              <div className="options-left">Health Score:</div>
              <div className="options-left">Summary:</div>
              <div className="options-left">Instructions:</div>
              <div className="options-left">Diets:</div>
            </div>
            <div className="options-main-right">           
              <input className='danger' id="checkerTitle" name="title" type="text" value={title} placeholder="e.g. Pasta.." onChange={(e) => validateTitle(e.target.value)  }/>
              <input className='danger' id="checkerHealth" name="healthScore" type="text" value={healthScore} placeholder="e.g. 73" onChange={(e) => validateHealthScore(e.target.value)  }/>
              <input className='danger' id="checkerSummary" name="summary" type="text" value={summary} placeholder="e.g. Healthy pasta recipe" onChange={(e) => validateSummary(e.target.value) }/>
              <input className='danger' id="checkerInstructions" name="analyzedInstructions" type="text" value={analyzedInstructions} placeholder="e.g. Cut pasta, fry tomatoes.." onChange={(e) => validateAnalyzedInstructions(e.target.value) }/>

              <select id="choose" className="choose" onChange={event => handleDietSelected(event.target.value) + handleSubmitButton() } onClick={event => formHandler(event.target.value)  } >
                <option id="-- select an option --" disabled={ dietChoosen.hidden ? true : false } >{dietChoosen.hidden && dietChoosen.name !== "-- select an option --" ?  "-- select an option --" : dietChoosen.name }</option>
                <option >{ dietChoosen.hidden ? "Gluten Free" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Ketogenic" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Vegan" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Lacto Ovo Vegetarian" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Pescatarian" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Paleolithic" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Primal" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Fodmap Friendly" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Whole 30" : "-- select an option --" }</option>
                <option >{ dietChoosen.hidden ? "Dairy Free" : "-- select an option --" }</option>
              </select >
            </div>
          </div>
          <div className="dietAlign">
            {uniqueNamesDiets[0]&&"Diets choosen: "}{uniqueNamesDiets.map(function(e) {
                              if ((uniqueNamesDiets.indexOf(e) !== uniqueNamesDiets.length - 1)) {
                                  return e + " + "
                              } else return e
                              })}
          </div>
          <input id="submmitButton" type="button" disabled={handleSubmitButton()} onClick={(event) => setFirstInstance(true) + handleSubmit(event)} value="CREATE !" />
          <input id="createNewButton" type="submit" onClick={() => handleNewRecipe() + createHandler() + setFirstInstance(false)} value="CREATE NEW RECIPE!" />  
          {[error.title , error.health.one, error.health.two ,  error.summary , error.instructions].map(e => (
            e?<span key={e} className="alert">{e}</span>:null
          ))}
        </form>
      </div>
    )
    : !showAlert ?
    (
      <div className="alertButtonBGSuccess">      
        <span>RECIPE CREATED SUCCESSFULLY !</span>
        <button className='alertButtonSuccess' id="success" onClick={() => setShowAlert(false) + setFirstInstance(false)}></button>
        <div className="hiddenSuccess">
          {
            setTimeout(() => {
              document.getElementById("success")&&document.getElementById("success").click()            
            }, 1500)
          }
        </div>
      </div>
    )    
    :
    (
      <div className="alertButtonBG">
        <span>Recipe was already created ! </span>
        <span>Please select 'CREATE NEW RECIPE!' to create a new one !</span>
        <button className='alertButton' onClick={() => setShowAlert(false) + setFirstInstance(false)}><b>GO BACK !</b></button>
      </div>
    )
}