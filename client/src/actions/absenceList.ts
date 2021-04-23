import { Todo, TodoAction, AbsenceListActions } from '../model/index';
import { RootState } from '../reducers/index';

export function createAbsenceListing(todo: Todo[]): TodoAction {
    return {
        type: AbsenceListActions.SET_ABSENCE,
        payload: todo,
    };
}

export function completeTodo(todoId: number) {
    return (dispatch: Function, getState: () => RootState) => {
        dispatch({ type: AbsenceListActions.COMPLETE_ABSENCE, payload: todoId });
    };
}
