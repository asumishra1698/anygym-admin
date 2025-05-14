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
const EXPORT_OWNER_URL = "/owner/export-owners";

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

    if (!(responseData instanceof Blob)) {
      let errorText = "";
      if (responseData && typeof responseData.text === "function") {
        errorText = yield call([responseData, "text"]);
      } else if (typeof responseData === "object") {
        errorText = JSON.stringify(responseData);
      } else {
        errorText = String(responseData);
      }
      toast.error("Export failed: " + errorText);
      yield put({
        type: failureType,
        payload: errorText,
      });
      return;
    }

    const blob = responseData;
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    yield put({ type: successType });
    toast.success("Data exported successfully!");
  } catch (error) {
    console.error("Export Data Error:", error);

    yield put({
      type: failureType,
      payload: error.message || "Network error occurred",
    });
    toast.error(error.message || "An error occurred while exporting data.");
  }
}

function* exportAMDataSaga(action) {
  yield handleExportData(
    action,
    EXPORT_AM_URL,
    EXPORT_AM_DATA_SUCCESS,
    EXPORT_AM_DATA_FAILURE,
    "exported_area_managers.xlsx"
  );
}

function* exportGymDataSaga(action) {
  yield handleExportData(
    action,
    EXPORT_GYM_URL,
    EXPORT_GYM_DATA_SUCCESS,
    EXPORT_GYM_DATA_FAILURE,
    "exported_gyms.xlsx"
  );
}

function* exportOwnerDataSaga(action) {
  yield handleExportData(
    action,
    EXPORT_OWNER_URL,
    EXPORT_OWNER_DATA_SUCCESS,
    EXPORT_OWNER_DATA_FAILURE,
    "exported_owners.xlsx"
  );
}

export default function* watchExportData() {
  yield takeLatest(EXPORT_AM_DATA_REQUEST, exportAMDataSaga);
  yield takeLatest(EXPORT_GYM_DATA_REQUEST, exportGymDataSaga);
  yield takeLatest(EXPORT_OWNER_DATA_REQUEST, exportOwnerDataSaga);
}
