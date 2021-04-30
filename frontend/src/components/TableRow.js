import React from "react";
import { BsFillEyeFill } from "react-icons/bs";
import moment from "moment";

//Styled components
import List from "./styled/List";
import ActionButton from "./styled/ActionButton";

import {
  trimText,
  getUser,
  getStatus,
  capitalize,
  getNumberOfDays,
} from "../utils";

const TableRow = ({
  index,
  type,
  memberNote,
  noData,
  text,
  user,
  admitterNote,
  confirmedAt,
  rejectedAt,
  toggleModal,
  startDate,
  endDate,
}) => {
  const { name } = getUser(user);
  const start = moment(startDate);
  const end = moment(endDate);
  const days = getNumberOfDays(start, end);

  return (
    <List>
      {noData ? (
        <td colSpan={8} className="text-center">
          {text}
        </td>
      ) : (
        <>
          <td>{index}.</td>
          <td>{name}</td>
          <td>{capitalize(type)}</td>
          <td>
            {days} {days === 1 ? "day" : "days"}
          </td>
          <td>{memberNote ? trimText(memberNote, 10) : "-"}</td>
          <td>{getStatus(confirmedAt, rejectedAt)}</td>
          <td>{admitterNote ? trimText(admitterNote, 10) : "-"}</td>
          <td>
            <ActionButton onClick={toggleModal}>
              <BsFillEyeFill /> view
            </ActionButton>
          </td>
        </>
      )}
    </List>
  );
};

export default TableRow;
