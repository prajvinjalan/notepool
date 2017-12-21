import { searchConstants } from '../constants'

const initialState = {
  term: '',
  filters: []
}

// Search/Filter reducer
const search = (state = initialState, action) => {
  let newFilterList = [];
  let addedFilter = false;

  switch (action.type){
    case searchConstants.RECEIVE_NOTES:
      return initialState;

    case searchConstants.SET_SEARCH_TERM:
      return {...state, term: action.payload};

    case searchConstants.ADD_SEARCH_FILTER:
      state.filters.forEach(filter => {
        if (filter.name === action.payload.name){
          addedFilter = true;
        }
      });
      if (!addedFilter){
        newFilterList = state.filters.concat(action.payload);
        return {...state, filters: newFilterList};
      }
      return state;

    case searchConstants.REMOVE_SEARCH_FILTER:
      newFilterList = state.filters.filter(filter => filter.name !== action.payload);
      return {...state, filters: newFilterList};

    default:
      return state;
  }
}

export default search
