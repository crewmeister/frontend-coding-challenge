import { ConfigActions } from '../model/config';
import { Absences, AbsenceAction, AbsenceListActions } from '../model/index';
import createReducer from './createReducer';

export const absenceList = createReducer<Absences[]>([], {
    [AbsenceListActions.SET_ABSENCE](state: Absences[], action: AbsenceAction) {
        state = <Absences[]>action.payload;
        return state;
    },
    [AbsenceListActions.FILTER_ABSENCE](state: Absences[], action: AbsenceAction) {
        const filter = Object.keys(action.payload)
        // console.log('action.payload:', action.payload);
        // console.log('FILTER_ABSENCEFILTER_ABSENCEFILTER_ABSENCE:', filter);

        // state = state.filter(item => {
        //     for (var key in filter) {
        //         if (item[key] === undefined || item[key] != filter[key])
        //             return false;
        //     }
        //     return true;
        // });
        return state;
    },
    [AbsenceListActions.ADD_ABSENCE](state: Absences[], action: AbsenceAction) {
        return [...state, action.payload];
    },
    [ConfigActions.PURGE_STATE](state: Absences[], action: AbsenceAction) {
        return [];
    },
});
