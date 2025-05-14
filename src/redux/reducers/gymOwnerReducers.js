import {
  FETCH_GYM_OWNERS_REQUEST,
  FETCH_GYM_OWNERS_SUCCESS,
  FETCH_GYM_OWNERS_FAILURE,
  ADD_GYM_OWNER_REQUEST,
  ADD_GYM_OWNER_SUCCESS,
  ADD_GYM_OWNER_FAILURE,
  UPDATE_GYM_OWNER_STATUS_REQUEST,
  UPDATE_GYM_OWNER_STATUS_SUCCESS,
  UPDATE_GYM_OWNER_STATUS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: {
    records: [],
    page: 1,
    per_page: 10,
    total_records: 0,
  },
  error: null,
};

const gymOwnerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Gym Owners
    case FETCH_GYM_OWNERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_GYM_OWNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload, // { records, page, per_page, total_records }
        error: null,
      };

    case FETCH_GYM_OWNERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Add Gym Owner
    case ADD_GYM_OWNER_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_GYM_OWNER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          records: [...state.data.records, action.payload],
          total_records: state.data.total_records + 1,
        },
        error: null,
      };

    case ADD_GYM_OWNER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Gym Owner Status
    case UPDATE_GYM_OWNER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_GYM_OWNER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          records: state.data.records.map((owner) =>
            owner._id === action.payload._id ? action.payload : owner
          ),
        },
        error: null,
      };

    case UPDATE_GYM_OWNER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default gymOwnerReducer;
