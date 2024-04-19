import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import moxios from "moxios";
import expect from 'expect';
import { ACTION_TYPES, fetchAbsences } from "../../state/actions/absences";
import { populatedAbsencesRes, populatedAbsences, failResp } from "../../__data__/absences.data";
import { memberData } from "../../__data__/members.data";
import { initialState as state } from "../../state/reducers/absences";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let initialState = {};

describe("test absences actions", () => {
  beforeEach(() => {
    initialState = state;
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe("when fetchAbsences() is called", () => {
    it("should fetch absences successfully and dispatch FETCH_ABSENCES_SUCCESS action", () => {
      moxios.stubRequest(/.*absences/, {
        status: 200,
        response: populatedAbsencesRes,
      });
  
      const expectedActions = [
        {
          type: ACTION_TYPES.FETCH_ABSENCES_REQUEST,
        },
        {
          type: ACTION_TYPES.FETCH_ABSENCES_SUCCESS,
          payload: populatedAbsences,
        },
      ];
  
      const store = mockStore({
        absences: initialState,
      });
      return store
        .dispatch(fetchAbsences())
        .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  
    it("should fail to fetch absences and dispatch FETCH_ABSENCES_FAILURE action", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 500,
          message: failResp.message
        })
      });
  
      const expectedActions = [
        {
          type: ACTION_TYPES.FETCH_ABSENCES_REQUEST,
        },
        {
          type: ACTION_TYPES.FETCH_ABSENCES_FAILURE,
          payload: failResp.message,
        },
      ];
  
      const store = mockStore({
        absences: initialState,
      });
      return store
        .dispatch(fetchAbsences())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        });
    });
  });
});
