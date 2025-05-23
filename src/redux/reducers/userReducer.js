// userReducer.js
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  users: [],
  currentPage: 1,
  perPage: 10,
  totalRecords: 0,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload || [],
        currentPage: action.payload.page,
        perPage: action.payload.per_page,
        totalRecords: action.payload.total_records,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
