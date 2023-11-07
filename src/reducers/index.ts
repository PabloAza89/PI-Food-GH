import toAvoidKey from '../db/toAvoidKey.json';
import {
  recipesI, serverStatusI, navBarFiltersI, settingsFiltersI
} from '../interfaces/interfaces';

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
  landingHidden: boolean,
  showStatus: boolean,
  showUserRecipes: boolean,
  showOnlineRecipes: boolean,
  showOfflineRecipes: boolean,
  settingsFilters: settingsFiltersI,
  navBarFilters: navBarFiltersI
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
  menuShown: false,
  landingHidden: false,
  showStatus: localStorage.getItem('showStatus') !== null ? JSON.parse(localStorage.getItem('showStatus')!) : true,
  showUserRecipes: localStorage.getItem('showUserRecipes') !== null ? JSON.parse(localStorage.getItem('showUserRecipes')!) : true,
  showOnlineRecipes: localStorage.getItem('showOnlineRecipes') !== null ? JSON.parse(localStorage.getItem('showOnlineRecipes')!) : true,
  showOfflineRecipes: localStorage.getItem('showOfflineRecipes') !== null ? JSON.parse(localStorage.getItem('showOfflineRecipes')!) : true,
  settingsFilters: {
    showStatus: localStorage.getItem('showStatus') !== null ? JSON.parse(localStorage.getItem('showStatus')!) : true,
    showUserRecipes: localStorage.getItem('showUserRecipes') !== null ? JSON.parse(localStorage.getItem('showUserRecipes')!) : true,
    showOnlineRecipes: localStorage.getItem('showOnlineRecipes') !== null ? JSON.parse(localStorage.getItem('showOnlineRecipes')!) : true,
    showOfflineRecipes: localStorage.getItem('showOfflineRecipes') !== null ? JSON.parse(localStorage.getItem('showOfflineRecipes')!) : true,
  },
  navBarFilters: {
    text: '',
    diet: 'All Diets', dish: 'All Dishes',
    sortHealth: '', sortAlpha: ''
  }
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
    // case 'FILTER':
    //   const copyArrayDiet = [...state.allRecipes]
    //   let arrayToShow: recipesI[] = []
    //   if (action.payload.diet === "All Diets") arrayToShow = copyArrayDiet // ALL DIETS INCLUDED
    //   if (action.payload.diet !== "All Diets") arrayToShow = copyArrayDiet.filter((e:any) => e.diets.includes(action.payload.diet)) // FILTER TARGET DIET
    //   if (action.payload.dish === "All Dishes") arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(action.payload.text.toLowerCase())) // ALL DIETS INCLUDED THEN TEXT FILTER
    //   if (action.payload.dish !== "All Dishes") {
    //     arrayToShow = arrayToShow.filter((e:any) => e.dishTypes.includes(action.payload.dish.toLowerCase())) // FILTER TARGET DISH
    //     arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(action.payload.text.toLowerCase())) // THEN TEXT FILTER
    //   }
    //   switch (action.payload.alphaOrHealthy) {
    //     case 'More Healthy':
    //       arrayToShow = arrayToShow.sort((a,b) => b.healthScore - a.healthScore);
    //       break;
    //     case 'Less Healthy':
    //       arrayToShow = arrayToShow.sort((a,b) => a.healthScore - b.healthScore);
    //       break;
    //     case 'A-Z':
    //       arrayToShow = arrayToShow.sort((a, b) => a.title.localeCompare(b.title))
    //       break;
    //     case 'Z-A':
    //       arrayToShow = arrayToShow.sort((a, b) => b.title.localeCompare(a.title))
    //       break;
    //   }
    //   return {
    //     ...state,
    //     toShow: arrayToShow
    //   };
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
    case 'SET_SHOW_STATUS':
      return {
        ...state,
        showStatus: action.payload
      };
    case 'SET_SHOW_USER_RECIPES':
      //const copyToShow = [...state.allRecipes]
      //let arrayToShowUserRecipes: recipesI[] = []
      //arrayToShowUserRecipes = copyToShow.filter(e => e.userRecipe !== !action.payload)
      return {
        ...state,
        //toShow: arrayToShowUserRecipes,
        showUserRecipes: action.payload
      };
    case 'SET_SHOW_ONLINE_RECIPES':
      return {
        ...state,
        showOnlineRecipes: action.payload
      };
    case 'SET_SHOW_OFFLINE_RECIPES':
      return {
        ...state,
        showOfflineRecipes: action.payload
      };
    case 'APPLY_FILTERS':

    
      const copyserverStatusApply: serverStatusI = {...state.serverStatus}
      const copyNavBarFiltersApply: navBarFiltersI = {...state.navBarFilters}
      const copysettingsFiltersApply: settingsFiltersI = {...state.settingsFilters}
      const copyAllRecipesApply: recipesI[] = [...state.allRecipes]
      let arrayToShowApply: recipesI[] = []

      //arrayToShowUserRecipes = copyToShow.filter(e => e.userRecipe !== copyNavBarFiltersApply.showUserRecipes)

      if (copysettingsFiltersApply.showUserRecipes) arrayToShowApply = copyAllRecipesApply
      if (!copysettingsFiltersApply.showUserRecipes) arrayToShowApply = copyAllRecipesApply.filter(e => e.userRecipe !== true)

      //if (copysettingsFiltersApply.showOnlineRecipes) arrayToShowApply = arrayToShowApply.filter(e => e.userRecipe === true)
      if (copyserverStatusApply.validKey && !copysettingsFiltersApply.showOnlineRecipes) arrayToShowApply = arrayToShowApply.filter(e => e.userRecipe === true)

      if (!copyserverStatusApply.validKey && !copysettingsFiltersApply.showOfflineRecipes) arrayToShowApply = arrayToShowApply.filter(e => e.userRecipe === true)

      


      //if (copyNavBarFiltersApply.diet === "All Diets") arrayToShowApply = copyAllRecipesApply // ALL DIETS INCLUDED
      //if (copyNavBarFiltersApply.diet !== "All Diets") arrayToShowApply = copyAllRecipesApply.filter((e:any) => e.diets.includes(copyNavBarFiltersApply.diet)) // FILTER TARGET DIET

      //if (copyNavBarFiltersApply.diet === "All Diets") arrayToShowApply = arrayToShowApply // ALL DIETS INCLUDED
      if (copyNavBarFiltersApply.diet !== "All Diets") arrayToShowApply = arrayToShowApply.filter((e:any) => e.diets.includes(copyNavBarFiltersApply.diet)) // FILTER TARGET DIET



      if (copyNavBarFiltersApply.dish === "All Dishes") arrayToShowApply = arrayToShowApply.filter((e:any) => e.title.toLowerCase().includes(copyNavBarFiltersApply.text.toLowerCase())) // ALL DIETS INCLUDED THEN TEXT FILTER
      if (copyNavBarFiltersApply.dish !== "All Dishes")
        arrayToShowApply = arrayToShowApply.filter((e:any) => e.dishTypes.includes(copyNavBarFiltersApply.dish.toLowerCase())) // FILTER TARGET DISH
        arrayToShowApply = arrayToShowApply.filter((e:any) => e.title.toLowerCase().includes(copyNavBarFiltersApply.text.toLowerCase())) // THEN TEXT FILTER

      if (copyNavBarFiltersApply.sortHealth === 'More Healthy')
        arrayToShowApply = arrayToShowApply.sort((a,b) => b.healthScore - a.healthScore);
      if (copyNavBarFiltersApply.sortHealth === 'Less Healthy')
        arrayToShowApply = arrayToShowApply.sort((a,b) => a.healthScore - b.healthScore);
      if (copyNavBarFiltersApply.sortAlpha === 'A-Z')
        arrayToShowApply = arrayToShowApply.sort((a, b) => a.title.localeCompare(b.title))
      if (copyNavBarFiltersApply.sortAlpha === 'Z-A')
        arrayToShowApply = arrayToShowApply.sort((a, b) => b.title.localeCompare(a.title))


      //copyNavBarFilters[`${action.payload.type}`] = action.payload.value
      return {
        ...state,
        //navBarFilters: copyNavBarFiltersApply,
        toShow: arrayToShowApply
      };

    case 'SET_NAVBAR_FILTERS':
      const copyNavBarFilters: navBarFiltersI = {...state.navBarFilters}
      //const copyAllRecipes: recipesI[] = [...state.allRecipes]
      //let arrayToShow: recipesI[] = []
      if (action.payload.type === 'text') {
        copyNavBarFilters.text = action.payload.value
        //arrayToShowww = copyArrayDiettt
      }
      if (action.payload.type === 'diet') {
        copyNavBarFilters.diet = action.payload.value
        //arrayToShowww = copyArrayDiettt
      }
      if (action.payload.type === 'dish') {
        copyNavBarFilters.dish = action.payload.value

      }
      if (action.payload.type === 'sortHealth') {
        copyNavBarFilters.sortHealth = action.payload.value
        copyNavBarFilters.sortAlpha = ''
      }
      if (action.payload.type === 'sortAlpha') {
        copyNavBarFilters.sortAlpha = action.payload.value
        copyNavBarFilters.sortHealth = ''
      }

      // if (copyNavBarFilters.diet === "All Diets") arrayToShow = copyAllRecipes // ALL DIETS INCLUDED
      // if (copyNavBarFilters.diet !== "All Diets") arrayToShow = copyAllRecipes.filter((e:any) => e.diets.includes(copyNavBarFilters.diet)) // FILTER TARGET DIET
      // if (copyNavBarFilters.dish === "All Dishes") arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(copyNavBarFilters.text.toLowerCase())) // ALL DIETS INCLUDED THEN TEXT FILTER
      // if (copyNavBarFilters.dish !== "All Dishes")
      //   arrayToShow = arrayToShow.filter((e:any) => e.dishTypes.includes(copyNavBarFilters.dish.toLowerCase())) // FILTER TARGET DISH
      //   arrayToShow = arrayToShow.filter((e:any) => e.title.toLowerCase().includes(copyNavBarFilters.text.toLowerCase())) // THEN TEXT FILTER

      // if (copyNavBarFilters.sortHealth === 'More Healthy')
      //   arrayToShow = arrayToShow.sort((a,b) => b.healthScore - a.healthScore);
      // if (copyNavBarFilters.sortHealth === 'Less Healthy')
      //   arrayToShow = arrayToShow.sort((a,b) => a.healthScore - b.healthScore);
      // if (copyNavBarFilters.sortAlpha === 'A-Z')
      //   arrayToShow = arrayToShow.sort((a, b) => a.title.localeCompare(b.title))
      // if (copyNavBarFilters.sortAlpha === 'Z-A')
      //   arrayToShow = arrayToShow.sort((a, b) => b.title.localeCompare(a.title))


      //copyNavBarFilters[`${action.payload.type}`] = action.payload.value
      return {
        ...state,
        navBarFilters: copyNavBarFilters,
        //toShow: arrayToShow
      };
    case 'SET_SETTINGS_FILTERS':
      const copySettingsFilters: settingsFiltersI = {...state.settingsFilters}
      copySettingsFilters[action.payload.type as keyof settingsFiltersI] = action.payload.value
      return {
        ...state,
        settingsFilters: copySettingsFilters
      };
    default:
      return state
  }
};

export default reducer;

