import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pendingGymReducer from "./pendingGymReducer";
import amenityReducer from "./amenitiesReducers";
import areaManagerReducer from "./areaManagerReducers";
import gymOwnerReducer from "./gymOwnerReducers";


const rootReducer = combineReducers({
  auth: authReducer,
  gym: pendingGymReducer,
  amenity: amenityReducer,
  areaManager: areaManagerReducer,
  gymOwner: gymOwnerReducer,
});

export default rootReducer;