const initialState = {
  showMain: false,
  indexChoosen: 0,
  allIndexes: 0,
  addNew: []
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOW_MAIN':      
      return {
        ...state,
        showMain: action.payload
      }
    case 'SET_ALL_INDEXES':
      return {
        ...state,
        allIndexes: action.payload
      }
    case 'GET_ALL_INDEXES':
      return {
        ...state,
        response: state.allIndexes
      }
    case 'SET_INDEX_CHOOSEN':
      return {
        ...state,
        indexChoosen: action.payload
      }
    case 'GET_INDEX_CHOOSEN': 
      return {
        ...state,
        response: state.indexChoosen
      } 
    case 'ADD_NEW': 
      return {
        ...state,
        addNew: [...state.addNew, action.payload]
      } 
    default:
      return state
  }
};

export default reducer;

