import React, { useCallback, useEffect } from "react";
import { Table, message } from "antd";

import { useAbsences } from "./hooks/useAbsences";
import { getColumnDatePickerSearchProps } from "./utils";

import "./App.css";

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
  const [messageApi, contextHolder] = message.useMessage();
  const { data = [], isLoading, isError, error } = useAbsences();

  const handleToast = useCallback(
    (type, content) => {
      messageApi.open({ type, content });
    },
    [messageApi]
  );

  useEffect(() => {
    if (isError) {
      handleToast("error", error.toString());
    }
  }, [isError, error, handleToast]);

  return (
    <>
      {contextHolder}
      <div className="app">
        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
    </>
  );
};

export default App;
