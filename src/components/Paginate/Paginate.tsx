import React from "react";
import { useSelector , useDispatch } from 'react-redux';
import { setIndexChoosen } from '../../actions';
import '../../styles/Paginate.css';
import { Box, Button, TextField, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import $ from 'jquery';

const Paginate = () => {

  //const allIndexes = useSelector( (state: {allIndexes: number} ) => state.allIndexes )

  //const allRecipesLoaded = useSelector((state: {allRecipesLoaded: boolean}) => state.allRecipesLoaded)


  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )

  const dispatch = useDispatch()

  interface recipesI {
    id: any,
    title: any,
    diets: any,
    healthScore: any,
    summary: any,
    analyzedInstructions: any,
    image: any,
    dishTypes: any,
  }

  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)

  // function AllIndexesButtons() {
  //   let www = allIndexes
  //   let maxNumber = www
  //   let helper = 1
  //   let arrayOfButtons = []
  //   do {
  //     arrayOfButtons.push( helper )
  //     helper++
  //   } while (helper <= maxNumber)
  //   return arrayOfButtons
  // }

  // function colorChanger (value:any) {
  //   document?.getElementById(value)?.style.background='rgba(46, 230, 163, 0.377)'  // CHOOSEN BY USER
  //   AllIndexesButtons().map(e => e - 1).filter(e => e !== value).forEach(e => document.getElementById(e).style.background='rgba(230, 46, 175, 0.363)') // ALL EXCEPT CHOOSEN BY USER
  // }

  console.log("toShow.length", toShow.length)
  console.log("how many buttons", Math.ceil(toShow.length/9))

  $(function() {
    [...Array(Math.ceil(toShow.length/9))].map((e, i) => {
      let qq = $(`.Page${i}`).attr("value")
      if (indexChoosen === Number(qq)) {
        $(`.Page${indexChoosen}`)
          .css("background", "green")
      } else {
        $(`.Page${i}`)
          .css("background", "red")
      }
      
    })
    
  
  })

  return (
    <Box className='paginate' >
      {/* { AllIndexesButtons().map(e => (
             <button className="asd" key={e - 1}  onClick={() =>  dispatch(setIndexChoosen(e - 1)) }  >{e}</button>
      ))} */}

    {[...Array(Math.ceil(toShow.length/9))].map((e, i) => {
        return (
          <Button
            sx={{ background: 'red' }}
            className={`Page${i}`}
            key={i}
            value={i}
            onClick={(e) => dispatch(setIndexChoosen(Number((e.target as HTMLInputElement).value)))}
            /* onClick={(e) => console.log((e.target as HTMLInputElement).value)} */
          >{++i}</Button>
        )
      })}


    </Box>
  );
}

export default Paginate;
