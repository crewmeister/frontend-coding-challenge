
export default function absenceMgrReducer(state = [], action) {

    const { type, payload } = action;

    switch(type) {
        case 'GET_ABSENCES_INIT':
            return [];
        case 'GET_ABSENCES_SUCCESS':
            return payload;
        default:
            return state;
    }
}
