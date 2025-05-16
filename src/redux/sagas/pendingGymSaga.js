import { call, put, takeLeading } from "redux-saga/effects";
import {
  fetchPendingGymsSuccess,
  fetchPendingGymsFailure,
  approveGymSuccess,
  approveGymFailure,
  rejectGymSuccess,
  rejectGymFailure,
} from "../actions/pendingGymActions";
import {
  APPROVE_GYM_REQUEST,
  REJECT_GYM_REQUEST,
  FETCH_PENDING_GYMS_REQUEST,
} from "../actions/actionTypes";
import { BASE_URL, PENDING_GYM_REQUEST_URL } from "../../config";
import { getRequest, postRequest } from "../../utils/apiHelper";

function* fetchPendingGymsSaga() {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${PENDING_GYM_REQUEST_URL}`
    );
    if (response.status === 200) {
      yield put(fetchPendingGymsSuccess(response.data.gyms));
    } else {
      yield put(fetchPendingGymsFailure("Failed to fetch pending gyms"));
    }
  } catch (error) {
    console.error("Error in fetchPendingGymsSaga:", error);
    yield put(fetchPendingGymsFailure(error.message || "Network error"));
  }
}

function* approveGymSaga(action) {
  try {
    const gymId = action.payload;
    const response = yield call(
      postRequest,
      `${BASE_URL}/staff/approve-gym/${gymId}`,
      { status: "Approved" }
    );
    if (response.status === 200) {
      yield put(approveGymSuccess(response.data));
    } else {
      yield put(approveGymFailure("Failed to approve gym"));
    }
  } catch (error) {
    console.error("Error in approveGymSaga:", error);
    yield put(
      approveGymFailure(error.response?.data?.message || "Network error")
    );
  }
}

function* rejectGymSaga(action) {
  try {
    const { gymId, message } = action.payload;
    const response = yield call(
      postRequest,
      `${BASE_URL}/staff/reject-gym/${gymId}`,
      { status: "Reject", message }
    );
    if (response.status === 200) {
      yield put(rejectGymSuccess(response.data));
    } else {
      yield put(rejectGymFailure("Failed to reject gym"));
    }
  } catch (error) {
    console.error("Error in rejectGymSaga:", error);
    yield put(
      rejectGymFailure(error.response?.data?.message || "Network error")
    );
  }
}

// Watcher Saga: Watches for actions
export default function* watchGymSaga() {
  yield takeLeading(FETCH_PENDING_GYMS_REQUEST, fetchPendingGymsSaga);
  yield takeLeading(APPROVE_GYM_REQUEST, approveGymSaga);
  yield takeLeading(REJECT_GYM_REQUEST, rejectGymSaga);
}
