export interface Todo {
    id: string;
    crewId?: string;
    name?: string;
    userId?: string;
    admitterId: string;
    admitterNote: string;
    confirmedAt: string;
    createdAt: string;
    endDate: string;
    memberNote: string;
    rejectedAt: string;
    startDate: string;
    type: string;
}

export interface Members {
    crewId: string;
    id?: string;
    image?: string;
    name?: string;
    userId?: string;
}

export enum AbsenceListActions {
    ADD_ABSENCE = "ADD_ABSENCE",
    SET_ABSENCE = "SET_ABSENCE",
    DELETE_ABSENCE = "DELETE_ABSENCE",
    COMPLETE_ABSENCE = "COMPLETE_ABSENCE",
    UNCOMPLETE_ABSENCE = "UNCOMPLETE_ABSENCE",
}

export enum MembersListActions {
    ADD_MEMBERS = "ADD_MEMBERS",
    SET_MEMBERS = "SET_MEMBERS",
}
interface TodoActionType<T, P> {
    type: T;
    payload: P;
}
export type MembersAction =
    | TodoActionType<typeof MembersListActions.SET_MEMBERS, Todo[]>
    | TodoActionType<typeof MembersListActions.ADD_MEMBERS, Todo>;

export type TodoAction =
    | TodoActionType<typeof AbsenceListActions.SET_ABSENCE, Todo[]>
    | TodoActionType<typeof AbsenceListActions.ADD_ABSENCE, Todo>
    | TodoActionType<typeof AbsenceListActions.COMPLETE_ABSENCE, number>
    | TodoActionType<typeof AbsenceListActions.UNCOMPLETE_ABSENCE, number>
    | TodoActionType<typeof AbsenceListActions.DELETE_ABSENCE, number>;
