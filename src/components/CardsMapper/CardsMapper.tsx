import { useState, useEffect } from "react";
import css from './CardsMapperCSS.module.css';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { recipesI, userDataI, retrieveLoginI  } from '../../interfaces/interfaces';
import {
  fetchRecipesFromAPI, allRecipesLoaded, getDietsFromDB,
  getDishesFromDB, setHasScroll
} from '../../actions';
import $ from 'jquery';

interface CardsMapperI extends userDataI, retrieveLoginI {}

const CardsMapper = ({ retrieveLogin, userData }: CardsMapperI)  => {

  const dispatch = useDispatch()

  const indexChoosen = useSelector((state: {indexChoosen: number}) => state.indexChoosen)
  const tabChoosen = useSelector((state: { tabChoosen: number }) => state.tabChoosen )
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown)
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)
  const allRecipes = useSelector((state: { allRecipes: recipesI[] }) => state.allRecipes)

  let result: any = []

  const chunkSize = 90; // 90 === 9 * 10 === 10 TABS OF 9
  for (let i = 0; i < toShow.length; i += chunkSize) {
    result.push(toShow.slice(i, i + chunkSize))
  }

  let arraySplitedBy9: any[] = result[0] && result[tabChoosen].slice( indexChoosen * 9, (indexChoosen * 9) + 9 )

  const FirstFunc = async () => {
    useEffect(() => {
      dispatch(getDietsFromDB())
      dispatch(getDishesFromDB())
      dispatch(fetchRecipesFromAPI())
    },[])
  }

  FirstFunc().then(() => {
    dispatch(allRecipesLoaded(true))
    dispatch(setHasScroll(window.innerWidth !== $('body').width() ? true : false))
  })

  return allRecipes[0] !== undefined && toShow[0] !== undefined ?
    (<div
      className={css.background}
      style={{
        //width: `calc(100vw - ${scrollWidth}px)`,
        //marginRight: `${scrollWidth}px`,
        marginTop:
          menuShown && scrollPosition >= 209 ? '46px' :
          !menuShown && scrollPosition >= 109 ? '46px' :
          '0px'
      }}
    >
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
          retrieveLogin={retrieveLogin}
          summary={e.summary}
          analyzedInstructions={e.analyzedInstructions}
        />
      )}
    </div>) :
    allRecipes[0] !== undefined && toShow[0] === undefined ?
    (<div>
      <div className={css.notFound}>No recipe was found !</div>
    </div>) :
    (<div>
      <div className={css.notFound}>Loading..</div>
    </div>)
}

export default CardsMapper;