import React from "react";
import { BsFillEyeFill, BsDownload } from "react-icons/bs";
import moment from "moment";

//Styled components
import List from "./styled/List";
import ActionButton from "./styled/ActionButton";
import Badge from "./styled/Badge";

import { trimText, getStatus, capitalize, getNumberOfDays } from "../utils";

const TableRow = ({
  _id,
  index,
  type,
  memberNote,
  noData,
  text,
  user = {},
  admitterNote,
  confirmedAt,
  rejectedAt,
  toggleModal,
  startDate,
  endDate,
  downloadFile,
}) => {
  const { name } = user;
  const start = moment(startDate);
  const end = moment(endDate);
  const days = getNumberOfDays(start, end);
  const status = getStatus(confirmedAt, rejectedAt);

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
          <td>
            <Badge
              danger={capitalize(type) === "Sickness"}
              primary={capitalize(type) === "Vacation"}
            >
              {capitalize(type)}
            </Badge>
          </td>
          <td>
            {days} {days === 1 ? "day" : "days"}
          </td>
          <td>{memberNote ? trimText(memberNote, 10) : "-"}</td>
          <td>
            <Badge
              primary={status === "Confirmed"}
              danger={status === "Rejected"}
            >
              {status}
            </Badge>
          </td>
          <td>{admitterNote ? trimText(admitterNote, 10) : "-"}</td>
          <td>
            <ActionButton className="mr-3" onClick={toggleModal}>
              <BsFillEyeFill />
            </ActionButton>
            <ActionButton onClick={() => downloadFile(_id)}>
              <BsDownload />
            </ActionButton>
          </td>
        </>
      )}
    </List>
  );
};

export default TableRow;
