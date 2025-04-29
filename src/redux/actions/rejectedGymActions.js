import {
  FETCH_REJECTED_GYMS_REQUEST,
  FETCH_REJECTED_GYMS_SUCCESS,
  FETCH_REJECTED_GYMS_FAILURE,
} from "./actionTypes";

// Fetch Rejected Gyms
export const fetchRejectedGymsRequest = () => ({
  type: FETCH_REJECTED_GYMS_REQUEST,
});

export const fetchRejectedGymsSuccess = (gyms) => ({
  type: FETCH_REJECTED_GYMS_SUCCESS,
  payload: gyms,
});

export const fetchRejectedGymsFailure = (error) => ({
  type: FETCH_REJECTED_GYMS_FAILURE,
  payload: error,
});
