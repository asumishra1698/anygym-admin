import {
  UPLOAD_GALLERY_REQUEST,
  UPLOAD_GALLERY_SUCCESS,
  UPLOAD_GALLERY_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  success: false,
  error: null,
  gallery: {
    gym_front_gallery: [],
    gym_video: [],
    service_gallery: [],
  },
  message: null,
};

const uploadGalleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_GALLERY_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
        message: null,
      };

    case UPLOAD_GALLERY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        gallery: {
          gym_front_gallery: action.payload.gym_front_gallery || [],
          gym_video: action.payload.gym_video || [],
          service_gallery: action.payload.service_gallery || [],
        },
        message: action.payload.message || "Gallery updated successfully",
      };

    case UPLOAD_GALLERY_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default uploadGalleryReducer;
