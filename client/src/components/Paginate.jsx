import React from "react";
import { useSelector , useDispatch } from 'react-redux';
import {setIndexChoosen } from '../actions';
import '../styles/Paginate.css';

function Paginate() {

  const allIndexes = useSelector( state => state.allIndexes ) 

  const dispatch = useDispatch()

  function AllIndexesButtons() {
    let www = allIndexes
    let maxNumber = www
    let helper = 1
    let arrayOfButtons = []
    do {
      arrayOfButtons.push( helper )
      helper++      
    } while (helper <= maxNumber)
    return arrayOfButtons
  }  

  function colorChanger (value) {     
    document.getElementById(value).style.background='rgba(46, 230, 163, 0.377)'  // CHOOSEN BY USER
    AllIndexesButtons().map(e => e - 1).filter(e => e !== value).forEach(e => document.getElementById(e).style.background='rgba(230, 46, 175, 0.363)') // ALL EXCEPT CHOOSEN BY USER  
  }
  
  return (
    <div className='paginate' >        
      { 
        AllIndexesButtons().map(e => (
          <button className="asd" id={e - 1} key={e - 1}  onClick={() =>  dispatch(setIndexChoosen(e - 1)) + colorChanger(e - 1) }  >{e}</button>
        ))
      } 
    </div>
  );
}

export default Paginate;
