import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
  UPDATE_GYM_STATUS_REQUEST,
  UPDATE_GYM_STATUS_SUCCESS,
  UPDATE_GYM_STATUS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  gyms: [],
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 1,
  error: null,
};

const approvedGymReducer = (state = initialState, action) => {
  switch (action.type) {    
    case FETCH_APPROVED_GYMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_APPROVED_GYMS_SUCCESS: {
      const payload = action.payload.data
        ? action.payload.data
        : action.payload;
      return {
        ...state,
        loading: false,
        gyms: Array.isArray(payload.gyms) ? payload.gyms : [],
        total: payload.total || 0,
        page: payload.page || 1,
        limit: payload.limit || 12,
        totalPages: payload.totalPages || 1,
        error: null,
      };
    }
    case FETCH_APPROVED_GYMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Gym Status
    case UPDATE_GYM_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_GYM_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        gyms: state.gyms.map((gym) =>
          gym._id === action.payload.gymId
            ? { ...gym, status: action.payload.status }
            : gym
        ),
        error: null,
      };

    case UPDATE_GYM_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default approvedGymReducer;
