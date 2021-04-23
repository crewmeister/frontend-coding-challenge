import { ConfigActions } from '../model/config';
import { Absences, TodoAction, AbsenceListActions } from '../model/index';
import createReducer from './createReducer';

export const todoList = createReducer<Absences[]>([], {
    [AbsenceListActions.SET_ABSENCE](state: Absences[], action: TodoAction) {
        console.log('createReducercreateReducercreateReducer:', action.payload);
        state = <Absences[]>action.payload;
        return state;
    },
    [AbsenceListActions.ADD_ABSENCE](state: Absences[], action: TodoAction) {
        return [...state, action.payload];
    },
    [ConfigActions.PURGE_STATE](state: Absences[], action: TodoAction) {
        return [];
    },
});
