import {
  FETCH_GYM_OWNERS_REQUEST,
  FETCH_GYM_OWNERS_SUCCESS,
  FETCH_GYM_OWNERS_FAILURE,
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

    default:
      return state;
  }
};

export default gymOwnerReducer;
