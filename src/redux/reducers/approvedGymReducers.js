import {
  FETCH_APPROVED_GYMS_REQUEST,
  FETCH_APPROVED_GYMS_SUCCESS,
  FETCH_APPROVED_GYMS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  gyms: [],
  error: null,
};

const approvedGymReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPROVED_GYMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_APPROVED_GYMS_SUCCESS:
      return {
        ...state,
        loading: false,
        gyms: action.payload,
        error: null,
      };

    case FETCH_APPROVED_GYMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default approvedGymReducer;
