import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pendingGymReducer from "./pendingGymReducer";
import approvedGymReducer from "./approvedGymReducers";
import rejectedGymReducer from "./rejectedGymReducer";
import amenityReducer from "./amenitiesReducers";
import areaManagerReducer from "./areaManagerReducers";
import gymOwnerReducer from "./gymOwnerReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  pendingGyms: pendingGymReducer,
  approvedGyms: approvedGymReducer,
  rejectedGyms: rejectedGymReducer,
  amenity: amenityReducer,
  areaManager: areaManagerReducer,
  gymOwner: gymOwnerReducer,
});

export default rootReducer;
