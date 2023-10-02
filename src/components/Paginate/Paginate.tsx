import { useSelector , useDispatch } from 'react-redux';
import css from './PaginateCSS.module.css';
import comm from '../../styles/commons.module.css';
import { setIndexChoosen } from '../../actions';
import { Box, Button } from '@mui/material/';
import $ from 'jquery';
import { recipesI } from '../../interfaces/interfaces';

const Paginate = () => {

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown)

  const dispatch = useDispatch()

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
    <div
      className={css.background}
      style={{
        backdropFilter:
          menuShown && scrollPosition >= 209 ? 'blur(40px)' :
          !menuShown && scrollPosition >= 109 ? 'blur(40px)' :
          'blur(0px)',
        position:
          menuShown && scrollPosition >= 209 ? 'fixed' :
          !menuShown && scrollPosition >= 109 ? 'fixed' :
          'relative',
        marginTop:
          menuShown && scrollPosition >= 209 ? '0px' :
          !menuShown && scrollPosition >= 109 ? '0px' :
          '9px',
        width: `calc(100vw - ${scrollWidth}px)`
      }}
    >
      {[...Array(Math.ceil(toShow.length/9))].map((e, i) => {
          return (
            <Button
              id={css.eachButton}
              className={`Page${i}`}
              key={i}
              value={i}
              onClick={(e) => dispatch(setIndexChoosen(Number((e.target as HTMLInputElement).value)))}
            >{++i}</Button>
          )
      })}
    </div>
  );
}

export default Paginate;
