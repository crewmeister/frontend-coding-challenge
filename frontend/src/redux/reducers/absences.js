import types from "../types";

let initialState = {
  absences: [],
  total: 0,
  loading: true,
  error: false,
};

const absencesReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ABSENCES:
      return {
        ...state,
        absences: action.payload.payload,
        total: action.payload.total,
        loading: false,
        error: false,
      };
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default absencesReducer;
