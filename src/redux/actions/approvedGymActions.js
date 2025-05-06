import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
  UPDATE_GYM_STATUS_REQUEST,
  UPDATE_GYM_STATUS_SUCCESS,
  UPDATE_GYM_STATUS_FAILURE,
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

// Action to dispatch when updating gym status starts
export const updateGymStatusRequest = (gymId, status) => ({
  type: UPDATE_GYM_STATUS_REQUEST,
  payload: { gymId, status },
});

// Action to dispatch when updating gym status succeeds
export const updateGymStatusSuccess = (gymId, updatedStatus) => ({
  type: UPDATE_GYM_STATUS_SUCCESS,
  payload: { gymId, updatedStatus },
});

// Action to dispatch when updating gym status fails
export const updateGymStatusFailure = (error) => ({
  type: UPDATE_GYM_STATUS_FAILURE,
  payload: error,
});