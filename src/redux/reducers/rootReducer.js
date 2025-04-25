import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gymReducer from "./gymReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  gym: gymReducer,
});

export default rootReducer;