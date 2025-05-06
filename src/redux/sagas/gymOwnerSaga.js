import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_GYM_OWNERS_REQUEST,
  ADD_GYM_OWNER_REQUEST,
  // UPDATE_GYM_OWNER_REQUEST,
} from "../actions/actionTypes";
import {
  fetchGymOwnersSuccess,
  fetchGymOwnersFailure,
  addGymOwnerSuccess,
  addGymOwnerFailure,
  // updateGymOwnerSuccess,
  // updateGymOwnerFailure,
} from "../actions/gymOwnerActions";
import { getRequest, postRequest } from "../../utils/apiHelper";
import { BASE_URL, GYM_OWNER_URL, ADD_GYM_OWNER_URL } from "../../config";
import { toast } from "react-toastify";

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

// Add Gym Owner Saga
function* addGymOwnerSaga(action) {
  try {
    const response = yield call(
      postRequest,
      `${BASE_URL}${ADD_GYM_OWNER_URL}`,
      action.payload
    );

    if (response.status === 200) {
      yield put(addGymOwnerSuccess(response.data));
      toast.success(response.data.message || "Gym owner added successfully!");
    } else {
      yield put(
        addGymOwnerFailure(response.message || "Failed to add gym owner")
      );
      toast.error(response.message || "Failed to add gym owner");
    }
  } catch (error) {
    yield put(addGymOwnerFailure(error.message || "Network error occurred"));
    toast.error(
      error.message || "An error occurred while adding the gym owner."
    );
  }
}

// Update Gym Owner Saga
// function* updateGymOwnerSaga(action) {
//   const { id, updatedData } = action.payload;
//   try {
//     const response = yield call(
//       postRequest,
//       `${BASE_URL}${GYM_OWNER_URL}/${id}`,
//       updatedData
//     );

//     if (response.status === 200) {
//       yield put(updateGymOwnerSuccess(response.data));
//     } else {
//       yield put(
//         updateGymOwnerFailure(response.message || "Failed to update gym owner")
//       );
//     }
//   } catch (error) {
//     yield put(updateGymOwnerFailure(error.message || "Network error occurred"));
//   }
// }

// Watcher Saga
export default function* gymOwnerSaga() {
  yield takeLatest(FETCH_GYM_OWNERS_REQUEST, fetchGymOwnersSaga);
  yield takeLatest(ADD_GYM_OWNER_REQUEST, addGymOwnerSaga);
  // yield takeLatest(UPDATE_GYM_OWNER_REQUEST, updateGymOwnerSaga);
  // yield takeLatest(DELETE_GYM_OWNER_REQUEST, deleteGymOwnerSaga);
}
