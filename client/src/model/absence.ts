export interface Todo {
    id: number;
    crewId?: string;
    text?: string;
    image?: string;
    name?: string;
    userId?: string;
    completed: boolean;
}

export enum AbsenceListActions {
    ADD_ABSENCE = "ADD_ABSENCE",
    SET_ABSENCE = "SET_ABSENCE",
    DELETE_ABSENCE = "DELETE_ABSENCE",
    COMPLETE_ABSENCE = "COMPLETE_ABSENCE",
    UNCOMPLETE_ABSENCE = "UNCOMPLETE_ABSENCE",
}

interface TodoActionType<T, P> {
    type: T;
    payload: P;
}

export type TodoAction =
    | TodoActionType<typeof AbsenceListActions.SET_ABSENCE, Todo[]>
    | TodoActionType<typeof AbsenceListActions.ADD_ABSENCE, Todo>
    | TodoActionType<typeof AbsenceListActions.COMPLETE_ABSENCE, number>
    | TodoActionType<typeof AbsenceListActions.UNCOMPLETE_ABSENCE, number>
    | TodoActionType<typeof AbsenceListActions.DELETE_ABSENCE, number>
    ;
