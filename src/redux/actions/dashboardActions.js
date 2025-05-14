import {
  FETCH_DASHBOARD_METRICS_REQUEST,
  FETCH_DASHBOARD_METRICS_SUCCESS,
  FETCH_DASHBOARD_METRICS_FAILURE,
} from "./actionTypes";

export const fetchDashboardMetricsRequest = () => ({
  type: FETCH_DASHBOARD_METRICS_REQUEST,
});

export const fetchDashboardMetricsSuccess = (data) => ({
  type: FETCH_DASHBOARD_METRICS_SUCCESS,
  payload: { data },
});

export const fetchDashboardMetricsFailure = (error) => ({
  type: FETCH_DASHBOARD_METRICS_FAILURE,
  payload: error,
});