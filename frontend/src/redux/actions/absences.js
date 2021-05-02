import types from "../types";
import store from "../store";
import { getAbsencesAPI, downloadIcalFileAPI } from "../apis/absences";

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
          type: types.SET_ERROR,
          payload: false,
        });
        return reject(err);
      })
  );
}

export function downloadIcalFile(payload) {
  return new Promise((resolve, reject) =>
    downloadIcalFileAPI(payload)
      .then((res) => res.blob())
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      })
  );
}
