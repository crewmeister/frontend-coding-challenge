import axios from "axios";

export const ACTION_TYPES = {
  FETCH_ABSENCES_REQUEST: "FETCH_ABSENCES_REQUEST",
  FETCH_ABSENCES_SUCCESS: "FETCH_ABSENCES_SUCCESS",
  FETCH_ABSENCES_FAILURE: "FETCH_ABSENCES_FAILURE"
};

// Action Creators
/**
 * Fetch all absences
 */
export const fetchAbsences = () => async (dispatch) => {
  dispatch(fetchAbsencesRequest());
  try {
    const absences = await axios.get("absences.json");
    dispatch(fetchAbsencesSuccess(absences?.data?.payload || []));
  } catch (err) {
    console.log("fetchAbsences error: ", err);
    dispatch(fetchAbsencesFailure(err.message));
  }
};

// Actions
const fetchAbsencesRequest = () => ({ type: ACTION_TYPES.FETCH_ABSENCES_REQUEST });

const fetchAbsencesSuccess = (absences) => ({
  type: ACTION_TYPES.FETCH_ABSENCES_SUCCESS,
  payload: absences,
});

const fetchAbsencesFailure = (error) => ({
  type: ACTION_TYPES.FETCH_ABSENCES_FAILURE,
  payload: error,
});
