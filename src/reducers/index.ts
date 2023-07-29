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
  allRecipesLoaded: boolean,
  showMain: boolean,
  indexChoosen: number,
  allIndexes: number,
  addNew: recipesI[]
}

const initialState: initialStateI = {
  allRecipes: [],
  toShow: [],
  allRecipesLoaded: false,
  showMain: false,
  indexChoosen: 0,
  allIndexes: 0,
  addNew: []
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
    default:
      return state
  }
};

export default reducer;

