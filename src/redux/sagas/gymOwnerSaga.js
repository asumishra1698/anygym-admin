import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_GYM_OWNERS_REQUEST,
  ADD_GYM_OWNER_REQUEST,
  UPDATE_GYM_OWNER_STATUS_REQUEST,
} from "../actions/actionTypes";
import {
  fetchGymOwnersSuccess,
  fetchGymOwnersFailure,
  addGymOwnerSuccess,
  addGymOwnerFailure,
  updateGymOwnerStatusSuccess,
  updateGymOwnerStatusFailure,
} from "../actions/gymOwnerActions";
import { getRequest, postRequest } from "../../utils/apiHelper";
import {
  BASE_URL,
  GYM_OWNER_URL,
  GYM_OWNER_BY_AREA_MANAGER_URL,
  ADD_GYM_OWNER_URL,
  UPDATE_STATUS_OWNER_URL,
} from "../../config";
import { toast } from "react-toastify";

// Fetch Gym Owners Saga
function* fetchGymOwnersSaga(action) {
  // Use correct keys: page, limit, search
  const { page = 1, limit = 10, search = "" } = action.payload || {};
  const userType = localStorage.getItem("userType");

  try {
    const endpoint =
      userType === "ADMIN" || userType === "SUB_ADMIN"
        ? `${BASE_URL}${GYM_OWNER_URL}?page=${encodeURIComponent(
            page
          )}&limit=${encodeURIComponent(limit)}&search=${encodeURIComponent(
            search
          )}`
        : userType === "AREA_MANAGER"
        ? `${BASE_URL}${GYM_OWNER_BY_AREA_MANAGER_URL}?page=${encodeURIComponent(
            page
          )}&limit=${encodeURIComponent(limit)}&search=${encodeURIComponent(
            search
          )}`
        : null;

    if (!endpoint) {
      throw new Error("Invalid user type specified");
    }

    const response = yield call(getRequest, endpoint);

    if (response.status === 200 && response.data) {
      // response.data is the object with page, per_page, total_records, records
      yield put(fetchGymOwnersSuccess(response.data));
    } else {
      yield put(
        fetchGymOwnersFailure(response.message || "Failed to fetch gym owners")
      );
    }
  } catch (error) {
    yield put(fetchGymOwnersFailure(error.message || "Network error occurred"));
    toast.error(error.message || "Failed to fetch gym owners.");
  }
}

// Add Gym Owner Saga
function* addGymOwnerSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${ADD_GYM_OWNER_URL}`,
      action.payload
    );

    if (response.status === 200) {
      yield put(addGymOwnerSuccess(response.data));
      toast.success(response.data.message || "Gym owner added successfully!");
    } else {
      yield put(
        addGymOwnerFailure(response.message || "Failed to add gym owner")
      );
      toast.error(response.message || "Failed to add gym owner");
    }
  } catch (error) {
    yield put(addGymOwnerFailure(error.message || "Network error occurred"));
    toast.error(
      error.message || "An error occurred while adding the gym owner."
    );
  }
}

// Update Gym Owner Status Saga
function* updateGymOwnerStatusSaga(action) {
  const { ownerId, status } = action.payload;

  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${UPDATE_STATUS_OWNER_URL}`,
      { ownerId, status }
    );

    if (response.status === 200) {
      yield put(updateGymOwnerStatusSuccess(response.data));
      toast.success(
        response.data.message || "Gym owner status updated successfully!"
      );
    } else {
      yield put(
        updateGymOwnerStatusFailure(
          response.message || "Failed to update gym owner status"
        )
      );
      toast.error(response.message || "Failed to update gym owner status");
    }
  } catch (error) {
    yield put(
      updateGymOwnerStatusFailure(error.message || "Network error occurred")
    );
    toast.error(
      error.message || "An error occurred while updating the gym owner status."
    );
  }
}

// Watcher Saga
export default function* gymOwnerSaga() {
  yield takeLatest(FETCH_GYM_OWNERS_REQUEST, fetchGymOwnersSaga);
  yield takeLatest(ADD_GYM_OWNER_REQUEST, addGymOwnerSaga);
  yield takeLatest(UPDATE_GYM_OWNER_STATUS_REQUEST, updateGymOwnerStatusSaga);
}
