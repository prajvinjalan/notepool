import { userConstants } from '../constants'
import { APIManager } from '../../utils'

// ACTION DISPATCHERS
// equivalent to " ... => { return (dispatch) => { ... }} "

export const localRegister = (newUser) => (dispatch) => {
  dispatch(registerRequestAction());

  APIManager.post('/auth/register', newUser)
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

export const localLogin = (user) => (dispatch) => {
  dispatch(loginRequestAction());

  APIManager.post('/auth/login', user)
  .then(response => {
    console.log(response.message);
    //setTimeout(() => {dispatch(loginSuccessAction(response.user))}, 1000);
    dispatch(loginSuccessAction(response.user));
    //this.props.history.push('/notes');
    return null;
  })
  .catch(error => {
    console.log(error.message);
    dispatch(loginFailureAction(error.message));
  });
}

export const logout = () => (dispatch) => {
  APIManager.get('/auth/logout', null)
  .then(response => {
    console.log(response.message);
    dispatch(logoutUserAction());
    //this.props.history.push('/');
  })
  .catch(error => {
    console.log(error.message);
  });
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
  payload: user
});

const loginFailureAction = (error) => ({
  type: userConstants.LOGIN_FAILURE,
  payload: error
});

const logoutUserAction = () => ({
  type: userConstants.LOGOUT_USER,
  payload: null
})
