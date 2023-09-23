import { useState, useEffect } from "react";
import * as s from  '../../styles/CardsMapperSX';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { recipesI } from '../../interfaces/interfaces';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB, getDishesFromDB
} from '../../actions';

const CardsMapper = ({ retrieveLogin, userData }: any)  => {

  const dispatch = useDispatch()

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen)
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown)
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)

  let arraySplitedBy9: any[] = toShow.slice( indexChoosen * 9, (indexChoosen * 9) + 9 )

  const FirstFunc = async () => {
    useEffect(() => {
      dispatch(getDietsFromDB())
      dispatch(getDishesFromDB())
      dispatch(fetchRecipesFromAPI())
    },[])
  }

  FirstFunc().then(() => dispatch(allRecipesLoaded(true)))

  console.log("in CARDS MAPPER", userData)

  return toShow[0] !== undefined ?
  (
    <Box sx={s.background({ scrollWidth, scrollPosition, menuShown })}>
      {arraySplitedBy9.map((e:any) =>
        <Card
          key={e.id}
          id={e.id}
          title={e.title}
          healthScore={e.healthScore}
          diets={e.diets}
          image={e.image}
          dishTypes={e.dishTypes}
          userRecipe={e.userRecipe}
          email={e.email}
          userData={userData}
          retrieveLogin={retrieveLogin}
          summary={e.summary}
          analyzedInstructions={e.analyzedInstructions}
        />
      )}
    </Box>
  )
  :
  (<Box>
    <Box sx={s.notFound} >No recipe was found !</Box>
  </Box>)

}

export default CardsMapper;