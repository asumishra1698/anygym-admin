import {
  UPLOAD_GALLERY_REQUEST,
  UPLOAD_GALLERY_SUCCESS,
  UPLOAD_GALLERY_FAILURE,
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
