import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import css from './PaginateCSS.module.css';
import { setIndexChoosen, setTabChoosen } from '../../actions';
import { Button } from '@mui/material/';
import $ from 'jquery';
import { recipesI, paginateAmountI } from '../../interfaces/interfaces';
import Tooltip from '@mui/joy/Tooltip';

const Paginate = ({ paginateAmount }: paginateAmountI) => {

  const dispatch = useDispatch()

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition )
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown )
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow )
  const tabChoosen = useSelector((state: { tabChoosen: number }) => state.tabChoosen )

  let result: any = []

  for (let i = 0; i < toShow.length; i += paginateAmount) result.push(toShow.slice(i, i + paginateAmount))

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

  useEffect(() => {
    let counter = document.getElementById('counter')
    counter && document.documentElement.style.setProperty('--paginateMargin', `${counter.getBoundingClientRect().width}px`);
  })

  return (
    <div
      className={css.background}
      style={{
        backdropFilter:
          menuShown && scrollPosition >= 209 ? 'blur(40px)' :
          !menuShown && scrollPosition >= 109 ? 'blur(40px)' :
          'blur(0px)'
      }}
    >
      <div className={css.buttonsAndHintContainer}>
        <Tooltip
          arrow
          variant="outlined"
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={0}
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
            >
              {
                paginateAmount === 45 ?
                ((5 * tabChoosen) + ++i) :
                tabChoosen ? tabChoosen : null
              }
              {
                paginateAmount === 90 ?
                ++i :
                null
              }
            </Button>
          )
        })}
        <Tooltip
          arrow
          variant="outlined"
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={0}
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
      <div id={`counter`} className={css.counter}>
          {tabChoosen ? tabChoosen : null}{1} - {tabChoosen ? tabChoosen : null}{result[0] && Math.ceil(result[tabChoosen].length/9) } of {Math.ceil(toShow.length/9)}
      </div>
    </div>
  );
}

export default Paginate;