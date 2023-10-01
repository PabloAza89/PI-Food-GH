import { useState, useEffect } from "react";
import './CardsMapperCSS.css';
import * as s from  './CardsMapperSX';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { recipesI, userDataI, retrieveLoginI  } from '../../interfaces/interfaces';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB,
  getDishesFromDB, setHasScroll
} from '../../actions';
import $ from 'jquery';

interface CardsMapperI extends userDataI, retrieveLoginI {}

const CardsMapper = ({ retrieveLogin, userData }: CardsMapperI)  => {

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

  FirstFunc().then(() => {
    dispatch(allRecipesLoaded(true))
    //dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
    //dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
  })

  return toShow[0] !== undefined ?
  (
    <Box sx={s.backgroundSX({ scrollWidth, scrollPosition, menuShown })} className={`backgroundCSS`} >
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
    <Box className={`notFoundCSS`} >No recipe was found !</Box>
  </Box>)

}

export default CardsMapper;