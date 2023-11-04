import toAvoidKey from '../db/toAvoidKey.json';
import { recipesI, serverStatusI } from '../interfaces/interfaces';

interface initialStateI {
  serverStatus: serverStatusI,
  serverStatusShown: boolean,
  allRecipes: recipesI[],
  toShow: recipesI[],
  allDiets: any[],
  allDishes: any[],
  allDietsOnline: boolean,
  allDishesOnline: boolean,
  indexChoosen: number,
  tabChoosen: number,
  width: number,
  height: number,
  scrollPosition: number,
  menuShown: boolean,
  landingHidden: boolean
}

const initialState: initialStateI = {
  serverStatus: { online: true, validKey: true, try: 1 },
  serverStatusShown: false,
  allRecipes: [],
  toShow: [],
  allDiets: [],
  allDishes: [],
  allDietsOnline: true,
  allDishesOnline: true,
  indexChoosen: 0,
  tabChoosen: 0,
  width: window.screen.width,
  height: window.screen.height,
  scrollPosition: 0,
  menuShown: false, // false // DEV
  landingHidden: false
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      const copyServerStatus = {...state.serverStatus}
      copyServerStatus.online = action.payload.ok || action.payload.ok === false ? true : false
      copyServerStatus.validKey = action.payload.ok ? true : false
      copyServerStatus.try = action.payload.ok || action.payload.ok === false ? action.payload.try : 1
      let targetArray:any = []

      if (action.payload.ok === true) targetArray = action.payload.message
      else if (action.payload.ok === false) targetArray = action.payload.message.concat(toAvoidKey)
      else targetArray = toAvoidKey

      let parsedArr: recipesI[] = []
      targetArray && targetArray.map((e:any) => parsedArr.push(
        {
          id: e.id,
          title: e.title,
          summary: e.summary,
          healthScore: e.healthScore,
          analyzedInstructions:
               e.analyzedInstructions[0] ?
               e.analyzedInstructions.map((e:any)=> e) :
               [],
          image: e.image,
          diets: e.diets.map(function(e:any) {
            if ((e.indexOf(e) !== e.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
          }),
          email: e.email,
          dishTypes: e.dishTypes,
          userRecipe: e.userRecipe
        }
      ))
      return {
        ...state,
        allRecipes: parsedArr,
        toShow: parsedArr,
        serverStatus: copyServerStatus
      };
    case 'GET_DIETS':
      if (action.payload === "error") {
        return {
          ...state,
          allDietsOnline: false
        };
      } else return {
        ...state,
        allDiets: action.payload
      };
    case 'GET_DISHES':
      if (action.payload === "error") {
        return {
          ...state,
          allDishesOnline: false
        };
      } else return {
        ...state,
        allDishes: action.payload
      };
    case 'FILTER':
      const copyArrayDiet = [...state.allRecipes]
      let arrayToShow: recipesI[] = []
      if (action.payload.diet === "All Diets") arrayToShow = copyArrayDiet // ALL DIETS INCLUDED
      if (action.payload.diet !== "All Diets") arrayToShow = copyArrayDiet.filter((e:any) => e.diets.includes(action.payload.diet)) // FILTER TARGET DIET
      if (action.payload.dish === "All Dishes") arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(action.payload.text.toLowerCase())) // ALL DIETS INCLUDED THEN TEXT FILTER
      if (action.payload.dish !== "All Dishes") {
        arrayToShow = arrayToShow.filter((e:any) => e.dishTypes.includes(action.payload.dish.toLowerCase())) // FILTER TARGET DISH
        arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(action.payload.text.toLowerCase())) // THEN TEXT FILTER
      }
      switch (action.payload.alphaOrHealthy) {
        case 'More Healthy':
          arrayToShow = arrayToShow.sort((a,b) => b.healthScore - a.healthScore);
          break;
        case 'Less Healthy':
          arrayToShow = arrayToShow.sort((a,b) => a.healthScore - b.healthScore);
          break;
        case 'A-Z':
          arrayToShow = arrayToShow.sort((a, b) => a.title.localeCompare(b.title))
          break;
        case 'Z-A':
          arrayToShow = arrayToShow.sort((a, b) => b.title.localeCompare(a.title))
          break;
      }
      return {
        ...state,
        toShow: arrayToShow
      };
    case 'SET_INDEX_CHOOSEN':
      return {
        ...state,
        indexChoosen: action.payload
      };
    case 'GET_INDEX_CHOOSEN':
      return {
        ...state,
        response: state.indexChoosen
      };
    case 'SET_TAB_CHOOSEN':
      return {
        ...state,
        tabChoosen: action.payload
      };
    case 'SET_WIDTH':
      return {
        ...state,
        width: action.payload
      };
    case 'SET_HEIGHT':
      return {
        ...state,
        height: action.payload
      };
    case 'SET_SCROLL_POSITION':
      return {
        ...state,
        scrollPosition: action.payload
      };
    case 'SET_MENU_SHOWN':
      return {
        ...state,
        menuShown: action.payload
      };
    case 'LANDING_HIDDEN':
      return {
        ...state,
        landingHidden: action.payload
      };
    case 'SET_SERVER_STATUS_SHOWN':
      return {
        ...state,
        serverStatusShown: action.payload
      };
    default:
      return state
  }
};

export default reducer;

