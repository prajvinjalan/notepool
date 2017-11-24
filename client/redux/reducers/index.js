import { combineReducers } from 'redux'
import noteReducer, * as fromNoteReducer from './noteReducer'
import userReducer from './userReducer'

// Combines all top-level reducers
export default combineReducers({
  note: noteReducer,
  user: userReducer
});

// Function to get a note by its id
export const getNoteById = (state, id) => {
  return fromNoteReducer.getNoteById(state, id);
}
