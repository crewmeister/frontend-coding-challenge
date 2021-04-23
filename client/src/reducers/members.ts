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
    [AbsenceListActions.COMPLETE_ABSENCE](state: Todo[], action: TodoAction) {
        // search after todo item with the given id and set completed to true
        return state.map(t => (t.id === action.payload ? { ...t, completed: true } : t));
    },
    [AbsenceListActions.UNCOMPLETE_ABSENCE](state: Todo[], action: TodoAction) {
        // search after todo item with the given id and set completed to false
        return state.map(t => (t.id === action.payload ? { ...t, completed: false } : t));
    },
    [AbsenceListActions.DELETE_ABSENCE](state: Todo[], action: TodoAction) {
        // remove all todos with the given id
        return state.filter(t => t.id !== action.payload);
    },
    [ConfigActions.PURGE_STATE](state: Todo[], action: TodoAction) {
        return [];
    },
});
