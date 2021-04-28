import { API_URL } from "../../utils/constants";

export function getAbsencesAPI(obj) {
  return fetch(`${API_URL}/absences?limit=${obj.limit}&page=${obj.page}`);
}
