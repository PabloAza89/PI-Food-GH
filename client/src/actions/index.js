export function setShowMain(payload) {
  return {
    type: 'SET_SHOW_MAIN',
    payload
  }
};

export function setAllIndexes(payload) {
  return {
    type: 'SET_ALL_INDEXES',
    payload
  }
};

export function setIndexChoosen(payload) {
  return {
    type: 'SET_INDEX_CHOOSEN',
    payload
  }
};

export function getIndexChoosen() {
  return {
    type: 'GET_INDEX_CHOOSEN'
  }
};