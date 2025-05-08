import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_GYM_REQUEST } from "../actions/actionTypes";
import { addGymSuccess, addGymFailure } from "../actions/addGymActions";
import { postRequest } from "../../utils/apiHelper";
import { BASE_URL, ADD_GYM_URL } from "../../config";

function* addGymSaga(action) { 
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${ADD_GYM_URL}`,
      action.payload
    );

    if (response) {
      yield put(addGymSuccess(response));
    } else {
      throw new Error("Failed to add gym");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    yield put(addGymFailure(errorMessage));
  }
}

export default function* watchGymSaga() {
  yield takeLatest(ADD_GYM_REQUEST, addGymSaga);
}
