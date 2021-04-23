import { ConfigActions } from '../model/config';
import { Members, MembersAction, AbsenceListActions } from '../model/index';
import createReducer from './createReducer';

export const todoList = createReducer<Members[]>([], {
    [AbsenceListActions.SET_ABSENCE](state: Members[], action: MembersAction) {
        console.log('createReducercreateReducercreateReducer:', action.payload);
        state = <Members[]>action.payload;
        return state;
    },
    [AbsenceListActions.ADD_ABSENCE](state: Members[], action: MembersAction) {
        return [...state, action.payload];
    },
    [ConfigActions.PURGE_STATE](state: Members[], action: MembersAction) {
        return [];
    },
});
