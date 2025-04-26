import {
  ADD_AMENITY_REQUEST,
  ADD_AMENITY_SUCCESS,
  ADD_AMENITY_FAILURE,

  FETCH_AMENITIES_REQUEST,
  FETCH_AMENITIES_SUCCESS,
  FETCH_AMENITIES_FAILURE,

} from "./actionTypes";


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