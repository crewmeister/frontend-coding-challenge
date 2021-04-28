import types from "../types";
import store from "../store";
import { getAbsencesAPI } from "../apis/absences";

const { dispatch } = store;

export function getAbsences(payload) {
  dispatch({
    type: types.SET_LOADING,
    payload: true,
  });

  return new Promise((resolve, reject) =>
    getAbsencesAPI(payload)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: types.GET_ABSENCES,
          payload: res,
        });

        return resolve(res);
      })
      .catch((err) => {
        dispatch({
          type: types.SET_LOADING,
          payload: false,
        });
        return reject(err);
      })
  );
}

export function handleModal(payload) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: types.HANDLE_MODAL,
      payload: payload,
    });

    return resolve(payload);
  });
}
