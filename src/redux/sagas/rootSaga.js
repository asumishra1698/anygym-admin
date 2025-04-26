import { all } from "redux-saga/effects";
import watchAuthSaga from "./authSaga";
import watchpendingGymSaga from "./pendingGymSaga";
import watchAmenitySaga from "./amenitiesSaga";

export default function* rootSaga() {
  yield all([
    watchAuthSaga(), 
    watchpendingGymSaga(),
    watchAmenitySaga(),
  ]);
}
