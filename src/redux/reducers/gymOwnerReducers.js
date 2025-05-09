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
  gymOwners: [],
  currentPage: 1,
  perPage: 10,
  totalRecords: 0,
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
        gymOwners: action.payload.records,
        currentPage: action.payload.page,
        perPage: action.payload.per_page,
        totalRecords: action.payload.total_records,
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
        gymOwners: [...state.gymOwners, action.payload],
        totalRecords: state.totalRecords + 1,
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
        gymOwners: state.gymOwners.map((owner) =>
          owner._id === action.payload._id // Match the updated owner by ID
            ? action.payload // Replace the entire owner object with the updated one
            : owner
        ),
        error: null,
      };

    case UPDATE_GYM_OWNER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default gymOwnerReducer;