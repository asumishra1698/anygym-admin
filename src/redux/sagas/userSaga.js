import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_USERS_REQUEST } from "../actions/actionTypes";
import { fetchUsersSuccess, fetchUsersFailure } from "../actions/userActions";
import { BASE_URL } from "../../config";
import { getRequest } from "../../utils/apiHelper";

function* fetchUsersSaga(action) {
  try {
    const { page, limit, search } = action.payload;
    const url = `${BASE_URL}/user/get-all-users/?page=${page}&limit=${limit}&search=${search}`;
    const response = yield call(getRequest, url);
    if (response.status === 200 && response.data.users) {
      yield put(fetchUsersSuccess(response.data.users));
    } else {
      yield put(fetchUsersFailure(response.message || "Failed to fetch users"));
    }
  } catch (error) {
    yield put(fetchUsersFailure(error.message || "Network error occurred"));
  }
}

// Watcher Saga
export default function* watchUserSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
}
