import { userConstants, noteConstants } from '../constants'
import { APIManager } from '../../utils'

// ACTION DISPATCHERS
// equivalent to " ... => { return (dispatch) => { ... }} "

// Action dispatcher for registering locally
export const localRegister = (newUser) => (dispatch) => {
  dispatch(registerRequestAction());

  // Dispatches login action if registration was successful
  return APIManager.post('/auth/register', newUser)
  .then(response => {
    console.log(response.message);
    dispatch(registerSuccessAction({id: response.user.id, email: response.user.local.email}));
    dispatch(localLogin({
      email: newUser.email,
      password: newUser.password
    }));
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(registerFailureAction(error.message));
  });
}

// Action dispatcher for logging in locally
export const localLogin = (user) => (dispatch) => {
  dispatch(loginRequestAction());

  return APIManager.post('/auth/login', user)
  .then(response => {
    console.log(response.message);
    //setTimeout(() => {dispatch(loginSuccessAction(response.user))}, 1000);
    dispatch(loginSuccessAction({id: response.user.id, email: response.user.local.email}));
    const emptyNote = {id: '', title: '', body: '', colour: '', collaborators: []};
    dispatch(setCurrentNoteAction(emptyNote));
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(loginFailureAction(error.message));
  });
}

// Action dispatcher for successfully logging in with Social Media Authentication
export const authSuccess = () => (dispatch) => {
  return APIManager.get('/auth/user', null)
  .then(response => {
    const user = response.user;
    let email = '';

    if (user.google.email){
      email = user.google.email;
    } else if (user.facebook.email){
      email = user.facebook.email;
    }

    dispatch(loginSuccessAction({id: user.id, email: email}));
    const emptyNote = {id: '', title: '', body: '', colour: '', collaborators: []};
    dispatch(setCurrentNoteAction(emptyNote));
    return null;
  })
  .catch(error => {
    console.log(error.message);
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

const registerFailureAction = (error) => ({
  type: userConstants.REGISTER_FAILURE,
  payload: error
});

const loginRequestAction = () => ({
  type: userConstants.LOGIN_REQUEST,
  payload: null
});

const loginSuccessAction = (user) => ({
  type: userConstants.LOGIN_SUCCESS,
  payload: user,
  meta: {
    emit: true
  }
});

const loginFailureAction = (error) => ({
  type: userConstants.LOGIN_FAILURE,
  payload: error
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
