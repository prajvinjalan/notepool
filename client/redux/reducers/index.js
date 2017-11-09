import { combineReducers } from 'redux'
import noteReducer, * as fromNoteReducer from './noteReducer'
import userReducer from './userReducer'

export default combineReducers({
  note: noteReducer,
  user: userReducer
});

export const getNoteById = (state, id) => {
  return fromNoteReducer.getNoteById(state, id);
}
