import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/authActions";
import { BASE_URL , LOGIN_URL} from "../../config";
import { postRequest } from "../../utils/apiHelper";

function* loginSaga(action) {
  try {
    
    const response = yield call(
      postRequest,
      `${BASE_URL}${LOGIN_URL}`,
      action.payload
    );

    if (response.status === 200) {
      yield put(
        loginSuccess({
          user: response.data.user,
          token: response.data.authorization.token,
        })
      );

      // Store token in localStorage
      localStorage.setItem("token", response.data.authorization.token);
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
