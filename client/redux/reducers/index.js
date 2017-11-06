import { combineReducers } from 'redux'
import noteReducer, * as fromNoteReducer from './noteReducer'

const rootReducer = combineReducers({
  note: noteReducer
});

export default rootReducer

export const getNoteById = (state, id) => {
  console.log(state, id)
  return fromNoteReducer.getNoteById(state, id);
}
