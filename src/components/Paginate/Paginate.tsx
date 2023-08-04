import { useSelector , useDispatch } from 'react-redux';
import { setIndexChoosen } from '../../actions';
//import '../../styles/Paginate.css';
import * as s from '../../styles/PaginateSX';
import { Box, Button, TextField, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';
import $ from 'jquery';

const Paginate = () => {

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

  console.log("toShow.length", toShow.length)
  console.log("how many buttons", Math.ceil(toShow.length/9))

  $(function() {
    [...Array(Math.ceil(toShow.length/9))].map((e, i) => {
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
    <Box /* className='paginate' */ sx={s.background}>
      {[...Array(Math.ceil(toShow.length/9))].map((e, i) => {
          return (
            <Button
              //sx={{ background: 'red' }}
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
