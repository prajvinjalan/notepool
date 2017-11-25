import { userConstants } from '../constants'
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
    dispatch(registerSuccessAction(response.user));
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
    dispatch(loginSuccessAction(response.user));
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(loginFailureAction(error.message));
  });
}

// Action dispatcher for logging in with Google Authentication
export const googleAuth = () => (dispatch) => {
  console.log(1);
  return APIManager.get('/auth/google', {headers: {"*": "Access-Control-Allow-Origin"}})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error.message)
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
