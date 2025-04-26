import {
  FETCH_AREA_MANAGERS_REQUEST,
  FETCH_AREA_MANAGERS_SUCCESS,
  FETCH_AREA_MANAGERS_FAILURE,
  ADD_AREA_MANAGER_REQUEST,
  ADD_AREA_MANAGER_SUCCESS,
  ADD_AREA_MANAGER_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  areaManagers: [], // List of area managers
  error: null, // Error message
};

const areaManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AREA_MANAGERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_AREA_MANAGERS_SUCCESS:
      return {
        ...state,
        loading: false,
        areaManagers: action.payload,
        error: null,
      };
    case FETCH_AREA_MANAGERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_AREA_MANAGER_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_AREA_MANAGER_SUCCESS:
      return { ...state, loading: false, error: null }; // Optionally update state with the new manager
    case ADD_AREA_MANAGER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default areaManagerReducer;
