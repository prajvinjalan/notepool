import { combineReducers } from 'redux'
import noteReducer, * as fromNoteReducer from './noteReducer'
import userReducer from './userReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

// Combines all top-level reducers
export default combineReducers({
  note: noteReducer,
  user: userReducer,
  toastr: toastrReducer
});

// Function to get a note by its id
export const getNoteById = (state, id) => {
  return fromNoteReducer.getNoteById(state, id);
}

// Function to get notes by search term
export const getNotesByTerm = (state) => {
  return fromNoteReducer.getNotesByTerm(state.note);
}
