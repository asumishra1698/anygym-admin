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
} from "../actions/actionTypes";
import { BASE_URL, STAFF_LOGIN_URL, ADMIN_LOGIN_URL } from "../../config";
import { postRequest } from "../../utils/apiHelper";

// Login Saga
function* loginSaga(action) {
  try {
    const endpoint =
      action.payload.user_type === "ADMIN" ? ADMIN_LOGIN_URL : STAFF_LOGIN_URL;

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

      // Store all data in localStorage
      localStorage.setItem("user", user);
      localStorage.setItem("_id", _id);
      localStorage.setItem("token", authorization.token);
      localStorage.setItem("authorizationType", authorization.type);

      localStorage.setItem(
        "userType",
        action.payload.user_type === "AREA_MANAGER" ? "AREA_MANAGER" : "ADMIN"
      );
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
      `${BASE_URL}/staff/otp-generate-pass-reset`,
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
      `${BASE_URL}/staff/otp-verify-pass-reset`,
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

// Watcher Saga
export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
}
