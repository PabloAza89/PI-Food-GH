// export function fetchRecipesFromAPI() {
//   return {
//     type: 'FETCH_RECIPES_FROM_API',
//   }
// };

export function fetchRecipesFromAPI() {
  return async function(dispatch: any) {
    return (
      fetch("http://localhost:3001/recipes")
      .then(resp => resp.json())
      .then(data => dispatch({type: 'FETCH_RECIPES', payload: data}))
      .catch(error => dispatch({type: 'FETCH_RECIPES', payload: "error"}))
    )
  }
};

export function getDietsFromDB() {
  return async function(dispatch: any) {
    return (
      fetch("http://localhost:3001/diets")
      .then(resp => resp.json())
      .then(data => dispatch({type: 'GET_DIETS', payload: data}))
      .catch(error => dispatch({type: 'GET_DIETS', payload: "error"}))
    )
  }
};

export function allRecipesLoaded(payload: any) {
  return {
    type: 'ALL_RECIPES_LOADED',
    payload: payload
  }
};

interface filterI {
  diet: string,
  text: string,
  alphaOrHealthy: string,
}

export function filter(payload: filterI) {
  return {
    type: 'FILTER',
    payload: payload
  }
};

export function setShowMain(payload: any) {
  return {
    type: 'SET_SHOW_MAIN',
    payload: payload
  }
};

export function setIndexChoosen(payload: any) {
  return {
    type: 'SET_INDEX_CHOOSEN',
    payload: payload
  }
};

export function addNew(payload: any) {
  return {
    type: 'ADD_NEW',
    payload: payload
  }
};

export function setWidth(setWidth:number) {
  return {
    type: 'SET_WIDTH',
    payload: setWidth
  }
};

export function setHeight(setHeight:number) {
  return {
    type: 'SET_HEIGHT',
    payload: setHeight
  }
};

export function setMinPort(setMinPort:boolean) {
  return {
    type: 'MIN_PORT',
    payload: setMinPort
  }
};

export function setMinLand(setMinLand:boolean) {
  return {
    type: 'MIN_LAND',
    payload: setMinLand
  }
};

export function setMedPort(setMedPort:boolean) {
  return {
    type: 'MED_PORT',
    payload: setMedPort
  }
};

export function setMedLand(setMedLand:boolean) {
  return {
    type: 'MED_LAND',
    payload: setMedLand
  }
};

export function setLarPort(setLarPort:boolean) {
  return {
    type: 'LAR_PORT',
    payload: setLarPort
  }
};

export function setLarLand(setLarLand:boolean) {
  return {
    type: 'LAR_LAND',
    payload: setLarLand
  }
};

export function setCurrentWidth(setCurrentWidth:number) {
  return {
    type: 'CURRENT_WIDTH',
    payload: setCurrentWidth
  }
};

export function setPercentageResizedHeight(setPercentageResizedHeight:number) {
  return {
    type: 'PERCENTAGE_RESIZED_HEIGHT',
    payload: setPercentageResizedHeight
  }
};

export function setScrollWidth(setScrollWidth:number) {
  return {
    type: 'SET_SCROLL_WIDTH',
    payload: setScrollWidth
  }
};

export function setHasScroll(setHasScroll:boolean) {
  return {
    type: 'SET_HAS_SCROLL',
    payload: setHasScroll
  }
};


export function setScrollPosition(setScrollPosition:number) {
  return {
    type: 'SET_SCROLL_POSITION',
    payload: setScrollPosition
  }
};

export function setMenuShown(setMenuShown:boolean) {
  return {
    type: 'SET_MENU_SHOWN',
    payload: setMenuShown
  }
};