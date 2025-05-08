import { combineReducers } from "redux";
import authReducer from "./authReducers";
import allGymReducer from "./allGymReducers";
import pendingGymReducer from "./pendingGymReducers";
import approvedGymReducer from "./approvedGymReducers";
import rejectedGymReducer from "./rejectedGymReducers";
import amenityReducer from "./amenitiesReducers";
import areaManagerReducer from "./areaManagerReducers";
import gymOwnerReducer from "./gymOwnerReducers";
import addGymReducer from "./addGymReducers"; 


const rootReducer = combineReducers({
  auth: authReducer,
  allGyms: allGymReducer,
  pendingGyms: pendingGymReducer,
  approvedGyms: approvedGymReducer,
  rejectedGyms: rejectedGymReducer,
  amenity: amenityReducer,
  areaManager: areaManagerReducer,
  gymOwner: gymOwnerReducer,
  addGym: addGymReducer, 
});

export default rootReducer;
