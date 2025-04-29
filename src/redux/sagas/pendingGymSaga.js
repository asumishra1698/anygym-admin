import { call, put, takeLeading } from "redux-saga/effects";
import {
  fetchPendingGymsSuccess,
  fetchPendingGymsFailure,
} from "../actions/pendingGymActions";
import {
  APPROVE_GYM_REQUEST,
  APPROVE_GYM_SUCCESS,
  APPROVE_GYM_FAILURE,
  REJECT_GYM_REQUEST,
  REJECT_GYM_SUCCESS,
  REJECT_GYM_FAILURE,
  FETCH_PENDING_GYMS_REQUEST,
} from "../actions/actionTypes";
import {
  BASE_URL,
  PENDING_GYM_REQUEST_URL,
  APPROVE_AND_REJECT_GYM_REQUEST_URL,
} from "../../config";
import { getRequest, postRequest } from "../../utils/apiHelper";

function* fetchPendingGymsSaga() {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${PENDING_GYM_REQUEST_URL}`
    );
    if (response.status === 200) {
      yield put(fetchPendingGymsSuccess(response.data));
    } else {
      yield put(fetchPendingGymsFailure("Failed to fetch pending gyms"));
    }
  } catch (error) {
    console.error("Error in fetchPendingGymsSaga:", error);
    yield put(fetchPendingGymsFailure(error.message || "Network error"));
  }
}

function* updateGymStatusSaga(action) {
  try {
    const { gymId, status } = action.payload;
    const response = yield call(
      postRequest,
      `${BASE_URL}${APPROVE_AND_REJECT_GYM_REQUEST_URL}${gymId}`,
      { status }
    );
    if (response.status === 200) {
      yield put({
        type: status === "Approved" ? APPROVE_GYM_SUCCESS : REJECT_GYM_SUCCESS,
        payload: { gymId, status },
      });
    } else {
      yield put({
        type: status === "Approved" ? APPROVE_GYM_FAILURE : REJECT_GYM_FAILURE,
        payload: "Failed to update gym status",
      });
    }
  } catch (error) {
    console.error("Error in updateGymStatusSaga:", error);
    yield put({
      type:
        action.payload.status === "Approved"
          ? APPROVE_GYM_FAILURE
          : REJECT_GYM_FAILURE,
      payload: error.response?.data?.message || "Network error",
    });
  }
}

// Watcher Saga: Watches for actions
export default function* watchGymSaga() {
  yield takeLeading(FETCH_PENDING_GYMS_REQUEST, fetchPendingGymsSaga);
  yield takeLeading(APPROVE_GYM_REQUEST, updateGymStatusSaga);
  yield takeLeading(REJECT_GYM_REQUEST, updateGymStatusSaga);
}
