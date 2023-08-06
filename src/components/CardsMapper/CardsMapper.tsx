import * as s from  '../../styles/CardsMapperSX';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
import store from '../../store/store';
import { Box } from '@mui/material';
import $ from 'jquery';
import { useEffect } from 'react';
import { setCurrentWidth } from '../../actions';

const CardsMapper = ()  => {

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen)
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown)

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

  let arraySplitedBy9: any[] = toShow.slice( indexChoosen * 9, (indexChoosen * 9) + 9 )

  //console.log("indexChoosen", indexChoosen)
  //console.log("itoShow", toShow)

  //$(document).height()

  //const aVer :number = $(document).width()! - $(window).width()!

  // console.log("$(document).width()", $(document).width())
  // console.log("$(document).innerwidth()", $(document).innerWidth())
  // console.log("$(window).width()", $(window).width())
  // console.log("$(window).innerwidth()", $(window).innerWidth())
  //console.log("aVer", aVer)

  

  return toShow[0] !== undefined ?
  (
    
      <Box sx={s.backgroundd({ scrollWidth, scrollPosition, menuShown })}>
        {arraySplitedBy9.map((e:any) =>
          <Card
            key={e.id}
            id={e.id}
            title={e.title}
            healthScore={e.healthScore}
            diets={e.diets}
            image={e.image}
            dishTypes={e.dishTypes}
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