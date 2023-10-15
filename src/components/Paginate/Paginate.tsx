import { useSelector , useDispatch } from 'react-redux';
import css from './PaginateCSS.module.css';
import { setIndexChoosen, setTabChoosen } from '../../actions';
import { Button } from '@mui/material/';
import $ from 'jquery';
import { recipesI } from '../../interfaces/interfaces';

const Paginate = () => {

  const dispatch = useDispatch()

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth )
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition )
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown )
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow )
  const tabChoosen = useSelector((state: { tabChoosen: number }) => state.tabChoosen )

  

  

  //const toShow2 = (toShow.length / 90)

  //let qq = [1,2,3,4,5,6,7,8,9,10,11]
  let result: any = []

  const chunkSize = 90; // 90 === 9 * 10 === 10 TABS OF 9
  for (let i = 0; i < toShow.length; i += chunkSize) {
    result.push(toShow.slice(i, i + chunkSize))
  }

  console.log("RESULT", result)
  console.log("RESULT tabChoosen", tabChoosen)


  $(function() {
    [...Array(Math.ceil(result.length/9))].forEach((e, i) => {
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
      {/* {[`<`,...Array(Math.ceil(toShow.length/9)),`>`].map((e, i) => { */}
      <Button
        id={css.eachButton}
        //className={`Page${i}`}
        disabled={ tabChoosen === 0 ? true : false }
        style={{ background: tabChoosen === 0 ? 'gray' : 'blue' }}
        //key={i}
        //value={i}
        //onClick={(e) => dispatch(setIndexChoosen(Number((e.target as HTMLInputElement).value)))}
        onClick={(e) => dispatch(setTabChoosen( tabChoosen - 1 ))}
      ><b>{`<`}</b></Button>
      {result[0] && [...Array(Math.ceil(result[tabChoosen].length/9))].map((e, i) => {
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
      <Button
        id={css.eachButton}
        //disabled={true}
        disabled={ result.length - 1 === tabChoosen ? true : false }
        style={{ background: result.length - 1 === tabChoosen ? 'gray' : 'blue' }}
        //className={`Page${i}`}
        //key={i}
        //value={i}
        //onClick={(e) => dispatch(setIndexChoosen(Number((e.target as HTMLInputElement).value)))}
        onClick={(e) => dispatch(setTabChoosen( tabChoosen + 1 ))}
      ><b>{`>`}</b></Button>
    </div>
  );
}

export default Paginate;
