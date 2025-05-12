import { takeLatest, call, put } from "redux-saga/effects";
import {
  UPLOAD_GALLERY_REQUEST,
  UPLOAD_GALLERY_SUCCESS,
  UPLOAD_GALLERY_FAILURE,
  DELETE_MEDIA_REQUEST,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_FAILURE,
} from "../actions/actionTypes";
import { postRequest } from "../../utils/apiHelper";
import { BASE_URL, UPLOAD_MEDIA_URL, DELETE_MEDIA_URL } from "../../config";

function* uploadGallerySaga(action) {
  try {
    const { formData } = action.payload;

    const response = yield call(
      postRequest,
      `${BASE_URL}${UPLOAD_MEDIA_URL}`,
      formData
    );

    yield put({
      type: UPLOAD_GALLERY_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error("uploadGallerySaga error:", error);

    yield put({
      type: UPLOAD_GALLERY_FAILURE,
      payload: error.response?.data?.message || "Gallery upload failed",
    });
  }
}

function* deleteMediaSaga(action) {
  try {
    const { gymId, galleryType, fileUrl } = action.payload;

    // Send a POST request with gym_id, gallery_type, and file_url in the body
    const response = yield call(postRequest, `${BASE_URL}${DELETE_MEDIA_URL}`, {
      gym_id: gymId,
      gallery_type: galleryType,
      file_url: fileUrl,
    });

    yield put({
      type: DELETE_MEDIA_SUCCESS,
      payload: {
        galleryType,
        fileUrl,
        message: response.data.message || "Media deleted successfully",
      },
    });
  } catch (error) {
    console.error("deleteMediaSaga error:", error);

    yield put({
      type: DELETE_MEDIA_FAILURE,
      payload: error.response?.data?.message || "Failed to delete media",
    });
  }
}

export default function* watchUploadGallery() {
  yield takeLatest(UPLOAD_GALLERY_REQUEST, uploadGallerySaga);
  yield takeLatest(DELETE_MEDIA_REQUEST, deleteMediaSaga);
}
