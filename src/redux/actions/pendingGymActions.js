import {
  FETCH_PENDING_GYMS_REQUEST,
  FETCH_PENDING_GYMS_SUCCESS,
  FETCH_PENDING_GYMS_FAILURE,
  APPROVE_GYM_REQUEST,
  APPROVE_GYM_SUCCESS,
  APPROVE_GYM_FAILURE,
  REJECT_GYM_REQUEST,
  REJECT_GYM_SUCCESS,
  REJECT_GYM_FAILURE,
} from "./actionTypes";

// Fetch Pending Gyms
export const fetchPendingGymsRequest = () => ({
  type: FETCH_PENDING_GYMS_REQUEST,
});

export const fetchPendingGymsSuccess = (gyms) => ({
  type: FETCH_PENDING_GYMS_SUCCESS,
  payload: gyms,
});

export const fetchPendingGymsFailure = (error) => ({
  type: FETCH_PENDING_GYMS_FAILURE,
  payload: error,
});

// Approve or Reject Gym Request
export const updateGymStatusRequest = (gymId, status) => ({
  type: status === "Approved" ? APPROVE_GYM_REQUEST : REJECT_GYM_REQUEST,
  payload: { gymId, status },
});

export const updateGymStatusSuccess = (gymId, status) => ({
  type: status === "Approved" ? APPROVE_GYM_SUCCESS : REJECT_GYM_SUCCESS,
  payload: { gymId, status },
});

export const updateGymStatusFailure = (error, status) => ({
  type: status === "Approved" ? APPROVE_GYM_FAILURE : REJECT_GYM_FAILURE,
  payload: error,
});
