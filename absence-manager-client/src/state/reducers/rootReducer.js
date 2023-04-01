import { combineReducers } from "redux";
import absenceReducer from "./absences";

const appReducer = combineReducers({
  absences: absenceReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
