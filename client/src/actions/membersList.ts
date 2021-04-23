import { Members, MembersAction, MembersListActions } from '../model/index';

export function createMembersListing(absences: Members[]): MembersAction {
    return {
        type: MembersListActions.SET_MEMBERS,
        payload: absences,
    };
}

