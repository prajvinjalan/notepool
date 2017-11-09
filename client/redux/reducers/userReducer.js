import { userConstants } from '../constants'

const initialState = {
  loading: false,
  authenticated: false,
  id: "",
  message: ""
}

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
        userId: action.payload._id
      };

    case userConstants.REGISTER_FAILURE:
      return {...state,
        loading: false,
        authenticated: false,
        message: action.payload
      };

    case userConstants.LOGIN_REQUEST:
      return {...state,
        loading: true
      };


    case userConstants.LOGIN_SUCCESS:
      return {...state,
        loading: false,
        authenticated: true,
        id: action.payload._id
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
        id: ""
      };

    default:
      return state;
  }
}

export default user
