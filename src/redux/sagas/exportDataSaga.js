import { call, put, takeLatest } from "redux-saga/effects";
import {
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAILURE,
} from "../actions/actionTypes";
import { getRequest } from "../../utils/apiHelper";
import { toast } from "react-toastify";
import { BASE_URL, EXPORT_OWNERS_URL } from "../../config";

function* exportDataSaga(action) {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${EXPORT_OWNERS_URL}`,
      action.payload,
      {
        responseType: "blob",
      }
    );
    console.log("Export Data Response:", response);
    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: "application/vnd.ms-excel",
      });
      debugger;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "exported_owners.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      debugger;
      yield put({
        type: EXPORT_DATA_SUCCESS,
      });
      debugger;
      toast.success("Data exported successfully!");
    } else {
      yield put({
        type: EXPORT_DATA_FAILURE,
        payload: response.message || "Failed to export data",
      });
      toast.error(response.message || "Failed to export data");
    }
  } catch (error) {
    yield put({
      type: EXPORT_DATA_FAILURE,
      payload: error.message || "Network error occurred",
    });
    toast.error(error.message || "An error occurred while exporting data.");
  }
}

export default function* watchExportData() {
  yield takeLatest(EXPORT_DATA_REQUEST, exportDataSaga);
}
