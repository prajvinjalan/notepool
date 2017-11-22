var reduxio = require('redux-socket.io-connect');

let currentClients = {};
// store same clientId on refresh? or set state again?

module.exports = reduxio.createHandler({
  UPDATE_NOTE: (context, action) => {
    dispatchToMultipleClients(context, action, 'UPDATE_NOTE');
  },

  SET_CURRENT_NOTE: (context, action) => {
    dispatchToMultipleClients(context, action, 'UPDATE_NOTE');
  },

  DELETE_NOTE: (context, action) => {
    dispatchToMultipleClients(context, action, 'DELETE_NOTE');
  },

  ADD_COLLABORATOR: (context, action) => {
    dispatchToSingleClient(context, action, 'ADD_NOTE');
  },

  REMOVE_COLLABORATOR: (context, action) => {
    dispatchToSingleClient(context, action, 'DELETE_NOTE');
  },

  LOGIN_SUCCESS: (context, action) => {
    const { client, server } = context;
    currentClients[client.id] = action.payload.local.email;
  },

  LOGOUT_USER: (context, action) => {
    const { client, server } = context;
    // console.log(client.id);
    delete currentClients[client.id];
    // console.log(currentClients);
  }
});

const dispatchToMultipleClients = (context, action, dispatchType) => {
  const { client, dispatchTo } = context;
  const payload = action.payload;
  // console.log(action, client.id);
  const otherClients = getCollaboratingClients(client.id, payload);
  // console.log(otherClients);
  for (clientId in otherClients){
    dispatchTo(clientId, {
      type: dispatchType,
      payload: payload
    });
  }
}

const dispatchToSingleClient = (context, action, dispatchType) => {
  const { client, dispatchTo } = context;
  const payload = action.payload;
  // console.log(action, client.id);
  const clientId = getClientId(payload.email);
  dispatchTo(clientId, {
    type: dispatchType,
    payload: payload.note
  });
  //console.log(currentClients);
}

const getCollaboratingClients = (clientId, note) => {
  let otherClients = Object.assign({}, currentClients);
  delete otherClients[clientId]; // remove client who dispatched action

  // remove clients who aren't collaborating
  for (id in otherClients){
    if (!(note.collaborators.indexOf(otherClients[id]) > -1)){
      delete otherClients[id];
    }
  }
  return otherClients;
}

const getClientId = (email) => {
  for (id in currentClients){
    if (currentClients[id] === email){
      return id;
    }
  }
  return null;
}
