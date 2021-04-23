import { Absences, TodoAction, AbsenceListActions } from '../model/index';
import { RootState } from '../reducers/index';

export function createAbsenceListing(absences: Absences[]): TodoAction {
    return {
        type: AbsenceListActions.SET_ABSENCE,
        payload: absences,
    };
}

export function completeTodo(todoId: number) {
    return (dispatch: Function, getState: () => RootState) => {
        dispatch({ type: AbsenceListActions.COMPLETE_ABSENCE, payload: todoId });
    };
}
