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

export function setShowMain(payload: any) {
  return {
    type: 'SET_SHOW_MAIN',
    payload: payload
  }
};

export function setAllIndexes(payload: any) {
  return {
    type: 'SET_ALL_INDEXES',
    payload: payload
  }
};

export function setIndexChoosen(payload: any) {
  return {
    type: 'SET_INDEX_CHOOSEN',
    payload: payload
  }
};

export function getIndexChoosen() {
  return {
    type: 'GET_INDEX_CHOOSEN'
  }
};

export function addNew(payload: any) {
  return {
    type: 'ADD_NEW',
    payload: payload
  }
};