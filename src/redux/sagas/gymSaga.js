import { call, put, takeLeading } from "redux-saga/effects";
import {
  fetchPendingGymsSuccess,
  fetchPendingGymsFailure,
} from "../actions/gymActions";
import { BASE_URL, GYM_REQUEST_URL } from "../../config";
import { getRequest } from "../../utils/apiHelper";
import * as actionTypes from "../actions/actionTypes";

function* fetchPendingGymsSaga() {
  try {
    const response = yield call(getRequest, `${BASE_URL}${GYM_REQUEST_URL}`);    
    if (response.status === 200) {
      yield put(fetchPendingGymsSuccess(response.data));
    } else {
      yield put(fetchPendingGymsFailure("Failed to fetch pending gyms"));
    }
  } catch (error) {    
    yield put(fetchPendingGymsFailure(error.message || "Network error"));
  }
}

export default function* watchGymSaga() {
  yield takeLeading(
    actionTypes.FETCH_PENDING_GYMS_REQUEST,
    fetchPendingGymsSaga
  );
}