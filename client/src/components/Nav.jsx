import React, { useState } from "react";
import '../styles/Nav.css';
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useDispatch } from 'react-redux';
import { setIndexChoosen } from '../actions';

export default function Cards({diets , handleTitleMatchChange , handleDietNameChange, handleHealthLevelChange, handleSortNameChange}) {

  const dispatch = useDispatch()

  let [healthSelected, setHealthSelected] = useState("")
  let [aZSelected, setAZSelected] = useState("")  

  const [foodSearch, setFoodSearch] = useState("");

  function disablerHealthy(event) {
    if ( event === "Sort by Healthy") {
      setAZSelected(false)  
      setHealthSelected(true)    
    }
  }

  function disablerAZ(event) {
    if ( event === "Sort alphabetically") {
      setHealthSelected(false)    
      setAZSelected(true)    
    }
  }

  function defaultPaginateColor () {
    return document.getElementById(0).style.background='rgba(46, 230, 163, 0.377)'
  }

  return (    
   <div className='main-nav-div'>
      <div className="main-left">
        <Link className="iconImage" to="/">
          <img  className="iconImage" src={logo} alt=""></img>
        </Link>
      </div>
      <Link id="iconText" to="/">
        <h2>Foodify !</h2>
      </Link>
      <div className="main-right">
        <div className="right-upper">
          <form className="search" onSubmit={(event) => {event.preventDefault(); handleTitleMatchChange(foodSearch) }}>
            <input className="findAdd"
                type="text"        
                placeholder="Find recipe..."
                value={foodSearch} 
                onChange={(event) => setFoodSearch(event.target.value) + dispatch(setIndexChoosen(0)) }
                
            />
            <input className="findAdd"
              type="submit" value="SEARCH !"
            />
          </form>
          <Link to="/create"> <button className="button">CREATE RECIPE !</button> </Link>
          <Link to="/about"> <button className="button">ABOUT !</button> </Link>
        </div>
        <div className="right-lower">
          <select  onChange={(event) => handleDietNameChange(event.target.value) + dispatch(setIndexChoosen(0)) + defaultPaginateColor()  } >          
            {diets.map(e =>(
              <option id={e.id} key={e.id}>{e.title}</option>
            ))}
          </select >
          <select  onChange={event => handleHealthLevelChange(event.target.value) } onClick={event => disablerHealthy(event.target.value) } >
            <option id="-- select an option --" disabled={ healthSelected ? true : false }  >Sort by Healthy</option>
            <option id="More Healthy" >{aZSelected ? "Sort by Healthy" : "More Healthy"}</option>
            <option id="Less Healthy" >{aZSelected ? "Sort by Healthy" : "Less Healthy"}</option>                  
          </select >
          <select onChange={event => handleSortNameChange(event.target.value) } onClick={event => disablerAZ(event.target.value)} >
            <option id="-- select an option --" disabled={ aZSelected ? true : false } >Sort alphabetically</option>
            <option id="A-Z" >{healthSelected ? "Sort alphabetically" : "A-Z"}</option>
            <option id="Z-A" >{healthSelected ? "Sort alphabetically" : "Z-A"}</option>
          </select >
        </div>          
      </div>        
    </div>    
  );
  
}
