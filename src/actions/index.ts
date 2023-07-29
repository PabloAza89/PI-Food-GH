export function fetchRecipesFromAPI() {
  return {
    type: 'FETCH_RECIPES_FROM_API',
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