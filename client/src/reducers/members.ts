import { ConfigActions } from '../model/config';
import { Members, TodoAction, AbsenceListActions } from '../model/index';
import createReducer from './createReducer';

export const todoList = createReducer<Members[]>([], {
    [AbsenceListActions.SET_ABSENCE](state: Members[], action: TodoAction) {
        console.log('createReducercreateReducercreateReducer:', action.payload);
        state = <Members[]>action.payload;
        return state;
    },
    [AbsenceListActions.ADD_ABSENCE](state: Members[], action: TodoAction) {
        return [...state, action.payload];
    },
    [ConfigActions.PURGE_STATE](state: Members[], action: TodoAction) {
        return [];
    },
});
