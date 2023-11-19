import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import css from './PaginateCSS.module.css';
import com from "../../commons/commonsCSS.module.css";
import { setIndexChoosen, setTabChoosen } from '../../actions';
import { Button } from '@mui/material/';
import $ from 'jquery';
import { recipesI, paginateAmountI, settingsFiltersI } from '../../interfaces/interfaces';
import Tooltip from '@mui/joy/Tooltip';

const Paginate = ({ paginateAmount }: paginateAmountI) => {

  const dispatch = useDispatch()

  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition )
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown )
  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow )
  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen )
  const tabChoosen = useSelector((state: { tabChoosen: number }) => state.tabChoosen )
  const settingsFilters = useSelector((state: { settingsFilters: settingsFiltersI }) => state.settingsFilters)

  let totalTabs = Math.ceil(toShow.length/9)
  let firstPartPortionTabs = paginateAmount === 45 ? (tabChoosen * 5) + 1 : (Math.floor(tabChoosen / 2) * 10) + 1
  let maxPortionTabs = paginateAmount === 45 ? (tabChoosen + 1) * 5 : (Math.floor(tabChoosen / 2) + 1) * 10

  let result: any = []

  for (let i = 0; i < toShow.length; i += paginateAmount) result.push(toShow.slice(i, i + paginateAmount))

  $(function() {
    result[0] && [...Array(Math.ceil(result[paginateAmount === 45 ? tabChoosen : Math.floor(tabChoosen / 2)].length/9))].forEach((e, i) => {
      let targetValue = $(`.Page${i}`).attr("value")
      if (tabChoosen % 2 !== 0 && paginateAmount !== 45) {
        if (indexChoosen + 5 === Number(targetValue)) $(`.Page${indexChoosen + 5}`).css("background", "rgba(46, 230, 163, 0.377)") // GREEN
        else $(`.Page${i}`).css("background", "rgba(230, 46, 175, 0.363)") // PINK
      } else {
        if (indexChoosen === Number(targetValue)) $(`.Page${indexChoosen}`).css("background", "rgba(46, 230, 163, 0.377)") // GREEN
        else $(`.Page${i}`).css("background", "rgba(230, 46, 175, 0.363)") // PINK
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
          menuShown && scrollPosition >= 209 && settingsFilters.showVisuals ? 'blur(40px)' :
          !menuShown && scrollPosition >= 109 && settingsFilters.showVisuals ? 'blur(40px)' :
          'blur(0px)',
        background:
          menuShown && scrollPosition >= 209 && !settingsFilters.showVisuals ?
          'rgba(88, 210, 214, 0.6)' :
          !menuShown && scrollPosition >= 109 && !settingsFilters.showVisuals ?
          'rgba(88, 210, 214, 0.6)' :
          'unset'
      }}
    >
      <div
        style={{ visibility: allRecipes[0] === undefined || toShow[0] === undefined ? 'hidden' : 'visible' }}
        className={css.buttonsAndHintContainer}
      >
        <Tooltip
          arrow
          variant="outlined"
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={0}
          enterTouchDelay={0}
          disableFocusListener={!settingsFilters.showTooltips}
          disableHoverListener={!settingsFilters.showTooltips}
          hidden={ settingsFilters.showTooltips ? false : true }
          title={ tabChoosen === 0 ? `This is the first.` : `Previous` }
          placement="bottom"
        >
          <div style={{ display: 'flex' }}> {/* HELPER FOR BUTTON-DISABLED-TOOLTIP */}
            <Button
              className={css.buttonButtonButton}
              id={css.eachButton}
              disabled={
                paginateAmount === 45 ?
                (tabChoosen === 0 ?
                true :
                false) :
                ((tabChoosen === 0 || tabChoosen === 1) ?
                  true :
                  false)
              }
              style={{ background:
                paginateAmount === 45 ?
                (tabChoosen === 0 ?
                'rgb(135, 135, 135)' :
                'rgb(61, 61, 245)') :
                ((tabChoosen === 0 || tabChoosen === 1) ?
                  'rgb(135, 135, 135)' :
                  'rgb(61, 61, 245)')

              }}
              onClick={(e) => {
                dispatch(setTabChoosen(
                  paginateAmount === 45 ?
                  tabChoosen - 1 :
                  tabChoosen % 2 !== 0 ?
                  tabChoosen - 1 :
                  tabChoosen - 2
                ));
                dispatch(setIndexChoosen(0));
              }}
            ><b>{`<`}</b></Button>
          </div>
        </Tooltip>
        {result[0] && [...Array(Math.ceil(result[
          paginateAmount === 45 ?
          tabChoosen :
          Math.floor(tabChoosen / 2)
        ].length/9))].map((e, i) => {
          return (
            <Button
              id={css.eachButton}
              className={`Page${i}`}
              key={i}
              value={i}
              onClick={(e) => {
                dispatch(setIndexChoosen(
                  Number((e.target as HTMLInputElement).value) >= 5 ?
                  Number((e.target as HTMLInputElement).value) - 5 :
                  Number((e.target as HTMLInputElement).value)
                ));
                dispatch(setTabChoosen(
                  paginateAmount === 45 ?
                  tabChoosen :
                  tabChoosen % 2 === 0 && Number((e.target as HTMLInputElement).value) >= 5 ?
                  tabChoosen + 1 :
                  tabChoosen % 2 === 0 && Number((e.target as HTMLInputElement).value) < 5 ?
                  tabChoosen :
                  tabChoosen !== 0 && Number((e.target as HTMLInputElement).value) < 5?
                  Math.floor(tabChoosen - 1):
                  tabChoosen
                ))
              }}
            >
              {
                paginateAmount === 45 ?
                (tabChoosen * 5) + ++i :
                tabChoosen % 2 === 0 && tabChoosen !== 0 ?
                ((tabChoosen / 2)* 10) + ++i :
                tabChoosen !== 0 ?
                ((Math.floor(tabChoosen / 2))  * 10) + ++i :
                ((tabChoosen)  * 10) + ++i
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
          disableFocusListener={!settingsFilters.showTooltips}
          disableHoverListener={!settingsFilters.showTooltips}
          hidden={ settingsFilters.showTooltips ? false : true }
          title={
            paginateAmount === 45 ?
            (result.length - 1 === tabChoosen ? `This is the last.` : `Next`) :
            (result.length - 1 === (tabChoosen / 2) ? `This is the last.` : `Next`)
          }
          placement="bottom"
        >
          <div style={{ display: 'flex' }}> {/* HELPER FOR BUTTON-DISABLED-TOOLTIP */}
            <Button
              id={css.eachButton}
              disabled={
                paginateAmount === 45 ?
                (result.length - 1 === tabChoosen ? true : false) :
                (result.length - 1 === (tabChoosen / 2) ? true : false)
              }
              style={{ background:
                paginateAmount === 45 ?
                (result.length - 1 === tabChoosen ?
                'rgb(135, 135, 135)' :
                'rgb(61, 61, 245)') :
                (result.length - 1 === (tabChoosen / 2) ?
                  'rgb(135, 135, 135)' :
                  'rgb(61, 61, 245)')
              }}
              onClick={(e) => {
                dispatch(setTabChoosen(
                  paginateAmount === 45 ?
                  tabChoosen + 1 :
                  tabChoosen % 2 !== 0 ?
                  tabChoosen + 1 :
                  tabChoosen + 2
                ));
                dispatch(setIndexChoosen(0));
              }}
            ><b>{`>`}</b></Button>
          </div>
        </Tooltip>
      </div>
      <div
        style={{ visibility: allRecipes[0] === undefined || toShow[0] === undefined ? 'hidden' : 'visible' }}
        id={`counter`}
        className={`${css.counter} ${com.noSelect}`}
      >
          { firstPartPortionTabs } - {/* FIRST PART */}
        { maxPortionTabs < totalTabs ? maxPortionTabs : totalTabs } of {/* MIDDLE PART */}
        {totalTabs} {/* LAST PART */}
      </div>
    </div>
  );
}

export default Paginate;