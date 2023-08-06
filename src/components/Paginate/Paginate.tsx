import { useSelector , useDispatch } from 'react-redux';
import { setIndexChoosen } from '../../actions';
//import '../../styles/Paginate.css';
import * as s from '../../styles/PaginateSX';
import { Box, Button, TextField, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import $ from 'jquery';

const Paginate = () => {

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )
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

  $(function() {
    [...Array(Math.ceil(toShow.length/9))].forEach((e, i) => {
      let qq = $(`.Page${i}`).attr("value")
      if (indexChoosen === Number(qq)) {
        $(`.Page${indexChoosen}`)
          .css("background", "rgba(46, 230, 163, 0.377)")
      } else {
        $(`.Page${i}`)
          .css("background", "rgba(230, 46, 175, 0.363)")
      }
    })
  })

  return (
    <Box sx={s.background({ scrollWidth, scrollPosition, menuShown })}>
      {[...Array(Math.ceil(toShow.length/9))].map((e, i) => {
          return (
            <Button
              sx={s.eachButton}
              className={`Page${i}`}
              key={i}
              value={i}
              onClick={(e) => dispatch(setIndexChoosen(Number((e.target as HTMLInputElement).value)))}
            >{++i}</Button>
          )
      })}
    </Box>
  );
}

export default Paginate;
