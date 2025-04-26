import { all } from "redux-saga/effects";
import watchAuthSaga from "./authSaga";
import watchpendingGymSaga from "./pendingGymSaga";
import watchAmenitySaga from "./amenitiesSaga";
import watchAreamanagerSaga from "./areaManagerSaga";


export default function* rootSaga() {
  yield all([
    watchAuthSaga(), 
    watchpendingGymSaga(),
    watchAmenitySaga(),
    watchAreamanagerSaga(),
  ]);
}
