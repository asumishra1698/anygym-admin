import {
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false, 
  data: null, 
  error: null, 
};

const exportDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EXPORT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case EXPORT_DATA_FAILURE:
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