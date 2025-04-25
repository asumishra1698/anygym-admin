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
  console.log("Gym Reducer - Action received:", action); // 👈 Debug log

  switch (action.type) {
    case FETCH_PENDING_GYMS_REQUEST:
      console.log("Handling FETCH_PENDING_GYMS_REQUEST");
      return { ...state, loading: true, error: null };

    case FETCH_PENDING_GYMS_SUCCESS:
      console.log("Handling FETCH_PENDING_GYMS_SUCCESS", action.payload);
      return { ...state, loading: false, gyms: action.payload };

    case FETCH_PENDING_GYMS_FAILURE:
      console.log("Handling FETCH_PENDING_GYMS_FAILURE", action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};


export default gymReducer;
