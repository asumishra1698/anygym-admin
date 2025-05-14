import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_DASHBOARD_METRICS_REQUEST } from "../actions/actionTypes";
import {
  fetchDashboardMetricsSuccess,
  fetchDashboardMetricsFailure,
} from "../actions/dashboardActions";
import { getRequest } from "../../utils/apiHelper";
import { BASE_URL, ADMIN_DASHBOARD_URL } from "../../config";

function* fetchDashboardMetricsSaga() {
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${ADMIN_DASHBOARD_URL}`
    );
    // API response: { status, message, data }
    yield put(fetchDashboardMetricsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchDashboardMetricsFailure(
        error.message || "Failed to fetch dashboard metrics"
      )
    );
  }
}

export default function* dashboardSaga() {
  yield takeLatest(FETCH_DASHBOARD_METRICS_REQUEST, fetchDashboardMetricsSaga);
}
