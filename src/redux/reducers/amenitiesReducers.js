import {
  ADD_AMENITY_REQUEST,
  ADD_AMENITY_SUCCESS,
  ADD_AMENITY_FAILURE,
  FETCH_AMENITIES_REQUEST,
  FETCH_AMENITIES_SUCCESS,
  FETCH_AMENITIES_FAILURE,
  UPDATE_AMENITY_REQUEST,
  UPDATE_AMENITY_SUCCESS,
  UPDATE_AMENITY_FAILURE,
  DELETE_AMENITY_REQUEST,
  DELETE_AMENITY_SUCCESS,
  DELETE_AMENITY_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  amenities: [],
  amenity: null,
  error: null,
};

const amenityReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add Amenity
    case ADD_AMENITY_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_AMENITY_SUCCESS:
      return { ...state, loading: false, amenity: action.payload };
    case ADD_AMENITY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Fetch Amenities
    case FETCH_AMENITIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_AMENITIES_SUCCESS:
      return { ...state, loading: false, amenities: action.payload };
    case FETCH_AMENITIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Amenity
    case UPDATE_AMENITY_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_AMENITY_SUCCESS:
      return {
        ...state,
        loading: false,
        amenities: state.amenities.map((amenity) =>
          amenity._id === action.payload._id ? action.payload : amenity
        ),
        error: null,
      };
    case UPDATE_AMENITY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete Amenity
    case DELETE_AMENITY_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_AMENITY_SUCCESS:
      return {
        ...state,
        loading: false,
        amenities: state.amenities.filter(
          (amenity) => amenity._id !== action.payload
        ),
        error: null,
      };
    case DELETE_AMENITY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default amenityReducer;
