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
  let collaboratorArray = [];
  let searchTermArray = state.search.term.split(' ');
  let colourArray = [];
  let colourIncluded = true;
  let permissions = '';
  let permissionsArray = [];
  let permissionsIncluded = true;
  let typeArray = [];
  let typeIncluded = true;

  note.collaborators.forEach(collaborator => {
    if (collaborator.email === state.user.email){
      permissions = collaborator.type;
    }
    collaboratorArray.push(collaborator.email);
  });

  state.search.filters.forEach(filter => {
    if (filter.type === 'colour'){
      colourArray.push(filter.item);
    } else if (filter.type === 'permissions') {
      permissionsArray.push(filter.item);
    } else { // filter type 'type'
      typeArray.push(filter.item);
    }
  });

  if (colourArray.length !== 0){
    colourIncluded = colourArray.includes(note.colour);
  }

  if (permissionsArray.length !== 0){
    permissionsIncluded = permissionsArray.includes(permissions);
  }

  if (typeArray.length !== 0){
    typeIncluded = typeArray.includes(note.type);
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
    || (_.difference(searchTermArray, collaboratorArray).length === 0) // collaborators comparison
    || (listBodyText.includes(state.search.term))) // text comparison for each individual list item
    && (colourIncluded) // colour comparison
    && (permissionsIncluded) // permissions comparison
    && (typeIncluded) // type comparison
  )
});
