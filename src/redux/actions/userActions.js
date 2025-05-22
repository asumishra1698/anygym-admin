import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actionTypes";

export const fetchUsersRequest = ({
  page = 1,
  limit = 10,
  search = "",
} = {}) => ({
  type: FETCH_USERS_REQUEST,
  payload: { page, limit, search },
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
