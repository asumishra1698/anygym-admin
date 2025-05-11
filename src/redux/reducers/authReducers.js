import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../actions/actionTypes"; 

const initialState = {
  loading: false,
  user: null,
  token: null,
  _id: null,
  error: null,
  forgotPasswordMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        _id: action.payload._id,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        forgotPasswordMessage: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotPasswordMessage: action.payload,
      };
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
