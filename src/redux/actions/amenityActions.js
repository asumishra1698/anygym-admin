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
} from "./actionTypes";

// Add Amenity Actions
export const addAmenityRequest = (payload) => ({
  type: ADD_AMENITY_REQUEST,
  payload,
});

export const addAmenitySuccess = (data) => ({
  type: ADD_AMENITY_SUCCESS,
  payload: data,
});

export const addAmenityFailure = (error) => ({
  type: ADD_AMENITY_FAILURE,
  payload: error,
});

// Fetch Amenities Actions
export const fetchAmenitiesRequest = () => ({
  type: FETCH_AMENITIES_REQUEST,
});

export const fetchAmenitiesSuccess = (data) => ({
  type: FETCH_AMENITIES_SUCCESS,
  payload: data,
});

export const fetchAmenitiesFailure = (error) => ({
  type: FETCH_AMENITIES_FAILURE,
  payload: error,
});

// Update Amenity Actions
export const updateAmenityRequest = (payload) => ({
  type: UPDATE_AMENITY_REQUEST,
  payload,
});

export const updateAmenitySuccess = (data) => ({
  type: UPDATE_AMENITY_SUCCESS,
  payload: data,
});

export const updateAmenityFailure = (error) => ({
  type: UPDATE_AMENITY_FAILURE,
  payload: error,
});
