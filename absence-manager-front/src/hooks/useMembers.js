import { useQuery } from "react-query";
import axios from "axios";

const membersUrl = "members.json";

const getMembers = () =>
  axios
    .get(membersUrl)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.message);
    });

export function useMembers() {
  return useQuery(["members"], () => getMembers());
}
