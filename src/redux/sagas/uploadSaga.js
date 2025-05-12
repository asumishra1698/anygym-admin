import { takeLatest, call, put } from "redux-saga/effects";
import {
  UPLOAD_GALLERY_REQUEST,
  UPLOAD_GALLERY_SUCCESS,
  UPLOAD_GALLERY_FAILURE,
} from "../actions/actionTypes";
import { postRequest } from "../../utils/apiHelper";
import { BASE_URL, UPLOAD_GALLERY } from "../../config";

function* uploadGallerySaga(action) {
  try {
    const { formData, headers } = action.payload;

    const response = yield call(
      postRequest,
      `${BASE_URL}${UPLOAD_GALLERY}`,
      formData,
      headers
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

export default function* watchUploadGallery() {
  yield takeLatest(UPLOAD_GALLERY_REQUEST, uploadGallerySaga);
}
