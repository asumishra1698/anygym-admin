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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch Area Managers Saga
function* fetchAreaManagersSaga() {
  try {
    const response = yield call(getRequest, `${BASE_URL}${AREA_MANAGER_URL}`);
    if (response.status === 200) {
      const records = response.data.records;
      if (Array.isArray(records)) {
        yield put(fetchAreaManagersSuccess(records));
      } else {
        yield put(
          fetchAreaManagersFailure(
            "Invalid response format: records is not an array"
          )
        );
      }
    } else {
      yield put(fetchAreaManagersFailure("Failed to fetch area managers"));
    }
  } catch (error) {
    yield put(fetchAreaManagersFailure(error.message || "Network error"));
  }
}

// Add Area Manager Saga
function* addAreaManagerSaga(action) {
  try {
    const formData = new FormData();
    Object.keys(action.payload).forEach((key) => {
      formData.append(key, action.payload[key]);
    });
    const response = yield call(
      postRequest,
      `${BASE_URL}${AREA_MANAGER_URL}`,
      formData,
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
      const errors = response.data.errors || {};
      yield put(addAreaManagerFailure(errors));
      if (Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error(
          response.data.message ||
            "Failed to add area manager. Check the form fields."
        );
      }
    }
  } catch (error) {
    yield put(addAreaManagerFailure(error.message || "Network error"));
    toast.error(
      error.message || "An error occurred while adding the area manager."
    );
  }
}

export default function* watchAreaManagerSaga() {
  yield takeLatest(FETCH_AREA_MANAGERS_REQUEST, fetchAreaManagersSaga);
  yield takeLatest(ADD_AREA_MANAGER_REQUEST, addAreaManagerSaga);
}
