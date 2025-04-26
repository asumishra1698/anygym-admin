import { call, put, takeLatest } from "redux-saga/effects";
import {
  addAmenitySuccess,
  addAmenityFailure,
  fetchAmenitiesSuccess,
  fetchAmenitiesFailure,
} from "../actions/amenityActions";
import {
  ADD_AMENITY_REQUEST,
  FETCH_AMENITIES_REQUEST,
} from "../actions/actionTypes";
import { getRequest, postRequest } from "../../utils/apiHelper";
import { BASE_URL, AMENTIY_URL } from "../../config";

// Add Amenity Saga
function* addAmenitySaga(action) {  
  try {    
    const response = yield call(
      postRequest,
      `${BASE_URL}${AMENTIY_URL}`,
      action.payload
    );
    if (response.status === 200) {
      yield put(addAmenitySuccess(response.data));
    } else {
      yield put(addAmenityFailure("Failed to add amenity"));
    }
  } catch (error) {
    yield put(addAmenityFailure(error.message || "Network error"));
  }
}

// Fetch Amenities Saga
function* fetchAmenitiesSaga() {
  try {
    console.log("Fetching amenities...");    
    const response = yield call(getRequest, `${BASE_URL}${AMENTIY_URL}`);
    if (response.status === 200) {
      yield put(fetchAmenitiesSuccess(response.data));
    } else {
      yield put(fetchAmenitiesFailure("Failed to fetch amenities"));
    }
  } catch (error) {
    yield put(fetchAmenitiesFailure(error.message || "Network error"));
  }
}

// Watcher Saga
export default function* watchAmenitySaga() {
  yield takeLatest(ADD_AMENITY_REQUEST, addAmenitySaga);
  yield takeLatest(FETCH_AMENITIES_REQUEST, fetchAmenitiesSaga);
}
