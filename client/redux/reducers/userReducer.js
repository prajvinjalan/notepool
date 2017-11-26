import { userConstants } from '../constants'

const initialState = {
  loading: false,
  authenticated: false,
  id: "",
  email: "",
  message: ""
}

// User state that handles registration, login, and logout
const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {...state,
        loading: true,
        message: ""
      };

    case userConstants.REGISTER_SUCCESS:
      return {...state,
        loading: false,
        authenticated: true,
        id: action.payload.id,
        email: action.payload.email,
        message: ""
      };

    case userConstants.REGISTER_FAILURE:
      return {...state,
        loading: false,
        authenticated: false,
        message: action.payload
      };

    case userConstants.LOGIN_REQUEST:
      return {...state,
        loading: true,
        message: ""
      };


    case userConstants.LOGIN_SUCCESS:
      return {...state,
        loading: false,
        authenticated: true,
        id: action.payload.id,
        email: action.payload.email,
        message: ""
      };

    case userConstants.LOGIN_FAILURE:
      return {...state,
        loading: false,
        authenticated: false,
        message: action.payload
      };

    case userConstants.LOGOUT_USER:
      return {...state,
        loading: false,
        authenticated: false,
        id: "",
        email: "",
        message: ""
      };

    default:
      return state;
  }
}

export default user
