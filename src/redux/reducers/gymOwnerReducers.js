import {
  FETCH_GYM_OWNERS_REQUEST,
  FETCH_GYM_OWNERS_SUCCESS,
  FETCH_GYM_OWNERS_FAILURE,
  ADD_GYM_OWNER_REQUEST,
  ADD_GYM_OWNER_SUCCESS,
  ADD_GYM_OWNER_FAILURE,
  // UPDATE_GYM_OWNER_REQUEST,
  // UPDATE_GYM_OWNER_SUCCESS,
  // UPDATE_GYM_OWNER_FAILURE,
  // DELETE_GYM_OWNER_REQUEST,
  // DELETE_GYM_OWNER_SUCCESS,
  // DELETE_GYM_OWNER_FAILURE,
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

    // Update Gym Owner
    // case UPDATE_GYM_OWNER_REQUEST:
    //   return { ...state, loading: true, error: null };

    // case UPDATE_GYM_OWNER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     gymOwners: state.gymOwners.map((owner) =>
    //       owner.id === action.payload.id ? action.payload : owner
    //     ),
    //     error: null,
    //   };

    // case UPDATE_GYM_OWNER_FAILURE:
    //   return { ...state, loading: false, error: action.payload };

    // Delete Gym Owner
    // case DELETE_GYM_OWNER_REQUEST:
    //   return { ...state, loading: true, error: null };

    // case DELETE_GYM_OWNER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     gymOwners: state.gymOwners.filter(
    //       (owner) => owner.id !== action.payload
    //     ),
    //     totalRecords: state.totalRecords - 1,
    //     error: null,
    //   };

    // case DELETE_GYM_OWNER_FAILURE:
    //   return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default gymOwnerReducer;
