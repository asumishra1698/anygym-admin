import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
} from "../actions/actionTypes";
import { getRequest } from "../../utils/apiHelper";
import { BASE_URL, APPROVED_GYM_REQUEST_URL } from "../../config";

// Worker Saga: Handles the API call
function* fetchApprovedGymsSaga() {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${APPROVED_GYM_REQUEST_URL}`
    );
    if (response.status === 200) {
      yield put({ type: FETCH_APPROVED_GYMS_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: FETCH_APPROVED_GYMS_FAILURE,
        payload: "Failed to fetch approved gyms",
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_APPROVED_GYMS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
}

function* approvedGymSaga() {
  yield takeLatest(FETCH_APPROVED_GYMS_REQUEST, fetchApprovedGymsSaga);
}

export default approvedGymSaga;
