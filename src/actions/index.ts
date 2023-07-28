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

export function filterByText(payload: any) {
  return {
    type: 'FILTER_BY_TEXT',
    payload: payload
  }
};

export function sortByDiet(payload: any) {
  return {
    type: 'SORT_BY_DIET',
    payload: payload
  }
};

interface sortByDietAndTextI {
  diet: string,
  text: string
}

export function sortByDietAndText(payload: sortByDietAndTextI) {
  return {
    type: 'SORT_BY_DIET_AND_TEXT',
    payload: payload
  }
};

export function sortMoreHealthy() {
  return {
    type: 'SORT_MORE_HEALTHY',
  }
};

export function sortLessHealthy() {
  return {
    type: 'SORT_LESS_HEALTHY',
  }
};

export function sortAtoZ() {
  return {
    type: 'SORT_A_TO_Z',
  }
};

export function sortZtoA() {
  return {
    type: 'SORT_Z_TO_A',
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