import { useSelector , useDispatch } from 'react-redux';
import css from './PaginateCSS.module.css';
import { setIndexChoosen, setTabChoosen } from '../../actions';
import { Button } from '@mui/material/';
import $ from 'jquery';
import { recipesI } from '../../interfaces/interfaces';
import Tooltip from '@mui/joy/Tooltip';

const Paginate = () => {

  const dispatch = useDispatch()

  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)
  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth )
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition )
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown )
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow )
  const tabChoosen = useSelector((state: { tabChoosen: number }) => state.tabChoosen )

  let result: any = []

  const chunkSize = 90; // 90 === 9 * 10 === 10 TABS OF 9
  for (let i = 0; i < toShow.length; i += chunkSize) {
    result.push(toShow.slice(i, i + chunkSize))
  }

  $(function() {
    result[0] && [...Array(Math.ceil(result[tabChoosen].length/9))].forEach((e, i) => {
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
        visibility: (allRecipes[0] === undefined || toShow[0] === undefined) ? 'hidden' : 'visible',
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
      <Tooltip
        arrow
        variant="outlined"
        enterDelay={700}
        enterNextDelay={700}
        leaveDelay={200}
        enterTouchDelay={0}
        title={ tabChoosen === 0 ? `This is the first.` : `Previous` }
        placement="bottom"
      >
        <div> {/* HELPER FOR BUTTON-DISABLED-TOOLTIP */}
          <Button
            id={css.eachButton}
            disabled={ tabChoosen === 0 ? true : false }
            style={{ background: tabChoosen === 0 ? 'rgb(135, 135, 135)' : 'rgb(61, 61, 245)' }}
            onClick={(e) => {
              dispatch(setTabChoosen( tabChoosen - 1 ));
              dispatch(setIndexChoosen(0));
            }}
          ><b>{`<`}</b></Button>
        </div>
      </Tooltip>
      {result[0] && [...Array(Math.ceil(result[tabChoosen].length/9))].map((e, i) => {
        return (
          <Button
            id={css.eachButton}
            className={`Page${i}`}
            key={i}
            value={i}
            onClick={(e) => dispatch(setIndexChoosen(Number((e.target as HTMLInputElement).value)))}
          >{tabChoosen ? tabChoosen : null}{++i}</Button>
        )
      })}
      <Tooltip
        arrow
        variant="outlined"
        enterDelay={700}
        enterNextDelay={700}
        leaveDelay={200}
        enterTouchDelay={0}
        title={ result.length - 1 === tabChoosen ? `This is the last.` : `Next` }
        placement="bottom"
      >
        <div> {/* HELPER FOR BUTTON-DISABLED-TOOLTIP */}
          <Button
            id={css.eachButton}
            disabled={ result.length - 1 === tabChoosen ? true : false }
            style={{ background: result.length - 1 === tabChoosen ? 'rgb(135, 135, 135)' : 'rgb(61, 61, 245)' }}
            onClick={(e) => {
              dispatch(setTabChoosen( tabChoosen + 1 ));
              dispatch(setIndexChoosen(0));
            }}
          ><b>{`>`}</b></Button>
        </div>
      </Tooltip>
    </div>
  );
}

export default Paginate;
