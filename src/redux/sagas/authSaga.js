import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../actions/actionTypes";
import { BASE_URL, STAFF_LOGIN_URL, ADMIN_LOGIN_URL } from "../../config";
import { postRequest } from "../../utils/apiHelper";

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

      // Additional logic for AREA_MANAGER
      if (action.payload.user_type === "AREA_MANAGER") {
        localStorage.setItem("userType", "AREA_MANAGER");
      } else {
        localStorage.setItem("userType", "ADMIN");
      }
    } else {
      yield put({
        type: LOGIN_FAILURE,
        payload: response.message || "Invalid email or password",
      });
    }
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: "Something went wrong! Please try again.",
    });
  }
}

function* forgotPasswordSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}/staff/otp-generate-pass-reset`,
      action.payload
    );

    console.log("Forgot password response:", response);

    if (response.status === 200 && response.data) {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS,
        payload:
          response.data.message || "OTP Sent Successfully to your Email!",
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

export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}
