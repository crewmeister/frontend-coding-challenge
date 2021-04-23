import { ConfigActions } from '../model/config';
import { Members, MembersAction, MembersListActions } from '../model/index';
import createReducer from './createReducer';

export const membersList = createReducer<Members[]>([], {
    [MembersListActions.SET_MEMBERS](state: Members[], action: MembersAction) {
        state = <Members[]>action.payload;
        return state;
    },
    [MembersListActions.ADD_MEMBERS](state: Members[], action: MembersAction) {
        return [...state, action.payload];
    },
    [ConfigActions.PURGE_STATE](state: Members[], action: MembersAction) {
        return [];
    },
});
