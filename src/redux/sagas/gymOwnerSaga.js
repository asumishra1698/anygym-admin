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
} from "../../config";
import { toast } from "react-toastify";

function* fetchGymOwnersSaga(action) {
  const { page, perPage, searchQuery } = action.payload; // Extract other payload properties
  const userType = localStorage.getItem("userType"); 
  try {
    // Determine the API endpoint based on the user_type
    const endpoint =
      userType === "ADMIN"
        ? `${BASE_URL}${GYM_OWNER_URL}?page=${page}&limit=${perPage}&search=${searchQuery}`
        : userType === "AREA_MANAGER"
        ? `${BASE_URL}${GYM_OWNER_BY_AREA_MANAGER_URL}?page=${page}&limit=${perPage}&search=${searchQuery}`
        : null;

    if (!endpoint) {
      throw new Error("Invalid user_type specified");
    }

    const response = yield call(getRequest, endpoint);

    if (response.status === 200) {
      const { data } = response;
      if (data && Array.isArray(data)) {
        const totalRecords = data.length;
        const paginatedData = data.slice((page - 1) * perPage, page * perPage);

        yield put(
          fetchGymOwnersSuccess({
            records: paginatedData,
            page,
            per_page: perPage,
            total_records: totalRecords,
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
  }
}

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

function* updateGymOwnerStatusSaga(action) {
  const { gymOwnerId, status } = action.payload;
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${GYM_OWNER_URL}/${gymOwnerId}/status`,
      { status }
    );

    if (response.status === 200) {
      yield put(updateGymOwnerStatusSuccess(gymOwnerId, status));
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
