import {
  FETCH_AREA_MANAGERS_REQUEST,
  FETCH_AREA_MANAGERS_SUCCESS,
  FETCH_AREA_MANAGERS_FAILURE,
  ADD_AREA_MANAGER_REQUEST,
  ADD_AREA_MANAGER_SUCCESS,
  ADD_AREA_MANAGER_FAILURE,
  UPDATE_AREA_MANAGER_REQUEST,
  UPDATE_AREA_MANAGER_SUCCESS,
  UPDATE_AREA_MANAGER_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  areaManagers: [], // List of area managers (records)
  currentPage: 1, // Current page number
  perPage: 10, // Number of records per page
  totalRecords: 0, // Total number of records
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
        areaManagers: action.payload.records,
        currentPage: action.payload.page, 
        perPage: action.payload.per_page, 
        totalRecords: action.payload.total_records, 
        error: null,
      };

    case FETCH_AREA_MANAGERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_AREA_MANAGER_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_AREA_MANAGER_SUCCESS:
      return { ...state, loading: false, error: null };

    case ADD_AREA_MANAGER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_AREA_MANAGER_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_AREA_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        areaManagers: state.areaManagers.map((manager) =>
          manager._id === action.payload._id ? action.payload : manager
        ),
        error: null,
      };

    case UPDATE_AREA_MANAGER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default areaManagerReducer;