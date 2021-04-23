// imports
import { History } from "history";
import { combineReducers } from "redux";
import { Absences } from "../model/index";
import * as absenceReducer from "./absences";
import * as membersReducer from "./members";
export interface RootState {
    drawerOpen: boolean;
    todoList: Absences[];
}

export default (history: History) =>
    combineReducers({
        ...absenceReducer,
        ...membersReducer,
    });
