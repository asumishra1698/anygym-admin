import {
  FETCH_PENDING_GYMS_REQUEST,
  FETCH_PENDING_GYMS_SUCCESS,
  FETCH_PENDING_GYMS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  gyms: [],
  error: null,
};

const gymReducer = (state = initialState, action) => { 
  switch (action.type) {
    case FETCH_PENDING_GYMS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PENDING_GYMS_SUCCESS:      
      return { ...state, loading: false, gyms: action.payload };

    case FETCH_PENDING_GYMS_FAILURE:      
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};


export default gymReducer;
