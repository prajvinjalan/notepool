import { userConstants } from '../constants'

const initialState = {
  loading: false,
  authenticated: false,
  id: "",
  email: ""
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
        id: action.payload.id,
        email: action.payload.email
      };

    case userConstants.REGISTER_FAILURE:
      return {...state,
        loading: false,
        authenticated: false
      };

    case userConstants.LOGIN_REQUEST:
      return {...state,
        loading: true
      };


    case userConstants.LOGIN_SUCCESS:
      return {...state,
        loading: false,
        authenticated: true,
        id: action.payload.id,
        email: action.payload.email
      };

    case userConstants.LOGIN_FAILURE:
      return {...state,
        loading: false,
        authenticated: false
      };

    case userConstants.LOGOUT_USER:
      return {...state,
        loading: false,
        authenticated: false,
        id: "",
        email: ""
      };

    default:
      return state;
  }
}

export default user
