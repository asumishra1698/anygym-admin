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
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  gyms: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  error: null,
};

const pendingGymReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PENDING_GYMS_REQUEST:
      return {
        ...state,
        loading: false,
        gyms: Array.isArray(action.payload.gyms) ? action.payload.gyms : [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        limit: action.payload.limit || 10,
        totalPages: action.payload.totalPages || 1,
        error: null,
      };

    case FETCH_PENDING_GYMS_SUCCESS:
      return { ...state, loading: false, gyms: action.payload };

    case FETCH_PENDING_GYMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case APPROVE_GYM_REQUEST:
    case REJECT_GYM_REQUEST:
      return { ...state, loading: true };

    case APPROVE_GYM_SUCCESS:
      return {
        ...state,
        loading: false,
        gyms: state.gyms.filter((gym) => gym._id !== action.payload._id), // Remove approved gym by _id
      };

    case REJECT_GYM_SUCCESS:
      return {
        ...state,
        loading: false,
        gyms: state.gyms.filter((gym) => gym._id !== action.payload._id), // Remove rejected gym by _id
      };

    case APPROVE_GYM_FAILURE:
    case REJECT_GYM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default pendingGymReducer;
