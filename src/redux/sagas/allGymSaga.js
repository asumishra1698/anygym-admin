import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_GYMS_REQUEST } from "../actions/actionTypes";
import { fetchGymsSuccess, fetchGymsFailure } from "../actions/allGymActions";
import { getRequest } from "../../utils/apiHelper";
import { BASE_URL, GYM_URL } from "../../config";

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

export default function* watchGymSaga() {
  yield takeLatest(FETCH_GYMS_REQUEST, fetchGymsSaga);
}
