import { useQuery } from "react-query";
import axios from "axios";

import { useMembers } from "./useMembers";
import { absenceTypes } from "../utils/constants";

const { REQUESTED, REJECTED, CONFIRMED } = absenceTypes;
const absencesUrl = "absences.json";

const getAbsences = () =>
  axios
    .get(absencesUrl)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.message);
    });

export function useAbsences() {
  const { data: members, isError, error, isLoading } = useMembers();

  return useQuery(["absences"], () => getAbsences(), {
    select: (data) => {
      if (isLoading) {
        return;
      }

      if (isError) {
        throw new Error(error);
      }

      return data?.payload?.map((absence) => {
        const user = members?.payload.find(
          (member) => member.userId === absence.userId
        );

        let status = REQUESTED;
        if (absence.rejectedAt) status = REJECTED;
        if (absence.confirmedAt) status = CONFIRMED;

        return { ...absence, userName: user?.name, key: absence.id, status };
      });
    },
  });
}
