import { noteConstants } from '../constants'
import { APIManager } from '../../utils'

// ACTION DISPATCHERS
// equivalent to " ... => { return (dispatch) => { ... }} "

export const fetchNotes = (id) => (dispatch) => {
  dispatch(fetchingNotesAction());

  APIManager.get(`/api/users/${id}`, null)
  .then(response => {
    let params = { params: { collaborators: response.result.local.email }}
    APIManager.get('/api/notes', params)
    .then(response => {
      //setTimeout(() => {dispatch(fetchNotesAction(response.result))}, 1000);
      dispatch(fetchNotesAction(response.result));
      return null;
    })
    .catch(error => {
      console.log(error.message);
    });
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

export const addNote = (params) => (dispatch) => {
  APIManager.get(`/api/users/${params.id}`, null)
  .then(response => {
    params.note.collaborators.push(response.result.local.email);
    APIManager.post('/api/notes', params.note)
    .then(response => {
      dispatch(addNoteAction(response.result));
      dispatch(setCurrentNote(response.result.id));
    })
    .catch(error => {
      console.log(error.message);
    });
    return response;
  })
  .catch(error => {
    console.log(error.message);
  });
}

export const updateNote = (note) => (dispatch) => {
  APIManager.put(`/api/notes/${note.id}`, {data: note})
  .then(response => {
    dispatch(updateNoteAction(response.result));
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

export const deleteNote = (id) => (dispatch) => {
  APIManager.delete(`/api/notes/${id}`)
  .then(response => {
    dispatch(deleteNoteAction(id));
    return null;
  })
  .catch(error => {
    console.log(error.message);
  });
}

export const setCurrentNote = (note) => (dispatch) => {
  dispatch(setCurrentNoteAction(note));
}

export const addCollaborator = (params) => (dispatch) => {
  dispatch(addCollaboratorAction(params));
  dispatch(updateCollaborator(params));
}

export const removeCollaborator = (params) => (dispatch) => {
  dispatch(removeCollaboratorAction(params));
  dispatch(updateCollaborator(params));
}

const updateCollaborator = (params) => (dispatch, getState) => {
  const note = getState().note.notesById[params.id];
  APIManager.put(`/api/notes/${note.id}`, {data: note})
  .then(response => {
    dispatch(updatedCollaboratorAction(response.result));
    return null;
  })
  .catch(error => {
    console.log(error.message);
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
  payload: note
});

const deleteNoteAction = (id) => ({
  type: noteConstants.DELETE_NOTE,
  payload: id
});

const setCurrentNoteAction = (note) => ({
  type: noteConstants.SET_CURRENT_NOTE,
  payload: note
});

const addCollaboratorAction = (params) => ({
  type: noteConstants.ADD_COLLABORATOR,
  payload: params
});

const removeCollaboratorAction = (params) => ({
  type: noteConstants.REMOVE_COLLABORATOR,
  payload: params
});

const updatedCollaboratorAction = (note) => ({
  type: noteConstants.UPDATE_COLLABORATORS,
  payload: note
})
