import { API_URL } from "../../utils/constants";

export function getAbsencesAPI(obj) {
  let filters = Object.keys(obj).map((item) => {
    return `${item}=${obj[item]}`;
  });

  return fetch(`${API_URL}/absences?${filters.join("&")}`);
}
