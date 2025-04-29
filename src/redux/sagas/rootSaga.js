import { all } from "redux-saga/effects";
import watchAuthSaga from "./authSaga";
import watchpendingGymSaga from "./pendingGymSaga";
import watchapprovedGymSaga from "./approvedGymSaga";
import watchAmenitySaga from "./amenitiesSaga";
import watchAreamanagerSaga from "./areaManagerSaga";
import watchgymOwnerSaga from "./gymOwnerSaga";

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchpendingGymSaga(),
    watchapprovedGymSaga(),
    watchAmenitySaga(),
    watchAreamanagerSaga(),
    watchgymOwnerSaga(),
  ]);
}
