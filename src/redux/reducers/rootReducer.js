import { combineReducers } from "redux";
import authReducer from "./authReducers";
import allGymReducer from "./allGymReducers";
import pendingGymReducer from "./pendingGymReducers";
import approvedGymReducer from "./approvedGymReducers";
import amenityReducer from "./amenitiesReducers";
import areaManagerReducer from "./areaManagerReducers";
import gymOwnerReducer from "./gymOwnerReducers";
import addGymReducer from "./addGymReducers";
import uploadGalleryReducer from "./uploadReducers";
import dashboardReducer from "./dashboardReducers";
import gymReducer from "./allGymReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  allGyms: allGymReducer,
  pendingGyms: pendingGymReducer,
  approvedGyms: approvedGymReducer,
  amenity: amenityReducer,
  areaManager: areaManagerReducer,
  gymOwner: gymOwnerReducer,
  addGym: addGymReducer,
  uploadGallery: uploadGalleryReducer,
  dashboard: dashboardReducer,
  gymDetails: gymReducer,
});

export default rootReducer;
