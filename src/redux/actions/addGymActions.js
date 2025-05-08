import {
  ADD_GYM_REQUEST,
  ADD_GYM_SUCCESS,
  ADD_GYM_FAILURE,
} from "../actions/actionTypes";

export const addGymRequest = (gymData) => ({
  type: ADD_GYM_REQUEST,
  payload: gymData,   
});

export const addGymSuccess = (data) => ({
  type: ADD_GYM_SUCCESS,
  payload: data,
});

export const addGymFailure = (error) => ({
  type: ADD_GYM_FAILURE,
  payload: error,
});
