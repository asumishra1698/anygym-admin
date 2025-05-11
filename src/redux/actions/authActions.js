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

// Verify OTP Action Creators
export const verifyOtpRequest = (payload) => ({
  type: VERIFY_OTP_REQUEST,
  payload,
});

export const verifyOtpSuccess = (message) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: message,
});

export const verifyOtpFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

// Reset Password Action Creators
export const resetPasswordRequest = (payload) => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
});

export const resetPasswordSuccess = (message) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: message,
});

export const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});
