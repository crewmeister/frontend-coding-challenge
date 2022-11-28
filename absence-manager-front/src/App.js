import React from "react";
import { Table } from "antd";

import { useAbsences } from "./hooks/useAbsences";

import "./App.css";

const columns = [
  {
    title: "Member name",
    dataIndex: "userName",
  },
  {
    title: "Type of absence",
    dataIndex: "type",
  },
  {
    title: "Start date",
    dataIndex: "startDate",
    width: "10%",
  },
  {
    title: "End date",
    dataIndex: "endDate",
    width: "10%",
  },
  {
    title: "Member note",
    dataIndex: "memberNote",
    width: "40%",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  { title: "Admitter note", dataIndex: "admitterNote" },
];

const onChange = (pagination, filters, sorter, extra) => {
  //console.log("params", pagination, filters, sorter, extra);
};

const App = () => {
  const { data } = useAbsences();

  return (
    <div className="app">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default App;
