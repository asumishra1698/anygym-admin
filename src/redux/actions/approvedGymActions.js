import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
} from "./actionTypes";

// Action to dispatch when fetching approved gyms starts
export const fetchApprovedGymsRequest = () => {
  return {
    type: FETCH_APPROVED_GYMS_REQUEST,
  };
};

// Action to dispatch when fetching approved gyms succeeds
export const fetchApprovedGymsSuccess = (gyms) => ({
  type: FETCH_APPROVED_GYMS_SUCCESS,
  payload: gyms,
});

// Action to dispatch when fetching approved gyms fails
export const fetchApprovedGymsFailure = (error) => ({
  type: FETCH_APPROVED_GYMS_FAILURE,
  payload: error,
});
