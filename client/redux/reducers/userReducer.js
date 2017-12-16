import { userConstants } from '../constants'

const initialState = {
  loading: false,
  authenticated: false,
  localAuth: false,
  id: '',
  email: '',
  name: ''
}

// User state that handles registration, login, and logout
const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {...state,
        loading: true
      };

    case userConstants.REGISTER_SUCCESS:
      return {...state,
        loading: false,
        authenticated: true,
        localAuth: action.payload.localAuth,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name
      };

    case userConstants.REGISTER_FAILURE:
      return {...state,
        loading: false,
        authenticated: false,
        localAuth: false
      };

    case userConstants.LOGIN_REQUEST:
      return {...state,
        loading: true
      };


    case userConstants.LOGIN_SUCCESS:
      return {...state,
        loading: false,
        authenticated: true,
        localAuth: action.payload.localAuth,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name
      };

    case userConstants.LOGIN_FAILURE:
      return {...state,
        loading: false,
        authenticated: false,
        localAuth: false
      };

    case userConstants.LOGOUT_USER:
      return {...state,
        loading: false,
        authenticated: false,
        localAuth: false,
        id: '',
        email: '',
        name: ''
      };

    default:
      return state;
  }
}

export default user
