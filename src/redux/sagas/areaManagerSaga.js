import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_AREA_MANAGERS_REQUEST,
  ADD_AREA_MANAGER_REQUEST,
  UPDATE_AREA_MANAGER_STATUS_REQUEST,
  UPDATE_AREA_MANAGER_REQUEST,
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

import { postRequest } from "../../utils/apiHelper";
import { BASE_URL, AREA_MANAGER_URL, ADD_AREA_MANAGER_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch Area Managers Saga with Pagination
function* fetchAreaManagersSaga(action) {
  const { page, perPage, searchQuery } = action.payload;
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${AREA_MANAGER_URL}?page=${page}&limit=${perPage}&search=${searchQuery}`
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
  const { managerId, updatedData } = action.payload;
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${AREA_MANAGER_URL}/${managerId}`,
      updatedData
    );

    if (response.status === 200) {
      yield put(updateAreaManagerSuccess(managerId, response.data));
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
  yield takeLatest(ADD_AREA_MANAGER_REQUEST, addAreaManagerSaga);
  yield takeLatest(
    UPDATE_AREA_MANAGER_STATUS_REQUEST,
    updateAreaManagerStatusSaga
  );
  yield takeLatest(UPDATE_AREA_MANAGER_REQUEST, updateAreaManagerSaga);
}
