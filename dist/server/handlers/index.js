'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxSocket = require('redux-socket.io-connect');

// backend variable persists (since based on server not client)
var currentClients = {};

exports.default = (0, _reduxSocket.createHandler)({
  UPDATE_NOTE: function UPDATE_NOTE(context, action) {
    dispatchToMultipleClients(context, action, 'UPDATE_NOTE');
  },

  SET_CURRENT_NOTE: function SET_CURRENT_NOTE(context, action) {
    dispatchToMultipleClients(context, action, 'UPDATE_NOTE');
  },

  DELETE_NOTE: function DELETE_NOTE(context, action) {
    dispatchToMultipleClients(context, action, 'DELETE_NOTE');
  },

  ADD_COLLABORATOR: function ADD_COLLABORATOR(context, action) {
    dispatchToSingleClient(context, action, 'ADD_NOTE');
  },

  REMOVE_COLLABORATOR: function REMOVE_COLLABORATOR(context, action) {
    dispatchToSingleClient(context, action, 'DELETE_NOTE');
  },

  ADD_ITEM: function ADD_ITEM(context, action) {
    dispatchToMultipleClients(context, action, 'ADD_ITEM');
  },

  UPDATE_ITEM: function UPDATE_ITEM(context, action) {
    dispatchToMultipleClients(context, action, 'UPDATE_ITEM');
  },

  REMOVE_ITEM: function REMOVE_ITEM(context, action) {
    dispatchToMultipleClients(context, action, 'REMOVE_ITEM');
  },

  CHECK_ITEM: function CHECK_ITEM(context, action) {
    dispatchToMultipleClients(context, action, 'CHECK_ITEM');
  },

  SWITCH_TYPE: function SWITCH_TYPE(context, action) {
    dispatchToMultipleClients(context, action, 'SWITCH_TYPE');
  },

  SWITCH_BODY: function SWITCH_BODY(context, action) {
    dispatchToMultipleClients(context, action, 'SWITCH_BODY');
  },

  LOGIN_SUCCESS: function LOGIN_SUCCESS(context, action) {
    var client = context.client,
        server = context.server;

    currentClients[client.id] = action.payload.email;
  },

  LOGOUT_USER: function LOGOUT_USER(context, action) {
    var client = context.client;
    // console.log(client.id);

    delete currentClients[client.id];
    // console.log(currentClients);
  },

  SET_CLIENT_SOCKET: function SET_CLIENT_SOCKET(context, action) {
    var client = context.client;

    var oldClientId = getClientId(action.payload.email);
    delete currentClients[oldClientId];
    currentClients[client.id] = action.payload.email;
    // console.log(currentClients);
  }
});

// Dispatch an action to multiple clients that are collaborating on a certain note

var dispatchToMultipleClients = function dispatchToMultipleClients(context, action, dispatchType) {
  var client = context.client,
      dispatchTo = context.dispatchTo;

  var payload = action.payload;
  var otherClients = {};
  // console.log(action, client.id);
  switch (dispatchType) {
    case 'ADD_ITEM':
    case 'UPDATE_ITEM':
    case 'REMOVE_ITEM':
    case 'CHECK_ITEM':
      otherClients = getCollaboratingClients(client.id, payload.note);
      break;

    default:
      otherClients = getCollaboratingClients(client.id, payload);
      break;
  }
  // console.log(otherClients);
  // console.log(dispatchType);
  var clientId = void 0;
  for (clientId in otherClients) {
    dispatchTo(clientId, {
      type: dispatchType,
      payload: payload
    });
  }
};

// Dispatch an action to a single client based on user's email
var dispatchToSingleClient = function dispatchToSingleClient(context, action, dispatchType) {
  var client = context.client,
      dispatchTo = context.dispatchTo;

  var payload = action.payload;
  // console.log(action, client.id);
  // 'REMOVE_COLLABORATOR' sends email object in payload, whereas 'ADD_COLLABORATOR' sends collaborator object in payload
  var clientId = getClientId(payload.email ? payload.email : payload.collaborator.email);
  dispatchTo(clientId, {
    type: dispatchType,
    payload: payload.note
  });
  // console.log(currentClients);
};

// Get all clients that have users who are collaborating on a certain note
var getCollaboratingClients = function getCollaboratingClients(clientId, note) {
  var otherClients = Object.assign({}, currentClients);
  delete otherClients[clientId]; // remove client who dispatched action

  // remove clients who aren't collaborating
  var id = void 0;
  for (id in otherClients) {
    var found = false;
    note.collaborators.forEach(function (collaborator) {
      if (collaborator['email'] === otherClients[id]) {
        found = true;
      }
    });
    if (!found) {
      delete otherClients[id];
    }
  }
  return otherClients;
};

// Get single client id based on user's email
var getClientId = function getClientId(email) {
  // console.log(currentClients)
  var id = void 0;
  for (id in currentClients) {
    if (currentClients[id] === email) {
      return id;
    }
  }
  return null;
};