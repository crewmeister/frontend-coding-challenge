import reducer, { initialState } from '../../state/reducers/absences';
import { ACTION_TYPES } from '../../state/actions/absences';
import { populatedAbsences, failResp } from "../../__data__/absences.data";

let state = {};

describe('absences reducers', () => {
  beforeEach(() => {
    state = initialState;
  });

  it('should handle FETCH_ABSENCES_REQUEST', () => {
    const expectedState = {
      ...state,
      isFetching: true,
    };

    expect(
      reducer(state, {
        type: ACTION_TYPES.FETCH_ABSENCES_REQUEST,
      })
    ).toEqual(expectedState);
  });

  it('should handle FETCH_ABSENCES_SUCCESS', () => {
    const expectedState = {
      ...state,
      data: populatedAbsences,
    };

    expect(
      reducer(state, {
        type: ACTION_TYPES.FETCH_ABSENCES_SUCCESS,
        payload: populatedAbsences,
      })
    ).toEqual(expectedState);
  });

  it('should handle FETCH_ABSENCES_FAILURE', () => {
    const expectedState = {
      ...state,
      isError: true,
      error: failResp.message,
    };

    expect(
      reducer(state, {
        type: ACTION_TYPES.FETCH_ABSENCES_FAILURE,
        payload: failResp.message,
      })
    ).toEqual(expectedState);
  });
});
