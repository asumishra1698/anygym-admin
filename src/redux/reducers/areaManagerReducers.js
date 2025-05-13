import {
  FETCH_AREA_MANAGERS_REQUEST,
  FETCH_AREA_MANAGERS_SUCCESS,
  FETCH_AREA_MANAGERS_FAILURE,
  FETCH_AREA_MANAGER_DETAILS_REQUEST,
  FETCH_AREA_MANAGER_DETAILS_SUCCESS,
  FETCH_AREA_MANAGER_DETAILS_FAILURE,
  ADD_AREA_MANAGER_REQUEST,
  ADD_AREA_MANAGER_SUCCESS,
  ADD_AREA_MANAGER_FAILURE,
  UPDATE_AREA_MANAGER_REQUEST,
  UPDATE_AREA_MANAGER_SUCCESS,
  UPDATE_AREA_MANAGER_FAILURE,
  UPDATE_AREA_MANAGER_STATUS_REQUEST,
  UPDATE_AREA_MANAGER_STATUS_SUCCESS,
  UPDATE_AREA_MANAGER_STATUS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  areaManagers: [],
  currentPage: 1,
  perPage: 10,
  totalRecords: 0,
  error: null,
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

    case FETCH_AREA_MANAGER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AREA_MANAGER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        areaManagerDetails: action.payload,
      };
    case FETCH_AREA_MANAGER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Add Area Manager
    case ADD_AREA_MANAGER_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_AREA_MANAGER_SUCCESS:
      return { ...state, loading: false, error: null };

    case ADD_AREA_MANAGER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Area Manager
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

    // Update Area Manager Status
    case UPDATE_AREA_MANAGER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_AREA_MANAGER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        areaManagers: state.areaManagers.map((manager) =>
          manager._id === action.payload.managerId
            ? { ...manager, status: action.payload.status }
            : manager
        ),
        error: null,
      };

    case UPDATE_AREA_MANAGER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default areaManagerReducer;
