import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_AREA_MANAGERS_REQUEST,
  ADD_AREA_MANAGER_REQUEST,
  UPDATE_AREA_MANAGER_STATUS_REQUEST,
  UPDATE_AREA_MANAGER_REQUEST,
  FETCH_AREA_MANAGER_DETAILS_REQUEST,
  FETCH_AREA_MANAGER_DETAILS_SUCCESS,
  FETCH_AREA_MANAGER_DETAILS_FAILURE,
} from "../actions/actionTypes";
import {
  fetchAreaManagersSuccess,
  fetchAreaManagersFailure,
  addAreaManagerSuccess,
  addAreaManagerFailure,
  updateAreaManagerStatusSuccess,
  updateAreaManagerStatusFailure,
  updateAreaManagerSuccess,
  updateAreaManagerFailure,
} from "../actions/areaManagerActions";

import { postRequest, getRequest, putRequest } from "../../utils/apiHelper";
import {
  BASE_URL,
  AREA_MANAGER_URL,
  ADD_AREA_MANAGER_URL,
  UPDATE_MANAGER_DETAILS_URL,
} from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch Area Managers Saga with Pagination
function* fetchAreaManagersSaga(action) {
  const { page, limit, searchQuery } = action.payload;
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${AREA_MANAGER_URL}?page=${page}&limit=${limit}&search=${searchQuery}`
    );

    if (response.status === 200) {
      const data = response.data;

      if (data && Array.isArray(data.records)) {
        yield put(
          fetchAreaManagersSuccess({
            records: data.records,
            page: data.page,
            per_page: data.per_page,
            total_records: data.total_records,
          })
        );
      } else {
        yield put(
          fetchAreaManagersFailure(
            "Invalid response format: 'records' is not an array"
          )
        );
      }
    } else {
      yield put(
        fetchAreaManagersFailure(
          response.message || "Failed to fetch area managers"
        )
      );
    }
  } catch (error) {
    yield put(
      fetchAreaManagersFailure(error.message || "Network error occurred")
    );
  }
}

function* fetchAreaManagerDetailsSaga(action) {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}/admin/staff/${action.payload}`
    );
    if (response.status === 200) {
      yield put({
        type: FETCH_AREA_MANAGER_DETAILS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: FETCH_AREA_MANAGER_DETAILS_FAILURE,
        payload: response.message || "Failed to fetch area manager details",
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_AREA_MANAGER_DETAILS_FAILURE,
      payload: error.message || "Network error occurred",
    });
  }
}

// Add Area Manager Saga
function* addAreaManagerSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${ADD_AREA_MANAGER_URL}`,
      action.payload,
      {
        "Content-Type": "multipart/form-data",
      }
    );

    if (response.status === 200) {
      yield put(addAreaManagerSuccess(response.data));
      toast.success(
        response.data.message || "Area Manager added successfully!"
      );
    } else {
      yield put(
        addAreaManagerFailure(response.message || "Failed to add Area Manager")
      );
      toast.error(response.message || "Failed to add Area Manager");
    }
  } catch (error) {
    yield put(addAreaManagerFailure(error.message || "Network error occurred"));
    toast.error(
      error.message || "An error occurred while adding the Area Manager."
    );
  }
}

// Update Area Manager Status Saga
function* updateAreaManagerStatusSaga(action) {
  const { managerId, status } = action.payload;
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${AREA_MANAGER_URL}/${managerId}/status`,
      { status }
    );

    if (response.status === 200) {
      yield put(updateAreaManagerStatusSuccess(managerId, status));
      toast.success(response.data.message || "Status updated successfully!");
    } else {
      yield put(
        updateAreaManagerStatusFailure(
          response.message || "Failed to update status"
        )
      );
      toast.error(response.message || "Failed to update status");
    }
  } catch (error) {
    yield put(
      updateAreaManagerStatusFailure(
        error.message || "An error occurred while updating the status."
      )
    );
    toast.error(
      error.message || "An error occurred while updating the status."
    );
  }
}

// Update Area Manager Content Saga
function* updateAreaManagerSaga(action) {
  const { updatedData } = action.payload;
  try {
    const response = yield call(
      putRequest,
      `${BASE_URL}${UPDATE_MANAGER_DETAILS_URL}`,
      updatedData
    );

    if (response.status === 200) {
      yield put(updateAreaManagerSuccess(response.data));
      toast.success(
        response.data.message || "Area Manager updated successfully!"
      );
    } else {
      yield put(
        updateAreaManagerFailure(
          response.message || "Failed to update Area Manager"
        )
      );
      toast.error(response.message || "Failed to update Area Manager");
    }
  } catch (error) {
    yield put(
      updateAreaManagerFailure(
        error.message || "An error occurred while updating the Area Manager."
      )
    );
    toast.error(
      error.message || "An error occurred while updating the Area Manager."
    );
  }
}

// Watcher Saga
export default function* watchAreaManagerSaga() {
  yield takeLatest(FETCH_AREA_MANAGERS_REQUEST, fetchAreaManagersSaga);
  yield takeLatest(
    FETCH_AREA_MANAGER_DETAILS_REQUEST,
    fetchAreaManagerDetailsSaga
  );

  yield takeLatest(ADD_AREA_MANAGER_REQUEST, addAreaManagerSaga);
  yield takeLatest(
    UPDATE_AREA_MANAGER_STATUS_REQUEST,
    updateAreaManagerStatusSaga
  );
  yield takeLatest(UPDATE_AREA_MANAGER_REQUEST, updateAreaManagerSaga);
}
