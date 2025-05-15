import {
  FETCH_GYMS_REQUEST,
  FETCH_GYMS_SUCCESS,
  FETCH_GYMS_FAILURE,
  FETCH_GYM_BY_ID_REQUEST,
  FETCH_GYM_BY_ID_SUCCESS,
  FETCH_GYM_BY_ID_FAILURE,
} from "./actionTypes";

export const fetchGymsRequest = (page = 1, limit = 10) => ({
  type: FETCH_GYMS_REQUEST,
  payload: { page, limit },
});

export const fetchGymsSuccess = (data) => ({
  type: FETCH_GYMS_SUCCESS,
  payload: data,
});

export const fetchGymsFailure = (error) => ({
  type: FETCH_GYMS_FAILURE,
  payload: error,
});

// Add fetchGymById actions
export const fetchGymByIdRequest = (gymId) => ({
  type: FETCH_GYM_BY_ID_REQUEST,
  payload: gymId,
});

export const fetchGymByIdSuccess = (gym) => ({
  type: FETCH_GYM_BY_ID_SUCCESS,
  payload: gym,
});

export const fetchGymByIdFailure = (error) => ({
  type: FETCH_GYM_BY_ID_FAILURE,
  payload: error,
});
