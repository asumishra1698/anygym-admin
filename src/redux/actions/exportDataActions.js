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
} from "./actionTypes";

// Export Owner Data Actions
export const exportOwnerDataRequest = (filters) => ({
  type: EXPORT_OWNER_DATA_REQUEST,
  payload: filters,
});

export const exportOwnerDataSuccess = (data) => ({
  type: EXPORT_OWNER_DATA_SUCCESS,
  payload: data,
});

export const exportOwnerDataFailure = (error) => ({
  type: EXPORT_OWNER_DATA_FAILURE,
  payload: error,
});

// Export Gym Data Actions
export const exportGymDataRequest = (filters) => ({
  type: EXPORT_GYM_DATA_REQUEST,
  payload: filters,
});

export const exportGymDataSuccess = (data) => ({
  type: EXPORT_GYM_DATA_SUCCESS,
  payload: data,
});

export const exportGymDataFailure = (error) => ({
  type: EXPORT_GYM_DATA_FAILURE,
  payload: error,
});

// Export Area Manager Data Actions
export const exportAMDataRequest = (filters) => ({
  type: EXPORT_AM_DATA_REQUEST,
  payload: filters,
});

export const exportAMDataSuccess = (data) => ({
  type: EXPORT_AM_DATA_SUCCESS,
  payload: data,
});

export const exportAMDataFailure = (error) => ({
  type: EXPORT_AM_DATA_FAILURE,
  payload: error,
});