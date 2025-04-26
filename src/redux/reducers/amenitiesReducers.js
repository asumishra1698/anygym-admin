import {
  ADD_AMENITY_REQUEST,
  ADD_AMENITY_SUCCESS,
  ADD_AMENITY_FAILURE,
  FETCH_AMENITIES_REQUEST,
  FETCH_AMENITIES_SUCCESS,
  FETCH_AMENITIES_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  amenities: [],
  amenity: null,
  error: null,
};

const amenityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AMENITY_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_AMENITY_SUCCESS:
      return { ...state, loading: false, amenity: action.payload };
    case ADD_AMENITY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_AMENITIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_AMENITIES_SUCCESS:
      return { ...state, loading: false, amenities: action.payload };
    case FETCH_AMENITIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default amenityReducer;
