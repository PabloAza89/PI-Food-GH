import React from "react";
import '../styles/Cards.css';
import Card from './Card.jsx';
import { useSelector , useDispatch } from 'react-redux';
import { setAllIndexes } from '../actions';

export default function Cards({ toShow }) {

  const indexChoosen = useSelector( state => state.indexChoosen )

  const dispatch = useDispatch()  

  let arraySplitedBy9 = []
  
  let numberIndexToDisplay = indexChoosen  

  function firstFuncToCall() {
    for (let i = 0; i < toShow.length; i += 9) {
          let pedazo = toShow.slice(i, i + 9);
          arraySplitedBy9.push(pedazo);
    }
  }

  let arr0to2
  let arr3to5
  let arr6to8  

  function secondFuncToCall () {
    arr0to2 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(0,3):[]
    arr3to5 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(3,6):[]
    arr6to8 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(6,9):[]
  }

  firstFuncToCall()
  secondFuncToCall()

  dispatch(setAllIndexes(arraySplitedBy9.length))
  
  return toShow[0] !== undefined ?
  (
    <div>
      <div className='cards'>              
       {arr0to2.map(e => <Card
        key={e.id}
        id={e.id}
        title={e.title}
        summary={e.summary}
        healthScore={e.healthScore}
        analyzedInstructions={e.analyzedInstructions}
        diets={e.diets}
        image={e.image} 
        dishTypes={e.dishTypes}
        /> )} 
      </div>
      <div className='cards'>
        {arr3to5.map(e => <Card
          key={e.id}
          id={e.id}
          title={e.title}
          summary={e.summary}
          healthScore={e.healthScore}
          analyzedInstructions={e.analyzedInstructions}
          diets={e.diets}
          image={e.image} 
          dishTypes={e.dishTypes}
          /> )}
      </div>
      <div className='cards'>
        {arr6to8.map(e => <Card
          key={e.id}
          id={e.id}
          title={e.title}
          summary={e.summary}
          healthScore={e.healthScore}
          analyzedInstructions={e.analyzedInstructions}
          diets={e.diets}
          image={e.image}
          dishTypes={e.dishTypes}
          /> )} 
      </div>
    </div>
  )
  :
  (<div className="notFound">No recipe was found !</div>) 

}