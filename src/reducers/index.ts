import toAvoidKey from '../db/toAvoidKey.json';

interface recipesI {
  id: any,
  title: any,
  diets: any,
  healthScore: any,
  summary: any,
  analyzedInstructions: any,
  image: any,
  dishTypes: any,
}

interface initialStateI {
  allRecipes: recipesI[],
  toShow: recipesI[],
  allDiets: any[],
  allRecipesLoaded: boolean,
  showMain: boolean,
  indexChoosen: number,
  allIndexes: number,
  addNew: recipesI[],
  width: number,
  height: number,
  minPort: boolean,
  minLand: boolean,
  medPort: boolean,
  medLand: boolean,
  larPort: boolean,
  larLand: boolean,
  currentWidth: number,
  percentageResizedHeight: number,
  scrollWidth: number,
  hasScroll: boolean,
  scrollPosition: number,
  menuShown: boolean,
}

const initialState: initialStateI = {
  allRecipes: [],
  toShow: [],
  allDiets: [],
  allRecipesLoaded: false,
  showMain: false,
  indexChoosen: 0,
  allIndexes: 0,
  addNew: [],
  width: window.screen.width,
  height: window.screen.height,
  minPort: window.screen.width < 425 && window.matchMedia("(orientation: portrait)").matches ? true : false,
  minLand: window.screen.height < 425 && !window.matchMedia("(orientation: portrait)").matches ? true : false,
  medPort: window.screen.width >= 425 && window.screen.width <= 825 && window.matchMedia("(orientation: portrait)").matches ? true : false,
  medLand: window.screen.height >= 425 && window.screen.height <= 825 && !window.matchMedia("(orientation: portrait)").matches ? true : false,
  larPort: window.screen.width > 825 && window.matchMedia("(orientation: portrait)").matches ? true : false,
  larLand: window.screen.height > 825 && !window.matchMedia("(orientation: portrait)").matches ? true : false,
  currentWidth: window.innerWidth,
  percentageResizedHeight: window.innerHeight / window.screen.height,
  scrollWidth: 0,
  hasScroll: false,
  scrollPosition: 0,
  menuShown: false,
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'FETCH_RECIPES_FROM_API':
      let parsedArr: recipesI[] = []
      toAvoidKey.results.map(e => parsedArr.push(
        {
          id: e.id,
          title: e.title,
          summary: e.summary,
          healthScore: e.healthScore,
          analyzedInstructions:
              e.analyzedInstructions[0] ? e.analyzedInstructions[0].steps.map(e=> e.step) : [],
          image: e.image,
          diets: e.diets.map(function(e) {
            if ((e.indexOf(e) !== e.length - 1)) return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
            else return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
          }),
          dishTypes: e.dishTypes
        }
      ))
      return {
        ...state,
        allRecipes: parsedArr,
        toShow: parsedArr
      };

    case 'ALL_RECIPES_LOADED':
      return {
        ...state,
        allRecipesLoaded: action.payload
      };

    case 'GET_DIETS_FROM_DB':
      // fetch(`http://localhost:3001/diets`, {
      //   .then((res) => res.json() )
      //   .then( data => {
      //     console.log(data);     

      return {
        ...state,
        //allDiets: ["a","b","c"]
        //allDiets: [state.allDiets, [...resArray]]
        //allDiets: resArray
        allDiets: action.payload
      };


    case 'FILTER':
      const copyArrayDiet = [...state.allRecipes]
      let arrayToShow: recipesI[] = []
      if (action.payload.diet === "All Diets") {
        arrayToShow = copyArrayDiet // DIETS FILTER
        arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(action.payload.text.toLowerCase())) // THEN TEXT FILTER
      } else {
        arrayToShow = copyArrayDiet.filter((e:any) => e.diets.includes(action.payload.diet)) // DIETS FILTER
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
    case 'MIN_PORT':
      return {
        ...state,
        minPort: action.payload
      };
    case 'MIN_LAND':
      return {
        ...state,
        minLand: action.payload
      };
    case 'MED_PORT':
      return {
        ...state,
        medPort: action.payload
      };
    case 'MED_LAND':
      return {
        ...state,
        medLand: action.payload
      };
    case 'LAR_PORT':
      return {
        ...state,
        larPort: action.payload
      };
    case 'LAR_LAND':
      return {
        ...state,
        larLand: action.payload
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
    default:
      return state
  }
};

export default reducer;

