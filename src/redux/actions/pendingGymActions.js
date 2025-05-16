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
export const fetchPendingGymsRequest = ({
  page = 1,
  limit = 10,
  search = "",
} = {}) => ({
  type: FETCH_PENDING_GYMS_REQUEST,
  payload: { page, limit, search },
});

export const fetchPendingGymsSuccess = (gyms) => ({
  type: FETCH_PENDING_GYMS_SUCCESS,
  payload: gyms,
});

export const fetchPendingGymsFailure = (error) => ({
  type: FETCH_PENDING_GYMS_FAILURE,
  payload: error,
});

// Approve Gym Actions
export const approveGymRequest = (gymId) => ({
  type: APPROVE_GYM_REQUEST,
  payload: gymId,
});

export const approveGymSuccess = (gym) => ({
  type: APPROVE_GYM_SUCCESS,
  payload: gym, // should be the approved gym object or at least its _id
});

export const approveGymFailure = (error) => ({
  type: APPROVE_GYM_FAILURE,
  payload: error,
});

// Reject Gym Actions
export const rejectGymRequest = ({ gymId, message }) => ({
  type: REJECT_GYM_REQUEST,
  payload: { gymId, message },
});

export const rejectGymSuccess = (gym) => ({
  type: REJECT_GYM_SUCCESS,
  payload: gym, // should be the rejected gym object or at least its _id
});

export const rejectGymFailure = (error) => ({
  type: REJECT_GYM_FAILURE,
  payload: error,
});
