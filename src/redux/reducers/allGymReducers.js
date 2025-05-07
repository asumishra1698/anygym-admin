import {
  FETCH_GYMS_REQUEST,
  FETCH_GYMS_SUCCESS,
  FETCH_GYMS_FAILURE,
  UPDATE_GYM_STATUS_REQUEST,
  UPDATE_GYM_STATUS_SUCCESS,
  UPDATE_GYM_STATUS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  gyms: [],
  totalRecords: 0,
  error: null,
};

const gymReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Gyms
    case FETCH_GYMS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_GYMS_SUCCESS:
      return {
        ...state,
        loading: false,
        gyms: action.payload.records,
        totalRecords: action.payload.total_records,
        error: null,
      };

    case FETCH_GYMS_FAILURE:
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

export default gymReducer;
