import React from "react";
import { BsFillEyeFill } from "react-icons/bs";

//Styled components
import List from "./styled/List";
import ActionButton from "./styled/ActionButton";

import { trimText, getUser, getStatus, capitalize } from "../utils";

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
}) => {
  const { name } = getUser(user);

  return (
    <List>
      {noData ? (
        <td colSpan={7} className="text-center">
          {text}
        </td>
      ) : (
        <>
          <td>{index}.</td>
          <td>{name}</td>
          <td>{capitalize(type)}</td>
          <td>Period</td>
          <td>{memberNote ? trimText(memberNote, 10) : "-"}</td>
          <td>{getStatus(confirmedAt, rejectedAt)}</td>
          <td>{admitterNote ? trimText(admitterNote, 10) : "-"}</td>
          <td>
            <ActionButton onClick={() => toggleModal(true)}>
              <BsFillEyeFill /> view
            </ActionButton>
          </td>
        </>
      )}
    </List>
  );
};

export default TableRow;
