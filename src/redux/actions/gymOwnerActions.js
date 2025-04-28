import {
  FETCH_GYM_OWNERS_REQUEST,
  FETCH_GYM_OWNERS_SUCCESS,
  FETCH_GYM_OWNERS_FAILURE,
} from "./actionTypes";

// Fetch Gym Owners Actions
export const fetchGymOwnersRequest = (
  page = 1,
  perPage = 10,
  searchQuery = ""
) => ({
  type: FETCH_GYM_OWNERS_REQUEST,
  payload: { page, perPage, searchQuery },
});

export const fetchGymOwnersSuccess = (data) => ({
  type: FETCH_GYM_OWNERS_SUCCESS,
  payload: data, 
});

export const fetchGymOwnersFailure = (error) => ({
  type: FETCH_GYM_OWNERS_FAILURE,
  payload: error, // Error message or object
});
