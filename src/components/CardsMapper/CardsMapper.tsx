import * as s from  '../../styles/CardsMapperSX';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
import { setAllIndexes } from '../../actions';
import store from '../../store/store';
import { Box } from '@mui/material';

const CardsMapper = ()  => {

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

  //const toShow = useSelector((state: {allRecipes: recipesI[]}) => state.allRecipes )
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)
  //const toShow = store.getState().allRecipes

  let arraySplitedBy9: any[] = toShow.slice( indexChoosen * 9, (indexChoosen * 9) + 9 )

  //arraySplitedBy9.slice(0,9)

  //console.log("toShow test", toShow.slice(0,9))

  //let numberIndexToDisplay = indexChoosen

 /*  function firstFuncToCall() {
    for (let i = 0; i < toShow.length; i += 9) {
          let pedazo = toShow.slice(i, i + 9);
          arraySplitedBy9.push(pedazo);
    }
  }

  let arr0to2:any[] = []
  let arr3to5:any[] = []
  let arr6to8:any[] = [] */
/* 
  function secondFuncToCall () {
    arr0to2 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(0,3):[]
    arr3to5 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(3,6):[]
    arr6to8 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(6,9):[]
  } */

  /* firstFuncToCall()
  secondFuncToCall() */

  dispatch(setAllIndexes(arraySplitedBy9.length))

  //console.log("toShow", toShow)
  //console.log("toShow.length", toShow.length)

  //console.log("arraySplitedBy9", arraySplitedBy9)
  //console.log("toShow test", toShow.slice(0,9))

  

  console.log("indexChoosen", indexChoosen)
  return toShow[0] !== undefined ?
  (
    <Box sx={s.background}>
      {arraySplitedBy9.map((e:any) => <Card
      key={e.id}
      id={e.id}
      title={e.title}
      healthScore={e.healthScore}
      diets={e.diets}
      image={e.image}
      dishTypes={e.dishTypes}
      /> )}
    </Box>
  )
  :
  (<Box sx={s.notFound} >No recipe was found !</Box>)

}

export default CardsMapper;