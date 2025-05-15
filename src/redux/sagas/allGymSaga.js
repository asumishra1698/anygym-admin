import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_GYMS_REQUEST,
  FETCH_GYM_BY_ID_REQUEST,
} from "../actions/actionTypes";
import {
  fetchGymsSuccess,
  fetchGymsFailure,
  fetchGymByIdSuccess,
  fetchGymByIdFailure,
} from "../actions/allGymActions";
import { getRequest } from "../../utils/apiHelper";
import { BASE_URL, GYM_URL, GYM_BY_ID_URL } from "../../config";

// Fetch all gyms
function* fetchGymsSaga(action) {
  try {
    const { page, limit } = action.payload;

    const response = yield call(getRequest, `${BASE_URL}${GYM_URL}`, {
      page,
      limit: limit,
    });

    if (response.status === 200) {
      yield put(fetchGymsSuccess(response.data));
    } else {
      yield put(fetchGymsFailure(response.message || "Failed to fetch gyms"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong!";
    yield put(fetchGymsFailure(errorMessage));
  }
}

// Fetch single gym by ID
function* fetchGymByIdSaga(action) {
  try {
    const gymId = action.payload;
    const response = yield call(
      getRequest,
      `${BASE_URL}${GYM_BY_ID_URL}/${gymId}`
    );

    if (response.status === 200) {
      yield put(fetchGymByIdSuccess(response.data));
    } else {
      yield put(
        fetchGymByIdFailure(response.message || "Failed to fetch gym details")
      );
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong!";
    yield put(fetchGymByIdFailure(errorMessage));
  }
}

export default function* watchGymSaga() {
  yield takeLatest(FETCH_GYMS_REQUEST, fetchGymsSaga);
  yield takeLatest(FETCH_GYM_BY_ID_REQUEST, fetchGymByIdSaga);
}
