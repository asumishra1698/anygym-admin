import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAreaManagersSuccess,
  fetchAreaManagersFailure,
  addAreaManagerSuccess,
  addAreaManagerFailure,
} from "../actions/areaManagerActions";
import {
  FETCH_AREA_MANAGERS_REQUEST,
  ADD_AREA_MANAGER_REQUEST,
} from "../actions/actionTypes";
import { getRequest, postRequest } from "../../utils/apiHelper";
import { BASE_URL, AREA_MANAGER_URL } from "../../config";

// Fetch Area Managers Saga
function* fetchAreaManagersSaga() {
  try {
    const response = yield call(getRequest, `${BASE_URL}${AREA_MANAGER_URL}`);
    if (response.status === 200) {
      const records = response.data.records;
      if (Array.isArray(records)) {
        yield put(fetchAreaManagersSuccess(records));
      } else {
        console.error("Invalid response format: records is not an array");
        yield put(
          fetchAreaManagersFailure(
            "Invalid response format: records is not an array"
          )
        );
      }
    } else {
      console.error(
        "Failed to fetch area managers: Invalid status or response structure"
      );
      yield put(fetchAreaManagersFailure("Failed to fetch area managers"));
    }
  } catch (error) {
    console.error("Error in fetchAreaManagersSaga:", error);
    yield put(fetchAreaManagersFailure(error.message || "Network error"));
  }
}

// Add Area Manager Saga
function* addAreaManagerSaga(action) {
  try {
    // Construct FormData in the saga
    const formData = new FormData();
    Object.keys(action.payload).forEach((key) => {
      formData.append(key, action.payload[key]);
    });

    // Log the FormData for debugging
    console.log("FormData:", [...formData.entries()]);

    const response = yield call(
      postRequest,
      `${BASE_URL}${AREA_MANAGER_URL}`,
      formData,
      {
        "Content-Type": "multipart/form-data", // Ensure correct content type for FormData
      }
    );

    if (response.status === 200) {
      yield put(addAreaManagerSuccess(response.data));
      alert("Area Manager added successfully!");
    } else {
      const errors = response.data.errors || {};
      console.error("Validation Errors:", errors);
      yield put(addAreaManagerFailure(errors));
      alert("Failed to add area manager. Check the form fields.");
    }
  } catch (error) {
    console.error("Error in addAreaManagerSaga:", error);
    yield put(addAreaManagerFailure(error.message || "Network error"));
    alert("An error occurred while adding the area manager.");
  }
}

// Watcher Saga
export default function* watchAreaManagerSaga() {
  yield takeLatest(FETCH_AREA_MANAGERS_REQUEST, fetchAreaManagersSaga);
  yield takeLatest(ADD_AREA_MANAGER_REQUEST, addAreaManagerSaga);
}
