import { combineReducers } from 'redux'
import noteReducer, * as fromNoteReducer from './noteReducer'
import userReducer from './userReducer'
import searchReducer from './searchReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

import _ from 'lodash'

// Combines all top-level reducers
export default combineReducers({
  note: noteReducer,
  user: userReducer,
  search: searchReducer,
  toastr: toastrReducer
});

// Function to get a note by its id
export const getNoteById = (state, id) => {
  return fromNoteReducer.getNoteById(state, id);
}

// Function to get notes by search term/filters
export const getNotesBySearch = (state) => state.note.notes.filter(note => {
  let bodyText = note.body.replace(/\n/g, ' ');
  let listBodyArray = [];
  let listBodyText = '';
  let searchTermArray = state.search.term.split(' ');
  let colourArray = [];
  let colourIncluded = true;

  state.search.filters.forEach(filter => {
    if (filter.type === 'colour'){
      colourArray.push(filter.item);
    }
  });

  if (colourArray.length !== 0){
    colourIncluded = colourArray.includes(note.colour);
  }

  note.listBody.forEach(item => {
    listBodyArray.push(item.text);
    listBodyText = listBodyText.concat(item.text + ' ');
  });
  listBodyText = listBodyText.slice(0, (listBodyText.length - 1));

  return(
    ((note.title.includes(state.search.term)) // title comparison
    || (bodyText.includes(state.search.term)) // body comparison
    || (_.difference(searchTermArray, listBodyArray).length === 0) // list item comparison (when multiple search words)
    || (listBodyText.includes(state.search.term))) // text comparison for each individual list item
    && (colourIncluded) // colour comparison
  )
});
