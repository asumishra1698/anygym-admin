import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "./actionTypes";

// Login Action Creators
export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Forgot Password Action Creators
export const forgotPasswordRequest = (email) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload: { email },
});

export const forgotPasswordSuccess = (message) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: message,
});

export const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: error,
});