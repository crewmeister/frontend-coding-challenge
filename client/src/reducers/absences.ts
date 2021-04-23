import { ConfigActions } from '../model/config';
import { Todo, TodoAction, AbsenceListActions } from '../model/index';
import createReducer from './createReducer';

export const todoList = createReducer<Todo[]>([], {
    [AbsenceListActions.SET_ABSENCE](state: Todo[], action: TodoAction) {
        console.log('createReducercreateReducercreateReducer:', action.payload);
        state = <Todo[]>action.payload;
        return state;
    },
    [AbsenceListActions.ADD_ABSENCE](state: Todo[], action: TodoAction) {
        return [...state, action.payload];
    },
    [ConfigActions.PURGE_STATE](state: Todo[], action: TodoAction) {
        return [];
    },
});
