import React, { useCallback, useEffect } from "react";
import { Table, message } from "antd";

import { useAbsences } from "./hooks/useAbsences";
import { absenceTableColumns } from "./utils/constants";

import "./App.css";

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
        <Table
          columns={absenceTableColumns}
          dataSource={data}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default App;
