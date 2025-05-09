import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/authActions";
import { BASE_URL, ADMIN_LOGIN_URL, STAFF_LOGIN_URL } from "../../config";
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

      // Dispatch loginSuccess with all data
      yield put(
        loginSuccess({
          user,
          token: authorization.token,
          _id,
        })
      );

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
      yield put(loginFailure(response.message || "Invalid email or password"));
    }
  } catch (error) {
    yield put(loginFailure("Something went wrong! Please try again."));
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
