import { call, put, takeLatest } from "redux-saga/effects";
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
import {
  BASE_URL,
  STAFF_LOGIN_URL,
  ADMIN_LOGIN_URL,
  OTP_GENRATE_URL,
  OTP_VERIFY_URL,
  RESET_PASSWORD_URL,
} from "../../config";
import { postRequest } from "../../utils/apiHelper";

// Login Saga
function* loginSaga(action) {
  try {
    const endpoint =
      action.payload.user_type === "AREA_MANAGER"
        ? STAFF_LOGIN_URL
        : ADMIN_LOGIN_URL;

    const response = yield call(
      postRequest,
      `${BASE_URL}${endpoint}`,
      action.payload
    );

    if (response.status === 200) {
      const { user, _id, authorization } = response.data;

      // Dispatch login success action
      yield put({
        type: LOGIN_SUCCESS,
        payload: {
          user,
          token: authorization.token,
          _id,
        },
      });
    } else {
      yield put({
        type: LOGIN_FAILURE,
        payload: response.message || "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    yield put({
      type: LOGIN_FAILURE,
      payload: error.message || "Something went wrong! Please try again.",
    });
  }
}

// Forgot Password Saga
function* forgotPasswordSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${OTP_GENRATE_URL}`,
      action.payload
    );

    console.log("Forgot password response:", response);

    if (response.status === 200 && response.message) {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: response.message || "OTP sent successfully!",
      });
    } else {
      yield put({
        type: FORGOT_PASSWORD_FAILURE,
        payload: response.message || "Failed to send reset email",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    yield put({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.message || "Something went wrong! Please try again.",
    });
  }
}

function* verifyOtpSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${OTP_VERIFY_URL}`,
      action.payload
    );

    console.log("Verify OTP response:", response);

    if (response.status === 200 && response.message) {
      yield put({
        type: VERIFY_OTP_SUCCESS,
        payload: response.message || "OTP verified successfully!",
      });
    } else {
      yield put({
        type: VERIFY_OTP_FAILURE,
        payload: response.message || "Failed to verify OTP",
      });
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    yield put({
      type: VERIFY_OTP_FAILURE,
      payload: error.message || "Something went wrong! Please try again.",
    });
  }
}

function* resetPasswordSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${RESET_PASSWORD_URL}`,
      action.payload
    );

    console.log("Reset Password response:", response);

    if (response.status === 200 && response.message) {
      yield put({
        type: RESET_PASSWORD_SUCCESS,
        payload: response.message || "Password reset successfully!",
      });
    } else {
      yield put({
        type: RESET_PASSWORD_FAILURE,
        payload: response.message || "Failed to reset password",
      });
    }
  } catch (error) {
    console.error("Reset Password error:", error);
    yield put({
      type: RESET_PASSWORD_FAILURE,
      payload: error.message || "Something went wrong! Please try again.",
    });
  }
}

// Watcher Saga
export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
