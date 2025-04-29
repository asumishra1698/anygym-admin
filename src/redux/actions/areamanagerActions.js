import {
  FETCH_AREA_MANAGERS_REQUEST,
  FETCH_AREA_MANAGERS_SUCCESS,
  FETCH_AREA_MANAGERS_FAILURE,
  ADD_AREA_MANAGER_REQUEST,
  ADD_AREA_MANAGER_SUCCESS,
  ADD_AREA_MANAGER_FAILURE,
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
