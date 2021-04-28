import { combineReducers } from "redux";

import absencesReducer from "../reducers/absences";

const rootReducer = combineReducers({
  absences: absencesReducer,
});

export default rootReducer;
