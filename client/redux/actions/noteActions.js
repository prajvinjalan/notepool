import { noteConstants } from '../constants'
import { APIManager } from '../../utils'

// ACTION DISPATCHERS
// equivalent to " ... => { return (dispatch) => { ... }} "

// Action dispatcher for fetching all of a user's notes
export const fetchNotes = (email) => (dispatch) => {
  dispatch(fetchingNotesAction());

  return APIManager.get('/api/notes', null)
  .then(response => {
    dispatch(fetchUserNotes(email, response.result));
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

// Gets the notes corresponding to the logged in user and dispatches an action to fetch those notes
const fetchUserNotes = (email, notes) => (dispatch) => {
  let userNotes = [];
  notes.forEach(note => {
    note.collaborators.forEach(collaborator => {
      if (collaborator['email'] === email){
        userNotes.push(note);
      }
    });
  });
  //setTimeout(() => {dispatch(fetchNotesAction(response.result))}, 1000);
  dispatch(fetchNotesAction(userNotes));
}

// Action dispatcher for adding a note
export const addNote = (note) => (dispatch) => {
  return APIManager.post('/api/notes', note)
  .then(response => {
    dispatch(addNoteAction(response.result));
    return response.result;
  })
  .catch(error => {
    console.log(error.message);
  });
}

// Action dispatcher for updating a given note
export const updateNote = (note) => (dispatch) => {
  return APIManager.put(`/api/notes/${note.id}`, {data: note})
  .then(response => {
    dispatch(updateNoteAction(response.result));
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

// Action dispatcher for deleting a given note
export const deleteNote = (note) => (dispatch) => {
  return APIManager.delete(`/api/notes/${note.id}`)
  .then(response => {
    dispatch(deleteNoteAction(note));
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

// Action dispatcher for setting a note as the current note, then updating the note (state change, emits to other users, no API call)
export const setCurrentNote = (note) => (dispatch) => {
  dispatch(setCurrentNoteAction(note));
  dispatch(updateNoteAction(note));
}

// Action dispatcher for adding a collaborator from a note (params are id, collaborator object, note object)
export const addCollaborator = (params) => (dispatch) => {
  dispatch(addCollaboratorAction(params));
  dispatch(updateCollaborator(params));
}

// Action dispatcher for removing a collaborator from a note (params are id, email, note object)
export const removeCollaborator = (params) => (dispatch) => {
  dispatch(removeCollaboratorAction(params));
  dispatch(updateCollaborator(params));
}

// Updates the note with the collaborator changes in the database and sets it as the current note
const updateCollaborator = (params) => (dispatch, getState) => {
  const note = getState().note.notesById[params.id];
  //const data = { data: { email: params.email }}
  APIManager.put(`/api/notes/${params.id}`, {data: note})
  .then(response => {
    dispatch(setCurrentNoteAction(response.result));
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

// Switches types from plain to list type note (and vice versa)
export const changeType = (params) => (dispatch) => {

}

// Adds a list item to a list type note (params is note)
export const addItem = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(addItemAction(params)));
  });
}

// Updates a list item in a list type note (params are note, text, index)
export const updateItem = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(updateItemAction(params)));
  });
}

// Removes a list item from a list type note (params are note, index)
export const removeItem = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(removeItemAction(params)));
  });
}

// Selects checkbox of a list item in a list type note (params are note, index)
export const checkItem = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(checkItemAction(params)));
  });
}

// ACTION CREATORS
// equivalent to " ... => { return { ... } } "

const fetchingNotesAction = () => ({
  type: noteConstants.RECEIVING_NOTES
})

const fetchNotesAction = (notes) => ({
  type: noteConstants.RECEIVE_NOTES,
  payload: notes
});

const addNoteAction = (note) => ({
  type: noteConstants.ADD_NOTE,
  payload: note
});

const updateNoteAction = (note) => ({
  type: noteConstants.UPDATE_NOTE,
  payload: note,
  meta: {
    emit: true
  }
});

const deleteNoteAction = (note) => ({
  type: noteConstants.DELETE_NOTE,
  payload: note,
  meta: {
    emit: true
  }
});

const setCurrentNoteAction = (note) => ({
  type: noteConstants.SET_CURRENT_NOTE,
  payload: note,
  meta: {
    emit: true
  }
});

const addCollaboratorAction = (params) => ({
  type: noteConstants.ADD_COLLABORATOR,
  payload: params,
  meta: {
    emit: true
  }
});

const removeCollaboratorAction = (params) => ({
  type: noteConstants.REMOVE_COLLABORATOR,
  payload: params,
  meta: {
    emit: true
  }
});

const addItemAction = (params) => ({
  type: noteConstants.ADD_ITEM,
  payload: params,
  meta: {
    emit: true
  }
});

const updateItemAction = (params) => ({
  type: noteConstants.UPDATE_ITEM,
  payload: params,
  meta: {
    emit: true
  }
});

const removeItemAction = (params) => ({
  type: noteConstants.REMOVE_ITEM,
  payload: params,
  meta: {
    emit: true
  }
});

const checkItemAction = (params) => ({
  type: noteConstants.CHECK_ITEM,
  payload: params,
  meta: {
    emit: true
  }
});
