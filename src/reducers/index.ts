import toAvoidKey from '../db/toAvoidKey.json';
import { recipesI, serverStatusI } from '../interfaces/interfaces';

interface initialStateI {
  serverStatus: serverStatusI,
  allRecipes: recipesI[],
  toShow: recipesI[],
  allDiets: any[],
  allDishes: any[],
  allDietsOnline: boolean,
  allDishesOnline: boolean,
  allRecipesLoaded: boolean,
  showMain: boolean,
  indexChoosen: number,
  allIndexes: number,
  tabChoosen: number,
  addNew: recipesI[],
  width: number,
  height: number,
  viewPort: string,
  currentWidth: number,
  percentageResizedHeight: number,
  scrollWidth: number,
  hasScroll: boolean,
  scrollPosition: number,
  menuShown: boolean,
  landingHidden: boolean
}

const initialState: initialStateI = {
  serverStatus: { online: true, validKey: true, try: 1 },
  allRecipes: [],
  toShow: [],
  allDiets: [],
  allDishes: [],
  allDietsOnline: true,
  allDishesOnline: true,
  allRecipesLoaded: false,
  showMain: false,
  indexChoosen: 0,
  allIndexes: 0,
  tabChoosen: 0,
  addNew: [],
  width: window.screen.width,
  height: window.screen.height,
  viewPort: `larLand`,
  currentWidth: window.innerWidth,
  percentageResizedHeight: window.innerHeight / window.screen.height,
  scrollWidth: 0,
  hasScroll: false,
  scrollPosition: 0,
  menuShown: false,
  landingHidden: false
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      console.log("action.payload", action.payload)
      const copyServerStatus = {...state.serverStatus}
      copyServerStatus.online = action.payload.ok || action.payload.ok === false ? true : false
      copyServerStatus.validKey = action.payload.ok ? true : false
      copyServerStatus.try = action.payload.ok || action.payload.ok === false ? action.payload.try : 1
      let targetArray:any = []

      if (action.payload.ok === true) targetArray = action.payload.message//.slice(0,5)
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
    case 'ALL_RECIPES_LOADED':
      return {
        ...state,
        allRecipesLoaded: action.payload
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
    case 'SET_SHOW_MAIN':
      return {
        ...state,
        showMain: action.payload
      };
    case 'SET_ALL_INDEXES':
      return {
        ...state,
        allIndexes: action.payload
      };
    case 'GET_ALL_INDEXES':
      return {
        ...state,
        response: state.allIndexes
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
    case 'ADD_NEW':
      return {
        ...state,
        addNew: [...state.addNew, action.payload]
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
    case 'VIEW_PORT':
      return {
        ...state,
        viewPort: action.payload
      };
    case 'CURRENT_WIDTH':
      return {
        ...state,
        currentWidth: action.payload
      };
    case 'PERCENTAGE_RESIZED_HEIGHT':
      return {
        ...state,
        percentageResizedHeight: action.payload
      };
    case 'SET_SCROLL_WIDTH':
      return {
        ...state,
        scrollWidth: action.payload
      };
    case 'SET_HAS_SCROLL':
      return {
        ...state,
        hasScroll: action.payload
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
    default:
      return state
  }
};

export default reducer;

