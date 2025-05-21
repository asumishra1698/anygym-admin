import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actionTypes";

export const fetchUsersRequest = (params) => ({
  type: FETCH_USERS_REQUEST,
  payload: params,
});

export const fetchUsersSuccess = (data) => {  
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data,
  };
};

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});