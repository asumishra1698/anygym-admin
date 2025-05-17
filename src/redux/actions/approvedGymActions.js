import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
  UPDATE_GYM_STATUS_REQUEST,
  UPDATE_GYM_STATUS_SUCCESS,
  UPDATE_GYM_STATUS_FAILURE,
} from "./actionTypes";

export const fetchApprovedGymsRequest = ({
  page = 1,
  limit = 12,
  search = "",
} = {}) => ({
  type: FETCH_APPROVED_GYMS_REQUEST,
  payload: { page, limit, search },
});

export const fetchApprovedGymsSuccess = (gyms) => ({
  type: FETCH_APPROVED_GYMS_SUCCESS,
  payload: gyms,
});

export const fetchApprovedGymsFailure = (error) => ({
  type: FETCH_APPROVED_GYMS_FAILURE,
  payload: error,
});

export const updateGymStatusRequest = (gymId, status) => ({
  type: UPDATE_GYM_STATUS_REQUEST,
  payload: { gymId, status },
});

export const updateGymStatusSuccess = (gymId, updatedStatus) => ({
  type: UPDATE_GYM_STATUS_SUCCESS,
  payload: { gymId, updatedStatus },
});

export const updateGymStatusFailure = (error) => ({
  type: UPDATE_GYM_STATUS_FAILURE,
  payload: error,
});
