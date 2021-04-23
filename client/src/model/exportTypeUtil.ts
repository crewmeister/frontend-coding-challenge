interface TodoActionType<T, P> {
    type: T;
    payload: P;
}
export interface Absences {
    id: string;
    crewId?: string;
    name?: string;
    userId: string;
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

export enum AbsenceListActions {
    ADD_ABSENCE = "ADD_ABSENCE",
    SET_ABSENCE = "SET_ABSENCE",
    FILTER_ABSENCE = "FILTER_ABSENCE",
    DELETE_ABSENCE = "DELETE_ABSENCE",
    COMPLETE_ABSENCE = "COMPLETE_ABSENCE",
    UNCOMPLETE_ABSENCE = "UNCOMPLETE_ABSENCE",
}
export interface Members {
    crewId: string;
    id?: string;
    image?: string;
    name?: string;
    userId?: string;
}

export interface Filter {
    endDate: string;
    startDate: string;
    type: string;
}

export enum MembersListActions {
    ADD_MEMBERS = "ADD_MEMBERS",
    SET_MEMBERS = "SET_MEMBERS",
}

export type MembersAction =
    | TodoActionType<typeof MembersListActions.SET_MEMBERS, Members[]>
    | TodoActionType<typeof MembersListActions.ADD_MEMBERS, Members>;

export type AbsenceAction =
    | TodoActionType<typeof AbsenceListActions.SET_ABSENCE, Absences[]>
    | TodoActionType<typeof AbsenceListActions.ADD_ABSENCE, Absences>
    | TodoActionType<typeof AbsenceListActions.FILTER_ABSENCE, Filter>;
