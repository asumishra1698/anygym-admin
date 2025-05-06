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
    case FETCH_APPROVED_GYMS_REQUEST:
      return { ...state, loading: true };

    case FETCH_APPROVED_GYMS_SUCCESS:
      return { ...state, loading: false, gyms: action.payload };

    case FETCH_APPROVED_GYMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_GYM_STATUS_REQUEST:
      return { ...state, loading: true };

    case UPDATE_GYM_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        gyms: state.gyms.map((gym) =>
          gym.id === action.payload.gymId
            ? { ...gym, status: action.payload.updatedStatus }
            : gym
        ),
      };

    case UPDATE_GYM_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default approvedGymReducer;
