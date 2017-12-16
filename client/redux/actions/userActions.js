import { userConstants, noteConstants } from '../constants'
import { APIManager } from '../../utils'
import { toastr } from 'react-redux-toastr'

// ACTION DISPATCHERS
// equivalent to " ... => { return (dispatch) => { ... }} "

// Action dispatcher for registering locally
export const localRegister = (newUser) => (dispatch) => {
  dispatch(registerRequestAction());

  // Dispatches login action if registration was successful
  return APIManager.post('/auth/register', newUser)
  .then(response => {
    console.log(response.message);
    dispatch(registerSuccessAction({id: response.user.id, email: response.user.local.email, name: response.user.local.name}));
    dispatch(localLogin({
      email: newUser.email,
      password: newUser.password
    }));
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(registerFailureAction());
    dispatch(displayNotification(error.message, 'error'));
  });
}

// Action dispatcher for logging in locally
export const localLogin = (user) => (dispatch) => {
  dispatch(loginRequestAction());

  return APIManager.post('/auth/login', user)
  .then(response => {
    console.log(response.message);
    //setTimeout(() => {dispatch(loginSuccessAction(response.user))}, 1000);
    dispatch(loginSuccess({
      id: response.user.id,
      email: response.user.local.email,
      name: response.user.local.name,
      message: response.message,
      localAuth: true
    }));
    const emptyNote = {id: '', title: '', body: '', colour: '', collaborators: []};
    dispatch(setCurrentNoteAction(emptyNote));
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(loginFailureAction());
    dispatch(displayNotification(error.message, 'error'));
  });
}

// Action dispatcher for changing local password
export const changePassword = (params) => (dispatch) => {
  return APIManager.post('/auth/changepassword', params)
  .then(response => {
    dispatch(displayNotification(response.message, 'success'));
  })
  .catch(error => {
    dispatch(displayNotification(error.message, 'error'));
  });
}

// Action dispatcher for successfully logging in with Social Media Authentication
export const authSuccess = () => (dispatch) => {
  return APIManager.get('/auth/user', null)
  .then(response => {
    const user = response.user;
    let email = '';
    let name = '';

    if (user.google.email){
      email = user.google.email;
      name = user.google.name;
    } else if (user.facebook.email){
      email = user.facebook.email;
      name = user.facebook.name;
    }

    dispatch(loginSuccess({id: user.id, email: email, name: name, message: response.message, localAuth: false}));
    const emptyNote = {id: '', title: '', body: '', colour: '', collaborators: []};
    dispatch(setCurrentNoteAction(emptyNote));
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(displayNotification(error.message, 'error'));
  })
}

// Action dispatcher for logging out
export const logout = () => (dispatch) => {
  return APIManager.get('/auth/logout', null)
  .then(response => {
    console.log(response.message);
    dispatch(logoutUserAction());
  })
  .catch(error => {
    console.log(error.message);
  });
}

// Action dispatcher for setting the current client's socket id
export const setClientSocket = (user) => (dispatch) => {
  dispatch(setClientSocketAction(user));
}

// Dispatches a login success action and notification
const loginSuccess = (payload) => (dispatch) => {
  dispatch(loginSuccessAction({id: payload.id, email: payload.email, name: payload.name, localAuth: payload.localAuth}));
  dispatch(displayNotification(payload.message, 'success'));
}

// Dispatches a toastr action to display notification(s) after authentication
const displayNotification = (message, type) => (dispatch) => {
  let messages = message.split(',');
  for (let i = 0; i < messages.length; i++){
    if (type === 'success'){
      toastr.success(messages[i]);
    } else if (type === 'error'){
      toastr.error(messages[i]);
    }
  }
}

// ACTION CREATORS
// equivalent to " ... => { return { ... } } "

const registerRequestAction = () => ({
  type: userConstants.REGISTER_REQUEST,
  payload: null
});

const registerSuccessAction = (user) => ({
  type: userConstants.REGISTER_SUCCESS,
  payload: user
});

const registerFailureAction = () => ({
  type: userConstants.REGISTER_FAILURE,
  payload: null
});

const loginRequestAction = () => ({
  type: userConstants.LOGIN_REQUEST,
  payload: null
});

const loginSuccessAction = (params) => ({
  type: userConstants.LOGIN_SUCCESS,
  payload: params,
  meta: {
    emit: true
  }
});

const loginFailureAction = () => ({
  type: userConstants.LOGIN_FAILURE,
  payload: null
});

const logoutUserAction = () => ({
  type: userConstants.LOGOUT_USER,
  payload: null,
  meta: {
    emit: true
  }
});

const setClientSocketAction = (user) => ({
  type: userConstants.SET_CLIENT_SOCKET,
  payload: user,
  meta: {
    emit: true
  }
});

const setCurrentNoteAction = (note) => ({
  type: noteConstants.SET_CURRENT_NOTE,
  payload: note
})
