import { useQuery } from "react-query";
import axios from "axios";

import { useMembers } from "./useMembers";

const absencesUrl = "absences.json";

const getAbsences = () =>
  axios
    .get(absencesUrl)
    .then((res) => res.data)
    .catch((err) => {
      return err.message;
    });

export function useAbsences() {
  const { data: members } = useMembers();

  return useQuery(["absences"], () => getAbsences(), {
    select: (data) => {
      return data?.payload?.map((absence) => {
        const user = members.payload.find(
          (member) => member.userId === absence.userId
        );

        let status = "Requested";
        if (absence.rejectedAt) status = "Rejected";
        if (absence.confirmedAt) status = "Confirmed";

        return { ...absence, userName: user.name, key: absence.id, status };
      });
    },
  });
}
