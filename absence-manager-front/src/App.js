import React from "react";
import { Table } from "antd";

import { useAbsences } from "./hooks/useAbsences";
import { getColumnDatePickerSearchProps } from "./utils";

import "./App.css";

const onChange = (pagination, filters, sorter, extra) => {
  //console.log("params", pagination, filters, sorter, extra);
};

const columns = [
  {
    title: "Member name",
    dataIndex: "userName",
  },
  {
    title: "Type of absence",
    dataIndex: "type",
    filters: [
      {
        text: "Vacation",
        value: "vacation",
      },
      {
        text: "Sickness",
        value: "sickness",
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
  {
    title: "Start date",
    dataIndex: "startDate",
    width: "10%",
    ...getColumnDatePickerSearchProps("startDate"),
  },
  {
    title: "End date",
    dataIndex: "endDate",
    width: "10%",
    ...getColumnDatePickerSearchProps("endDate"),
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

const App = () => {
  const { data, isLoading } = useAbsences();

  return (
    <div className="app">
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={isLoading}
      />
    </div>
  );
};

export default App;
