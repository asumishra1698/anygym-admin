import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_GYM_OWNERS_REQUEST } from "../actions/actionTypes";
import {
  fetchGymOwnersSuccess,
  fetchGymOwnersFailure,
} from "../actions/gymOwnerActions";
import { getRequest } from "../../utils/apiHelper";
import { BASE_URL, GYM_OWNER_URL } from "../../config";

function* fetchGymOwnersSaga(action) {
  const { page, perPage, searchQuery } = action.payload;
  try {
    const response = yield call(
      getRequest,
      `${BASE_URL}${GYM_OWNER_URL}?page=${page}&limit=${perPage}&search=${searchQuery}`
    );

    if (response.status === 200) {
      const { data } = response;
      if (data && Array.isArray(data)) {
        const totalRecords = data.length;
        const paginatedData = data.slice((page - 1) * perPage, page * perPage);

        yield put(
          fetchGymOwnersSuccess({
            records: paginatedData,
            page,
            per_page: perPage,
            total_records: totalRecords,
          })
        );
      } else {
        yield put(
          fetchGymOwnersFailure(
            "Invalid response format: 'data' is not an array"
          )
        );
      }
    } else {
      yield put(
        fetchGymOwnersFailure(response.message || "Failed to fetch gym owners")
      );
    }
  } catch (error) {
    yield put(fetchGymOwnersFailure(error.message || "Network error occurred"));
  }
}
export default function* gymOwnerSaga() {
  yield takeLatest(FETCH_GYM_OWNERS_REQUEST, fetchGymOwnersSaga);
}
