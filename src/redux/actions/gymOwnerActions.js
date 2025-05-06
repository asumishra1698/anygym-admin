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
} from "./actionTypes";

// Fetch Gym Owners Actions
export const fetchGymOwnersRequest = (
  page = 1,
  perPage = 10,
  searchQuery = ""
) => ({
  type: FETCH_GYM_OWNERS_REQUEST,
  payload: { page, perPage, searchQuery },
});

export const fetchGymOwnersSuccess = (data) => ({
  type: FETCH_GYM_OWNERS_SUCCESS,
  payload: data,
});

export const fetchGymOwnersFailure = (error) => ({
  type: FETCH_GYM_OWNERS_FAILURE,
  payload: error,
});

// Add Gym Owner Actions
export const addGymOwnerRequest = (newOwner) => ({
  type: ADD_GYM_OWNER_REQUEST,
  payload: newOwner,
});

export const addGymOwnerSuccess = (addedOwner) => ({
  type: ADD_GYM_OWNER_SUCCESS,
  payload: addedOwner,
});

export const addGymOwnerFailure = (error) => ({
  type: ADD_GYM_OWNER_FAILURE,
  payload: error,
});

// Update Gym Owner Actions
// export const updateGymOwnerRequest = (id, updatedData) => ({
//   type: UPDATE_GYM_OWNER_REQUEST,
//   payload: { id, updatedData },
// });

// export const updateGymOwnerSuccess = (updatedOwner) => ({
//   type: UPDATE_GYM_OWNER_SUCCESS,
//   payload: updatedOwner,
// });

// export const updateGymOwnerFailure = (error) => ({
//   type: UPDATE_GYM_OWNER_FAILURE,
//   payload: error,
// });

// Delete Gym Owner Actions
// export const deleteGymOwnerRequest = (id) => ({
//   type: DELETE_GYM_OWNER_REQUEST,
//   payload: id,
// });

// export const deleteGymOwnerSuccess = (id) => ({
//   type: DELETE_GYM_OWNER_SUCCESS,
//   payload: id,
// });

// export const deleteGymOwnerFailure = (error) => ({
//   type: DELETE_GYM_OWNER_FAILURE,
//   payload: error,
// });