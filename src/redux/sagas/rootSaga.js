import { all } from "redux-saga/effects";
import watchAuthSaga from "./authSaga";
import watchpendingGymSaga from "./pendingGymSaga";
import watchapprovedGymSaga from "./approvedGymSaga";
import watchAmenitySaga from "./amenitiesSaga";
import watchAreamanagerSaga from "./areaManagerSaga";
import watchgymOwnerSaga from "./gymOwnerSaga";
import watchallGymSaga from "./allGymSaga";
import watchaddGymSaga from "./addGymSaga";
import watchUploadGallery from "./uploadSaga";
import watchExportData from "./exportDataSaga";
import dashboardSaga from "./dashboardSaga"; 
import userSaga from "./userSaga"; 


export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchallGymSaga(),
    watchpendingGymSaga(),
    watchapprovedGymSaga(),
    watchAmenitySaga(),
    watchAreamanagerSaga(),
    watchgymOwnerSaga(),
    watchaddGymSaga(),
    watchUploadGallery(),
    watchExportData(),
    dashboardSaga(),
    userSaga(),
  ]);
}
