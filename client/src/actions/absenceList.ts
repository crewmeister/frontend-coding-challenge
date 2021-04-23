import { Absences, AbsenceAction, AbsenceListActions, Filter } from '../model/index';
import { RootState } from '../reducers/index';

export function createAbsenceListing(absences: Absences[]): AbsenceAction {
    return {
        type: AbsenceListActions.SET_ABSENCE,
        payload: absences,
    };
}

export function filterAbsenceListing(absencesFilterObject: Filter): AbsenceAction {
    return {
        type: AbsenceListActions.FILTER_ABSENCE,
        payload: absencesFilterObject,
    };
}

export function completeTodo(todoId: number) {
    return (dispatch: Function, getState: () => RootState) => {
        dispatch({ type: AbsenceListActions.COMPLETE_ABSENCE, payload: todoId });
    };
}
