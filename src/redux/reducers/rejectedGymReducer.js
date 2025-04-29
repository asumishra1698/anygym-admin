import {
  FETCH_REJECTED_GYMS_REQUEST,
  FETCH_REJECTED_GYMS_SUCCESS,
  FETCH_REJECTED_GYMS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  gyms: [],
  error: null,
};

const rejectedGymReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REJECTED_GYMS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_REJECTED_GYMS_SUCCESS:
      return { ...state, loading: false, gyms: action.payload };

    case FETCH_REJECTED_GYMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default rejectedGymReducer;
