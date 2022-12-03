import { ACTION_TYPES } from '../actions/absences';

const initialState = {
  isFetching: false,
  isError: false,
  error: '',
  data: []
};

export default function absenceReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ABSENCES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case ACTION_TYPES.FETCH_ABSENCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        error: '',
        data: action.payload
      };

    case ACTION_TYPES.FETCH_ABSENCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.payload
      };

    default:
      return state;
  }
}