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
  UPDATE_STATUS_OWNER_URL, // Corrected typo
} from "../../config";
import { toast } from "react-toastify";

// Fetch Gym Owners Saga
function* fetchGymOwnersSaga(action) {
  const { currentPage, limit, searchQuery } = action.payload;
  const userType = localStorage.getItem("userType");

  try {
    // Determine the API endpoint based on the user type
    const endpoint =
      userType === "ADMIN"
        ? `${BASE_URL}${GYM_OWNER_URL}?page=${currentPage}&limit=${limit}&search=${searchQuery}`
        : userType === "AREA_MANAGER"
        ? `${BASE_URL}${GYM_OWNER_BY_AREA_MANAGER_URL}?page=${currentPage}&limit=${limit}&search=${searchQuery}`
        : null;

    if (!endpoint) {
      throw new Error("Invalid user type specified");
    }

    const response = yield call(getRequest, endpoint);

    if (response.status === 200) {
      const { data, total_records } = response;
      if (data && Array.isArray(data)) {
        yield put(
          fetchGymOwnersSuccess({
            records: data,
            currentPage,
            limit: limit,
            total_records: total_records || data.length,
          })
        );
      } else {
        yield put(
          fetchGymOwnersFailure(
            "Invalid response format: 'data' is not an array"
          )
        );
      }
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
      `${BASE_URL}${UPDATE_STATUS_OWNER_URL}`, // Corrected typo
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
