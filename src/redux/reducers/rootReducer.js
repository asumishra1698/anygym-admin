import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pendingGymReducer from "./pendingGymReducer";
import amenityReducer from "./amenitiesReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  gym: pendingGymReducer,
  amenity: amenityReducer,
});

export default rootReducer;