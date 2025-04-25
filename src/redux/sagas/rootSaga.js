// import { all } from "redux-saga/effects";
// import watchAuthSaga from "./authSaga";
// import watchGymSaga from "./gymSaga";

// export default function* rootSaga() {  
//   yield all([watchAuthSaga()]);
//   yield all([watchGymSaga()]);
// }

import { all } from "redux-saga/effects";
import watchAuthSaga from "./authSaga";
import watchGymSaga from "./gymSaga";

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchGymSaga(),
  ]);
}