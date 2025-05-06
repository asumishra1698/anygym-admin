import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
  UPDATE_GYM_STATUS_REQUEST,
  UPDATE_GYM_STATUS_SUCCESS,
  UPDATE_GYM_STATUS_FAILURE,
} from "../actions/actionTypes";

import { getRequest, putRequest } from "../../utils/apiHelper"; // Use putRequest here
import { BASE_URL, APPROVED_GYM_REQUEST_URL } from "../../config";
import { toast } from "react-toastify";

// Worker Saga: Handles the API call to fetch approved gyms
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

function* updateGymStatusSaga(action) {
  const { gymId, status } = action.payload;
  try {
    const response = yield call(
      putRequest,
      `${BASE_URL}/admin/gym/${gymId}/status`,
      { status }
    );

    if (response.status === 200) {
      yield put({
        type: UPDATE_GYM_STATUS_SUCCESS,
        payload: { gymId, status },
      });
      toast.success(
        response.data.message || "Gym status updated successfully!"
      );
    } else {
      yield put({
        type: UPDATE_GYM_STATUS_FAILURE,
        payload: response.message || "Failed to update gym status",
      });
      toast.error(response.message || "Failed to update gym status");
    }
  } catch (error) {
    yield put({
      type: UPDATE_GYM_STATUS_FAILURE,
      payload: error.message || "Network error occurred",
    });
    toast.error(error.message || "An error occurred while updating gym status");
  }
}

// Watcher Saga
function* approvedGymSaga() {
  yield takeLatest(FETCH_APPROVED_GYMS_REQUEST, fetchApprovedGymsSaga);
  yield takeLatest(UPDATE_GYM_STATUS_REQUEST, updateGymStatusSaga);
}

export default approvedGymSaga;
