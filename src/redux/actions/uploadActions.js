import {
  UPLOAD_GALLERY_REQUEST,
  UPLOAD_GALLERY_SUCCESS,
  UPLOAD_GALLERY_FAILURE,
  DELETE_MEDIA_REQUEST,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_FAILURE,
} from "./actionTypes";

export const uploadGalleryRequest = (payload) => ({
  type: UPLOAD_GALLERY_REQUEST,
  payload,
});

export const uploadGallerySuccess = (imageUrl) => ({
  type: UPLOAD_GALLERY_SUCCESS,
  payload: imageUrl,
});

// Action for failed upload
export const uploadGalleryFailure = (error) => ({
  type: UPLOAD_GALLERY_FAILURE,
  payload: error,
});

export const deleteMediaRequest = (payload) => ({
  type: DELETE_MEDIA_REQUEST,
  payload,
});

export const deleteMediaSuccess = (message) => ({
  type: DELETE_MEDIA_SUCCESS,
  payload: message,
});

export const deleteMediaFailure = (error) => ({
  type: DELETE_MEDIA_FAILURE,
  payload: error,
});
