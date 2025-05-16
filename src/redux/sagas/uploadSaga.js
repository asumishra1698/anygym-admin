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
import { fetchGymsRequest } from "../actions/allGymActions";
import { fetchApprovedGymsRequest } from "../actions/approvedGymActions";
import { fetchPendingGymsRequest } from "../actions/pendingGymActions";
import { toast } from "react-toastify";

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

    toast.success("Gallery uploaded successfully!");
    yield put(fetchGymsRequest());
    yield put(fetchApprovedGymsRequest());
    yield put(fetchPendingGymsRequest());
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
    const { gymId, type, fileUrl } = action.payload;
    const response = yield call(postRequest, `${BASE_URL}${DELETE_MEDIA_URL}`, {
      gym_id: gymId,
      type: type,
      file_url: fileUrl,
    });

    yield put({
      type: DELETE_MEDIA_SUCCESS,
      payload: {
        type,
        fileUrl,
        message: response.data.message || "Media deleted successfully",
      },
    });

    yield put(fetchGymsRequest());
    yield put(fetchApprovedGymsRequest());
    yield put(fetchPendingGymsRequest());
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
