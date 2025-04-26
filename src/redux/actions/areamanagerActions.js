import {
  FETCH_AREA_MANAGERS_REQUEST,
  FETCH_AREA_MANAGERS_SUCCESS,
  FETCH_AREA_MANAGERS_FAILURE,
  ADD_AREA_MANAGER_REQUEST,
  ADD_AREA_MANAGER_SUCCESS,
  ADD_AREA_MANAGER_FAILURE,
} from "./actionTypes";

// Fetch Area Managers Actions
export const fetchAreaManagersRequest = () => ({
  type: FETCH_AREA_MANAGERS_REQUEST,
});

export const fetchAreaManagersSuccess = (managers) => ({
  type: FETCH_AREA_MANAGERS_SUCCESS,
  payload: managers, // List of area managers
});

export const fetchAreaManagersFailure = (error) => ({
  type: FETCH_AREA_MANAGERS_FAILURE,
  payload: error, // Error message
});

// Add Area Manager Actions
export const addAreaManagerRequest = (managerData) => ({
  type: ADD_AREA_MANAGER_REQUEST,
  payload: managerData, // Data for the new area manager
});

export const addAreaManagerSuccess = (manager) => ({
  type: ADD_AREA_MANAGER_SUCCESS,
  payload: manager, // Newly added area manager
});

export const addAreaManagerFailure = (error) => ({
  type: ADD_AREA_MANAGER_FAILURE,
  payload: error, // Error message
});
