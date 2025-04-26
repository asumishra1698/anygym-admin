import {
  FETCH_PENDING_GYMS_REQUEST,
  FETCH_PENDING_GYMS_SUCCESS,
  FETCH_PENDING_GYMS_FAILURE,
} from "./actionTypes";

export const fetchPendingGymsRequest = () => {
  return {
    type: FETCH_PENDING_GYMS_REQUEST,
  };
};


export const fetchPendingGymsSuccess = (gyms) => ({
  type: FETCH_PENDING_GYMS_SUCCESS,
  payload: gyms,
});

export const fetchPendingGymsFailure = (error) => ({
  type: FETCH_PENDING_GYMS_FAILURE,
  payload: error,
});