import absences from '../json_files/absences.json'
import members from '../json_files/members.json'

export const getAllAbsences = () => async dispatch => {
    dispatch({
        type: "GET_ABSENCES_INIT"
    });

    try {
        absences.payload.map(absItem => {
            const memberData = members.payload.find(item => item.userId===absItem.userId)
            return absItem.member_data = memberData;
        })
        
        dispatch({
            type: "GET_ABSENCES_SUCCESS",
            payload: absences.payload,
        });

        return Promise.resolve(true)
        
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getFilteredAbsences = filters => (dispatch , getState) => {

    console.log(filters);
    const {absences} = getState();
    let filteredAbsences = [];
    if(Object.keys(filters).length > 0){
        if("type" in filters && "date" in filters){
            filteredAbsences = absences.filter(item=> item.type === filters.type && item.createdAt.split("T")[0] === filters.date);
        }
        if("type" in filters)
            filteredAbsences = absences.filter(item=>item.type === filters.type);
        if("date" in filters)
            filteredAbsences = absences.filter(item=>item.createdAt.split("T")[0] === filters.date);

        dispatch({type:"GET_ABSENCES_SUCCESS",payload:filteredAbsences})
    }
    else{
        dispatch(getAllAbsences());
    }

    return Promise.resolve(true);
}
