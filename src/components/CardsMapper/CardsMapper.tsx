import * as s from  '../../styles/CardsMapperSX';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
import store from '../../store/store';
import { Box } from '@mui/material';
import $ from 'jquery';
import { useEffect } from 'react';

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
  // console.log("aVer", aVer)

  // arraySplitedBy9.map(e => e.media).flat().forEach(r => {
  //   $(`.extraPXImage${array.map(e => e.media).flat().indexOf(r)}`) // when hover image, extra pixels helper on right
  //   .on( "mouseenter", function(){
  //     $(`.extraPXSolid`)
  //       .css("transition", "all .2s ease-in-out")
  //       .width( minPort || minLand ? `calc((${array.map(e => e.media).flat().length} * 414px) + 3px)` : `calc((${array.map(e => e.media).flat().length} * 564px) + 3px)` )
  //     $(`.extraPXCenterStripe`)
  //       .css("transition", "all .2s ease-in-out")
  //       .width( minPort || minLand ? `calc((${array.map(e => e.media).flat().length} * 414px) + 3px)` : `calc((${array.map(e => e.media).flat().length} * 564px) + 3px)` )
  //   })
  //   .on( "mouseleave", function(){
  //     $(`.extraPXSolid`)
  //       .width( minPort || minLand ? `calc(${array.map(e => e.media).flat().length} * 414px)` : `calc(${array.map(e => e.media).flat().length} * 564px)` )
  //     $(`.extraPXCenterStripe`)
  //       .width( minPort || minLand ? `calc(${array.map(e => e.media).flat().length} * 414px)` : `calc(${array.map(e => e.media).flat().length} * 564px)` )
  //   })
  // })



  //console.log("test", arraySplitedBy9.map(e => e.media).flat().indexOf(e))
  //console.log("test", arraySplitedBy9.map(e => e))
  //console.log("test", arraySplitedBy9.map((e, index) => index))

  // arraySplitedBy9.map(e => e.id).forEach(r => {
  //   $(`.dietsCard${r}`)
  //   .on( "mouseenter", function(){
  //     $(`.dietsCard${r}`)
        
      
  //   })
  //   .on( "mouseleave", function(){
  //     $(`.extraPXSolid`)
        
      
  //   })
  // })
  

  //console.log("test", arraySplitedBy9.map((e) => e.id))

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