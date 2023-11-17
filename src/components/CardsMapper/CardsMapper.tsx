import { useEffect, Dispatch, SetStateAction } from "react";
import css from './CardsMapperCSS.module.css';
import com from "../../commons/commonsCSS.module.css";
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import {
  recipesI, userDataI, paginateAmountI, settingsFiltersI
} from '../../interfaces/interfaces';
import {
  getRecipesFromDB, getDietsFromDB,
  getDishesFromDB, applyFilters, setSettingsFilters
} from '../../actions';
import $ from 'jquery';

interface CardsMapperI {
  setUserData: Dispatch<SetStateAction<userDataI>>
  userData: userDataI,
}

interface CardsMapperI extends paginateAmountI {}

const CardsMapper = ({ setUserData, paginateAmount, userData }: CardsMapperI)  => {

  const dispatch = useDispatch()

  document.addEventListener('scroll', () => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
  });

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen)
  const tabChoosen = useSelector((state: { tabChoosen: number }) => state.tabChoosen )
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)
  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)
  const settingsFilters = useSelector((state: { settingsFilters: settingsFiltersI }) => state.settingsFilters)

  let result: any = []

  if (toShow[0]) {
    for (let i = 0; i < toShow.length; i += paginateAmount) {
      result.push(toShow.slice(i, i + paginateAmount))
    }
  }

  let arraySplitedBy9: any[] = result[0] && result[
    paginateAmount === 45 ?
    tabChoosen :
    Math.floor(tabChoosen / 2)
  ].slice(
    paginateAmount === 45 ?
    indexChoosen * 9 :
    tabChoosen % 2 !== 0 ?
    (indexChoosen + 5) * 9 :
    indexChoosen * 9,
    paginateAmount === 45 ?
    (indexChoosen * 9) + 9 :
    tabChoosen % 2 !== 0 ?
    ((indexChoosen + 5) * 9) + 9 :
    (indexChoosen * 9) + 9,
  )

  useEffect(() => { // fetch all recipes
    console.log("EJECUTADO EJECUTADO EJECUTADO")
    Promise.all([
      dispatch(getDietsFromDB()),
      dispatch(getDishesFromDB()),
      dispatch(getRecipesFromDB())
    ]).then(() => dispatch(applyFilters()))

  },[dispatch])

  useEffect(() => {
    if (paginateAmount === 45 && localStorage.getItem('showVisuals') === null) {
      $(`[class*="backgroundCard"]`)
        .css('backdrop-filter', 'unset')
        .css('box-shadow', 'unset')
        .css('background', 'rgba(196, 34, 147, 0.2)')
      $(`[class*="Page"]`)
        .css('box-shadow', 'unset')
    } else if (paginateAmount === 90 && localStorage.getItem('showVisuals') === null) {
      $(`[class*="backgroundCard"]`)
        .css('backdrop-filter', 'blur(20px)')
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
        .css('background', 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))')
      $(`[class*="Page"]`)
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
    } else if (settingsFilters.showVisuals) {
      $(`[class*="backgroundCard"]`)
        .css('backdrop-filter', 'blur(20px)')
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
        .css('background', 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))')
      $(`[class*="Page"]`)
        .css('box-shadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)')
    } else {
      $(`[class*="backgroundCard"]`)
        .css('backdrop-filter', 'unset')
        .css('box-shadow', 'unset')
        .css('background', 'rgba(196, 34, 147, 0.2)')
      $(`[class*="Page"]`)
        .css('box-shadow', 'unset')
    }
  })

  useEffect(() => {
    if (paginateAmount === 45 && localStorage.getItem('showVisuals') === null) {
      console.log("dispatched 1")
      dispatch(setSettingsFilters({ type: `showVisuals`, value: false }))
      //dispatch(setSettingsFilters({ type: `showBadWords`, value: false }))
    } else if (paginateAmount === 90 && localStorage.getItem('showVisuals') === null) {
      console.log("dispatched 2")
      dispatch(setSettingsFilters({ type: `showVisuals`, value: true }))
      //dispatch(setSettingsFilters({ type: `showBadWords`, value: true }))
    }
  },[paginateAmount, dispatch])

  return allRecipes[0] !== undefined && toShow[0] !== undefined ?
    (<div className={css.background}>
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
          setUserData={setUserData}
          summary={e.summary}
          analyzedInstructions={e.analyzedInstructions}
        />
      )}
    </div>) :
    allRecipes[0] !== undefined && toShow[0] === undefined ?
    (<div>
      <div className={`${css.notFoundOrLoading} ${com.noSelect}`}>No recipe was found !</div>
    </div>) :
    (<div>
      <div className={`${css.notFoundOrLoading} ${com.noSelect}`}>Loading..</div>
    </div>)
}

export default CardsMapper;