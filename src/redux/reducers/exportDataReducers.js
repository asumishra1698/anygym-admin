import {
  EXPORT_OWNER_DATA_REQUEST,
  EXPORT_OWNER_DATA_SUCCESS,
  EXPORT_OWNER_DATA_FAILURE,
  EXPORT_GYM_DATA_REQUEST,
  EXPORT_GYM_DATA_SUCCESS,
  EXPORT_GYM_DATA_FAILURE,
  EXPORT_AM_DATA_REQUEST,
  EXPORT_AM_DATA_SUCCESS,
  EXPORT_AM_DATA_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const exportDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // Owner Data Export
    case EXPORT_OWNER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EXPORT_OWNER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case EXPORT_OWNER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Gym Data Export
    case EXPORT_GYM_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EXPORT_GYM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case EXPORT_GYM_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Area Manager Data Export
    case EXPORT_AM_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EXPORT_AM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case EXPORT_AM_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default exportDataReducer;