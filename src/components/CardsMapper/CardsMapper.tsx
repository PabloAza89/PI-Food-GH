import { useEffect, Dispatch, SetStateAction } from "react";
import css from './CardsMapperCSS.module.css';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { recipesI, userDataI, paginateAmountI  } from '../../interfaces/interfaces';
import {
  fetchRecipesFromAPI, allRecipesLoaded,
  getDietsFromDB, getDishesFromDB
} from '../../actions';

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

  let result: any = []

  for (let i = 0; i < toShow.length; i += paginateAmount) {
    result.push(toShow.slice(i, i + paginateAmount))
  }

  let arraySplitedBy9: any[] = result[0] && result[tabChoosen].slice( indexChoosen * 9, (indexChoosen * 9) + 9 )

  const FirstFunc = async () => {
    useEffect(() => {
      dispatch(getDietsFromDB())
      dispatch(getDishesFromDB())
      dispatch(fetchRecipesFromAPI())
    },[])
  }

  FirstFunc().then(() => dispatch(allRecipesLoaded(true)))

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
      <div className={css.notFoundOrLoading}>No recipe was found !</div>
    </div>) :
    (<div>
      <div className={css.notFoundOrLoading}>Loading..</div>
    </div>)
}

export default CardsMapper;