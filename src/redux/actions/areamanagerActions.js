import {
  FETCH_AREA_MANAGERS_REQUEST,
  FETCH_AREA_MANAGERS_SUCCESS,
  FETCH_AREA_MANAGERS_FAILURE,
  FETCH_AREA_MANAGER_DETAILS_REQUEST,
  FETCH_AREA_MANAGER_DETAILS_SUCCESS,
  FETCH_AREA_MANAGER_DETAILS_FAILURE,
  ADD_AREA_MANAGER_REQUEST,
  ADD_AREA_MANAGER_SUCCESS,
  ADD_AREA_MANAGER_FAILURE,
  UPDATE_AREA_MANAGER_STATUS_REQUEST,
  UPDATE_AREA_MANAGER_STATUS_SUCCESS,
  UPDATE_AREA_MANAGER_STATUS_FAILURE,
  UPDATE_AREA_MANAGER_REQUEST,
  UPDATE_AREA_MANAGER_SUCCESS,
  UPDATE_AREA_MANAGER_FAILURE,
} from "./actionTypes";

// Fetch Area Managers Actions
export const fetchAreaManagersRequest = (
  page = 1,
  perPage = 10,
  searchQuery = ""
) => ({
  type: FETCH_AREA_MANAGERS_REQUEST,
  payload: { page, perPage, searchQuery },
});

export const fetchAreaManagersSuccess = (managers) => ({
  type: FETCH_AREA_MANAGERS_SUCCESS,
  payload: managers,
});

export const fetchAreaManagersFailure = (error) => ({
  type: FETCH_AREA_MANAGERS_FAILURE,
  payload: error,
});

// Add Area Manager Actions
export const addAreaManagerRequest = (managerData) => ({
  type: ADD_AREA_MANAGER_REQUEST,
  payload: managerData,
});

export const addAreaManagerSuccess = (manager) => ({
  type: ADD_AREA_MANAGER_SUCCESS,
  payload: manager,
});

export const addAreaManagerFailure = (error) => ({
  type: ADD_AREA_MANAGER_FAILURE,
  payload: error,
});

// Fetch Area Manager Details Actions
export const fetchAreaManagerDetailsRequest = (managerId) => ({
  type: FETCH_AREA_MANAGER_DETAILS_REQUEST,
  payload: managerId,
});

export const fetchAreaManagerDetailsSuccess = (managerDetails) => ({
  type: FETCH_AREA_MANAGER_DETAILS_SUCCESS,
  payload: managerDetails,
});

export const fetchAreaManagerDetailsFailure = (error) => ({
  type: FETCH_AREA_MANAGER_DETAILS_FAILURE,
  payload: error,
});

// Update Area Manager Status Actions
export const updateAreaManagerStatusRequest = (managerId, status) => ({
  type: UPDATE_AREA_MANAGER_STATUS_REQUEST,
  payload: { managerId, status },
});

export const updateAreaManagerStatusSuccess = (managerId, status) => ({
  type: UPDATE_AREA_MANAGER_STATUS_SUCCESS,
  payload: { managerId, status },
});

export const updateAreaManagerStatusFailure = (error) => ({
  type: UPDATE_AREA_MANAGER_STATUS_FAILURE,
  payload: error,
});

// Update Area Manager Content Actions
export const updateAreaManagerRequest = (managerId, updatedData) => ({
  type: UPDATE_AREA_MANAGER_REQUEST,
  payload: { managerId, updatedData },
});

export const updateAreaManagerSuccess = (managerId, updatedManager) => ({
  type: UPDATE_AREA_MANAGER_SUCCESS,
  payload: { managerId, updatedManager },
});

export const updateAreaManagerFailure = (error) => ({
  type: UPDATE_AREA_MANAGER_FAILURE,
  payload: error,
});
