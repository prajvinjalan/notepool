import { searchConstants } from '../constants'

// ACTION DISPATCHERS
// equivalent to " ... => { return (dispatch) => { ... }} "

// Sets the term that the user is searching for
export const setSearchTerm = (term) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(setSearchTermAction(term)));
  });
}

// Sets the term that the user is searching for (params are name, item, type)
export const addSearchFilter = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(addSearchFilterAction(params)));
  });
}

// Sets the term that the user is searching for (params is name)
export const removeSearchFilter = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(removeSearchFilterAction(params)));
  });
}

// ACTION CREATORS
// equivalent to " ... => { return { ... } } "

const setSearchTermAction = (term) => ({
  type: searchConstants.SET_SEARCH_TERM,
  payload: term
});

const addSearchFilterAction = (params) => ({
  type: searchConstants.ADD_SEARCH_FILTER,
  payload: params
});

const removeSearchFilterAction = (params) => ({
  type: searchConstants.REMOVE_SEARCH_FILTER,
  payload: params
});
