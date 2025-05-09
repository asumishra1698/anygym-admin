import {
    FETCH_GYMS_REQUEST,
    FETCH_GYMS_SUCCESS,
    FETCH_GYMS_FAILURE,
  } from "./actionTypes";
  
  export const fetchGymsRequest = (page = 1, perPage = 10) => ({
    type: FETCH_GYMS_REQUEST,
    payload: { page, perPage },
  });
  
  export const fetchGymsSuccess = (data) => ({
    type: FETCH_GYMS_SUCCESS,
    payload: data,
  });
  
  export const fetchGymsFailure = (error) => ({
    type: FETCH_GYMS_FAILURE,
    payload: error,
  });