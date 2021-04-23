// imports
import { History } from "history";
import { combineReducers } from "redux";
import { Todo } from "../model/index";
import * as todoReducer from "./todo";
export interface RootState {
    drawerOpen: boolean;
    todoList: Todo[];
}

export default (history: History) =>
    combineReducers({
        ...todoReducer,
    });
