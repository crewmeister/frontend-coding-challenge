import { useQuery } from "react-query";
import axios from "axios";

const membersUrl = "members.json";

const getMembers = () =>
  axios
    .get(membersUrl)
    .then((res) => res.data)
    .catch((err) => err);

export function useMembers() {
  return useQuery(["members"], () => getMembers());
}
