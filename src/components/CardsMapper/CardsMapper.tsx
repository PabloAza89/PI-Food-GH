import { useState, useEffect } from "react";
import css from './CardsMapperCSS.module.css';
import Card from '../Card/Card';
import { useSelector , useDispatch } from 'react-redux';
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
  const scrollWidth = useSelector((state: {scrollWidth: number}) => state.scrollWidth)
  const scrollPosition = useSelector((state: {scrollPosition: number}) => state.scrollPosition)
  const menuShown = useSelector((state: {menuShown: boolean}) => state.menuShown)
  const toShow = useSelector((state: { toShow: recipesI[] }) => state.toShow)

  let arraySplitedBy9: any[] = toShow.slice( indexChoosen * 9, (indexChoosen * 9) + 9 )

  const FirstFunc = async () => {
    useEffect(() => {
      dispatch(getDietsFromDB())
      dispatch(getDishesFromDB())
      dispatch(fetchRecipesFromAPI())
    },[])
  }

  FirstFunc().then(() => dispatch(allRecipesLoaded(true)))

  return toShow[0] !== undefined ?
    (<div
      className={css.background}
      style={{
        width: `calc(100vw - ${scrollWidth}px)`,
        marginRight: `${scrollWidth}px`,
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
    (<div>
      <div className={css.notFound} >No recipe was found !</div>
    </div>)
}

export default CardsMapper;