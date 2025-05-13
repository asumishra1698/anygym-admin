import {
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAILURE,
} from "./actionTypes";

export const exportDataRequest = (filters) => ({
  type: EXPORT_DATA_REQUEST,
  payload: filters,
});

export const exportDataSuccess = (data) => ({
  type: EXPORT_DATA_SUCCESS,
  payload: data,
});

export const exportDataFailure = (error) => ({
  type: EXPORT_DATA_FAILURE,
  payload: error,
});
