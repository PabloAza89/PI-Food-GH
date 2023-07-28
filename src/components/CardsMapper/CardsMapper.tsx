import * as s from  '../../styles/CardsMapperSX';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
import { setAllIndexes } from '../../actions';
import store from '../../store/store';
import { Box } from '@mui/material';

export default function Cards() {

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

  let arraySplitedBy9: any[] = []

  let numberIndexToDisplay = indexChoosen

  function firstFuncToCall() {
    for (let i = 0; i < toShow.length; i += 9) {
          let pedazo = toShow.slice(i, i + 9);
          arraySplitedBy9.push(pedazo);
    }
  }

  let arr0to2:any[] = []
  let arr3to5:any[] = []
  let arr6to8:any[] = []

  function secondFuncToCall () {
    arr0to2 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(0,3):[]
    arr3to5 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(3,6):[]
    arr6to8 = arraySplitedBy9[0]?arraySplitedBy9[numberIndexToDisplay].slice(6,9):[]
  }

  firstFuncToCall()
  secondFuncToCall()

  dispatch(setAllIndexes(arraySplitedBy9.length))

  //console.log("toShow", toShow)

  return toShow[0] !== undefined ?
  (
    <Box sx={s.background}>
      {arraySplitedBy9[0]!.map((e:any) => <Card
      key={e.id}
      id={e.id}
      title={e.title}
      /* summary={e.summary} */
      healthScore={e.healthScore}
      /* analyzedInstructions={e.analyzedInstructions} */
      diets={e.diets}
      image={e.image}
      dishTypes={e.dishTypes}
      /> )}
    </Box>
  )
  :
  (<Box sx={s.notFound} >No recipe was found !</Box>)

}