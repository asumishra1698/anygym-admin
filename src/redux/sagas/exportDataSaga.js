import { call, put, takeLatest } from "redux-saga/effects";
import {
  EXPORT_OWNER_DATA_REQUEST,
  EXPORT_OWNER_DATA_SUCCESS,
  EXPORT_OWNER_DATA_FAILURE,
  EXPORT_GYM_DATA_REQUEST,
  EXPORT_GYM_DATA_SUCCESS,
  EXPORT_GYM_DATA_FAILURE,
  EXPORT_AM_DATA_REQUEST,
  EXPORT_AM_DATA_SUCCESS,
  EXPORT_AM_DATA_FAILURE,
} from "../actions/actionTypes";
import { getRequest } from "../../utils/apiHelper";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

// API Endpoints
const EXPORT_AM_URL = "/admin/export-excel";
const EXPORT_GYM_URL = "/admin/gyms/download-excel";
const EXPORT_OWNER_URL = "/admin/owners/download-excel";

// Generic function to handle export data
function* handleExportData(action, url, successType, failureType, fileName) {
  try {
    const responseData = yield call(
      getRequest,
      `${BASE_URL}${url}`,
      action.payload,
      {
        responseType: "blob",
      }
    );

    // Create a Blob from the response data
    const blob = new Blob([responseData], {
      type: "application/vnd.ms-excel",
    });

    // Create a download link and trigger the download
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Dispatch success action
    yield put({ type: successType });
    toast.success("Data exported successfully!");
  } catch (error) {
    console.error("Export Data Error:", error);

    // Dispatch failure action
    yield put({
      type: failureType,
      payload: error.message || "Network error occurred",
    });
    toast.error(error.message || "An error occurred while exporting data.");
  }
}

// Export Area Manager Data Saga
function* exportAMDataSaga(action) {
  yield handleExportData(
    action,
    EXPORT_AM_URL,
    EXPORT_AM_DATA_SUCCESS,
    EXPORT_AM_DATA_FAILURE,
    "exported_area_managers.xlsx"
  );
}

// Export Gym Data Saga
function* exportGymDataSaga(action) {
  yield handleExportData(
    action,
    EXPORT_GYM_URL,
    EXPORT_GYM_DATA_SUCCESS,
    EXPORT_GYM_DATA_FAILURE,
    "exported_gyms.xlsx"
  );
}

// Export Owner Data Saga
function* exportOwnerDataSaga(action) {
  yield handleExportData(
    action,
    EXPORT_OWNER_URL,
    EXPORT_OWNER_DATA_SUCCESS,
    EXPORT_OWNER_DATA_FAILURE,
    "exported_owners.xlsx"
  );
}

// Watcher Saga
export default function* watchExportData() {
  yield takeLatest(EXPORT_AM_DATA_REQUEST, exportAMDataSaga);
  yield takeLatest(EXPORT_GYM_DATA_REQUEST, exportGymDataSaga);
  yield takeLatest(EXPORT_OWNER_DATA_REQUEST, exportOwnerDataSaga);
}
