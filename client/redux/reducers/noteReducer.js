import { combineReducers } from 'redux'

import { noteConstants } from '../constants'
import { userConstants } from '../constants'

// Notes reducer that contains all of a user's notes
const notes = (state = [], action) => {
  switch (action.type) {
    case noteConstants.RECEIVE_NOTES:
      return action.payload;

    case noteConstants.ADD_NOTE:
      return [...state, action.payload];

    case noteConstants.UPDATE_NOTE:
      return state.map(note => {
        if (note.id === action.payload.id){
          return action.payload;
        }
        return note;
      });

    case noteConstants.DELETE_NOTE:
      return state.filter(note => note.id !== action.payload.id);

    case noteConstants.ADD_COLLABORATOR:
      return state.map(note => {
        if (note.id === action.payload.id){
          let selectedNote = {...note};
          selectedNote.collaborators.push(action.payload.collaborator);
          return selectedNote;
        }
        return note;
      });

    case noteConstants.REMOVE_COLLABORATOR:
      return state.map(note => {
        if (note.id === action.payload.id){
          let selectedNote = {...note};
          for(let i = 0; i < selectedNote.collaborators.length; i++){
            if (selectedNote.collaborators[i].email === action.payload.email){
              selectedNote.collaborators.splice(i, 1);
            }
          }
          return selectedNote;
        }
        return note;
      });

    case noteConstants.ADD_ITEM:
      return state.map(note => {
        if (note.id === action.payload.note.id){
          let newListBody = note.listBody.concat([{text: '', checked: false}]);
          return {...note, listBody: newListBody};
        }
        return note;
      });

    case noteConstants.UPDATE_ITEM:
      return state.map(note => {
        if (note.id === action.payload.note.id){
          let newListBody = note.listBody.map((item, index) => {
            if (action.payload.index === index){
              return {...item, text: action.payload.text};
            }
            return item;
          });
          return {...note, listBody: newListBody};
        }
        return note;
      });

    case noteConstants.REMOVE_ITEM:
      return state.map(note => {
        if (note.id === action.payload.note.id){
          let newListBody = note.listBody.filter((item, index) => index !== action.payload.index);
          return {...note, listBody: newListBody};
        }
        return note;
      });

    case noteConstants.CHECK_ITEM:
      return state.map(note => {
        if (note.id === action.payload.note.id){
          let newListBody = note.listBody.map((item, index) => {
            if (action.payload.index === index){
              return {...item, checked: !item.checked};
            }
            return item;
          });
          return {...note, listBody: newListBody};
        }
        return note;
      });

    case noteConstants.SWITCH_TYPE:
      return state.map(note => {
        if (note.id === action.payload.id){
          return {...note, type: (action.payload.type === 'text' ? 'list' : 'text')};
        }
        return note;
      });

    case noteConstants.SWITCH_BODY:
      return state.map(note => {
        if (note.id === action.payload.id){
          if (action.payload.type === 'text'){ // switch from text to list
            let textBody = action.payload.body.split('\n');
            let newListBody = textBody.map(text => {
              return {text: text, checked: false};
            });
            return {...note, body: '', listBody: newListBody};
          } else { // switch from list to text
            let textBody = '';
            note.listBody.forEach(item => {
              textBody = textBody.concat(item.text + '\n');
            });
            let text = textBody.slice(0, (textBody.length - 1));
            return {...note, body: text, listBody: []};
          }
        }
        return note;
      });

    case userConstants.LOGOUT_USER:
      return [];

    default:
      return state;
  }
}

// NotesById reducer that contains a user's notes as a lookup table with note ids as keys
const notesById = (state = {}, action) => {
  let nextState = {};
  let updatedListBody = {};

  switch (action.type){
    case noteConstants.RECEIVE_NOTES:
      action.payload.forEach(note => {
        nextState[note.id] = note;
      });
      return nextState;

    case noteConstants.ADD_NOTE:
    case noteConstants.UPDATE_NOTE:
      return {...state, [action.payload.id]: action.payload};

    case noteConstants.DELETE_NOTE:
      nextState = {...state};
      delete nextState[action.payload.id];
      return nextState;

    case noteConstants.ADD_ITEM:
      nextState = {...state};
      nextState[action.payload.note.id].listBody.concat([{text: '', checked: false}]);
      return nextState;

    case noteConstants.UPDATE_ITEM:
      nextState = {...state};
      updatedListBody = nextState[action.payload.note.id].listBody.map((item, index) => {
        if (action.payload.index === index){
          return {...item, text: action.payload.text};
        }
        return item;
      });
      nextState[action.payload.note.id] = {...nextState[action.payload.note.id], listBody: updatedListBody};
      return nextState;

    case noteConstants.REMOVE_ITEM:
      nextState = {...state};
      nextState[action.payload.note.id].listBody.filter((item, index) => index !== action.payload.index);
      return nextState;

    case noteConstants.CHECK_ITEM:
      nextState = {...state};
      updatedListBody = nextState[action.payload.note.id].listBody.map((item, index) => {
        if (action.payload.index === index){
          return {...item, checked: !item.checked};
        }
        return item;
      });
      nextState[action.payload.note.id] = {...nextState[action.payload.note.id], listBody: updatedListBody};
      return nextState;

    case noteConstants.SWITCH_TYPE:
      nextState = {...state};
      nextState[action.payload.id] = {...nextState[action.payload.id], type: (nextState[action.payload.id].type === 'text' ? 'list' : 'text')};
      return nextState;

    case noteConstants.SWITCH_BODY:
      nextState = {...state};
      if (action.payload.type === 'text'){ // switch from text to list
        let textBody = action.payload.body.split('\n');
        let newListBody = textBody.map(text => {
          return {text: text, checked: false};
        });
        nextState[action.payload.id] = {...nextState[action.payload.id], body: '', listBody: newListBody};
      } else { // switch from list to text
        let textBody = '';
        nextState[action.payload.id].listBody.forEach(item => {
          textBody = textBody.concat(item['text'] + '\n');
        });
        let text = textBody.slice(0, (textBody.length - 1));
        nextState[action.payload.id] = {...nextState[action.payload.id], body: text, listBody: []};
      }
      return nextState;

    case userConstants.LOGOUT_USER:
      return {};

    default:
      return state;
  }
}

const emptyNote = {id: '', title: '', body: '', colour: '', collaborators: []};

// CurrentNote reducer that holds the current note (for the 'Edit Note' modal)
const currentNote = (state = {}, action) => {
  switch (action.type){
    case noteConstants.SET_CURRENT_NOTE:
      return action.payload;

    case noteConstants.UPDATE_NOTE:
      if (state.id === action.payload.id){
        return action.payload;
      }
      return state;

    case noteConstants.DELETE_NOTE:
      if (state.id === action.payload.id){
        return emptyNote;
      }
      return state;

    case noteConstants.ADD_ITEM:
      if (state.id === action.payload.note.id){
        return {...action.payload.note, listBody: action.payload.note.listBody.concat([{text: '', checked: false}])}
      }
      return state;

    case noteConstants.UPDATE_ITEM:
      if (state.id === action.payload.note.id){
        let newListBody = action.payload.note.listBody.map((item, index) => {
          if (action.payload.index === index){
            return {...item, text: action.payload.text};
          }
          return item;
        });
        return {...action.payload.note, listBody: newListBody};
      }
      return state;

    case noteConstants.REMOVE_ITEM:
      if (state.id === action.payload.note.id){
        return {...action.payload.note, listBody: action.payload.note.listBody.filter((item, index) => index !== action.payload.index)}
      }
      return state;

    case noteConstants.CHECK_ITEM:
      if (state.id === action.payload.note.id){
        let newListBody = action.payload.note.listBody.map((item, index) => {
          if (action.payload.index === index){
            return {...item, checked: !item.checked};
          }
          return item;
        });
        return {...action.payload.note, listBody: newListBody};
      }
      return state;

    case noteConstants.SWITCH_TYPE:
      if (state.id === action.payload.id){
        return {...state, type: (state.type === 'text' ? 'list' : 'text')}
      }
      return state;

    case noteConstants.SWITCH_BODY:
      if (state.id === action.payload.id){
        if (action.payload.type === 'text'){ // switch from text to list
          let textBody = action.payload.body.split('\n');
          let newListBody = textBody.map(text => {
            return {text: text, checked: false};
          });
          return {...state, body: '', listBody: newListBody};
        } else { // switch from list to text
          let textBody = '';
          state.listBody.forEach(item => {
            textBody = textBody.concat(item.text + '\n');
          });
          let text = textBody.slice(0, (textBody.length - 1));
          return {...state, body: text, listBody: []};
        }
      }
      return state;

    default:
      return state;
  }
}

// Loading reducer for when fetching notes
const loading = (state = false, action) => {
  switch (action.type){
    case noteConstants.RECEIVING_NOTES:
      return true;

    case noteConstants.RECEIVE_NOTES:
      return false;

    default:
      return state;
  }
}

const searchTerm = (state = '', action) => {
  switch (action.type){
    case noteConstants.RECEIVE_NOTES:
      return '';

    case noteConstants.SET_SEARCH_TERM:
      return action.payload;

    default:
      return state;
  }
}

// Combines all the above reducers
export default combineReducers({
  notes,
  notesById,
  currentNote,
  loading,
  searchTerm
});

// Function to get a note by its id
export const getNoteById = (state, id) => state.notesById[id];

// Function to get notes by search term
export const getNotesByTerm = (state) => state.notes.filter(note => {
  let listBodyText = '';
  note.listBody.forEach(item => {
    listBodyText = listBodyText.concat(item.text + ' ');
  });
  listBodyText = listBodyText.slice(0, (listBodyText.length - 1));

  return(
    (note.title.includes(state.searchTerm))
    || (note.body.includes(state.searchTerm))
    || (listBodyText.includes(state.searchTerm))
  )
});
