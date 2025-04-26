import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pendingGymReducer from "./pendingGymReducer";
import amenityReducer from "./amenitiesReducers";
import areaManagerReducer from "./areaManagerReducers";


const rootReducer = combineReducers({
  auth: authReducer,
  gym: pendingGymReducer,
  amenity: amenityReducer,
  areaManager: areaManagerReducer,
});

export default rootReducer;