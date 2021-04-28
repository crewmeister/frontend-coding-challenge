import React from "react";

//Styled components
import List from "./styled/List";

const TableHeader = ({ data = [] }) => {
  return (
    <List header>
      {data.map((item, key) => (
        <td key={key}>{item}</td>
      ))}
    </List>
  );
};

export default TableHeader;
