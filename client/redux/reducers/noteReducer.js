import { combineReducers } from 'redux'

import constants from '../constants'

const notes = (state = [], action) => {
  switch (action.type){
    case constants.RECEIVE_NOTES:
      return action.payload;

    case constants.ADD_NOTE:
      return [...state, action.payload];

    case constants.UPDATE_NOTE:
      return state.map(note => {
        if(note.id === action.payload.id){
          return action.payload;
        }
        return note;
      });

    case constants.DELETE_NOTE:
      return state.filter(note => note.id !== action.payload);

    case constants.ADD_COLLABORATOR:
      return state.map(note => {
        if(note.id === action.payload.id){
          let alreadyAdded = false;
          let selectedNote = {...note};
          for(let i = 0; i < note.collaborators.length; i++){
            if(note.collaborators[i] === action.payload.email){
              alreadyAdded = true;
            }
          }
          if(!alreadyAdded){
            selectedNote.collaborators.push(action.payload.email);
          }
          return selectedNote;
        }
        return note;
      });

    case constants.REMOVE_COLLABORATOR:
      return state.map(note => {
        if(note.id === action.payload.id){
          let selectedNote = {...note};
          for(let i = 0; i < selectedNote.collaborators.length; i++){
            if(selectedNote.collaborators[i] === action.payload.email){
              selectedNote.collaborators.splice(i, 1);
            }
          }
          return selectedNote;
        }
        return note;
      });

    default:
      return state;
  }
}

const notesById = (state = {}, action) => {
  let nextState = {};

  switch (action.type){
    case constants.RECEIVE_NOTES:
      nextState = {...state};
      action.payload.forEach(note => {
        nextState[note.id] = note;
      });
      return nextState;

    case constants.ADD_NOTE:
    case constants.UPDATE_NOTE:
    case constants.UPDATE_COLLABORATORS:
      return {...state, [action.payload.id]: action.payload};

    case constants.DELETE_NOTE:
      nextState = {...state};
      delete nextState[action.payload];
      return nextState;

    default:
      return state;
  }
}

export default combineReducers({
  notes,
  notesById
});

export const getNoteById = (state, id) => state.notesById[id];
