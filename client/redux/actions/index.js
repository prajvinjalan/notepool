import constants from '../constants'
import { APIManager, Auth } from '../../utils'

// ACTION DISPATCHERS

export const fetchNotes = () => (dispatch) => {
  let id = Auth.getUserId();
  APIManager.get(`/api/users/${id}`, null)
  .then(response => {
    let params = { params: { collaborators: response.result.local.email }}
    APIManager.get('/api/notes', params)
    .then(response => {
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

export const addNote = (note) => (dispatch) => {
  let id = Auth.getUserId();
  APIManager.get(`/api/users/${id}`, null)
  .then(response => {
    note.collaborators.push(response.result.local.email);
    APIManager.post('/api/notes', note)
    .then(response => {
      dispatch(addNoteAction(response.result));
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

export const addCollaborator = (params) => (dispatch, getState) => {
  dispatch(addCollaboratorAction(params));
  dispatch(updateCollaborator(params));
}

export const removeCollaborator = (params) => (dispatch, getState) => {
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

// ACTIONS
// can also be "... => { return { ... } } "

const fetchNotesAction = (notes) => ({
  type: constants.RECEIVE_NOTES,
  payload: notes
});

const addNoteAction = (note) => ({
  type: constants.ADD_NOTE,
  payload: note
});

const updateNoteAction = (note) => ({
  type: constants.UPDATE_NOTE,
  payload: note
});

const deleteNoteAction = (id) => ({
  type: constants.DELETE_NOTE,
  payload: id
});

const addCollaboratorAction = (params) => ({
  type: constants.ADD_COLLABORATOR,
  payload: params
});

const removeCollaboratorAction = (params) => ({
  type: constants.REMOVE_COLLABORATOR,
  payload: params
});

const updatedCollaboratorAction = (note) => ({
  type: constants.UPDATE_COLLABORATORS,
  payload: note
})