import { combineReducers } from 'redux'
import noteReducer, * as fromNoteReducer from './noteReducer'

 export default combineReducers({
  note: noteReducer
});

export const getNoteById = (state, id) => {
  return fromNoteReducer.getNoteById(state, id);
}
