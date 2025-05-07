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
  error: null,
};

const approvedGymReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Approved Gyms
    case FETCH_APPROVED_GYMS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_APPROVED_GYMS_SUCCESS:
      return { ...state, loading: false, gyms: action.payload, error: null };

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
