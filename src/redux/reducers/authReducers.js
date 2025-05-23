import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  user: null,
  token: null,
  _id: null,
  error: null,
  forgotPasswordMessage: null,
  verifyOtpMessage: null,
  resetPasswordMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        _id: action.payload._id,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

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
        error: null,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        forgotPasswordMessage: null,
      };

    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        verifyOtpMessage: null,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        verifyOtpMessage: action.payload,
        error: null,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        verifyOtpMessage: null,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        resetPasswordMessage: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordMessage: action.payload,
        error: null,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        resetPasswordMessage: null,
      };

    default:
      return state;
  }
};

export default authReducer;
