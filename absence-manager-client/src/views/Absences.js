import { useEffect } from "react";
import { Table, message } from "antd";

import { getTableColumns } from "../helpers/absencesHelper";

function Absences({ absences, isLoading, isError, error }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleError = () => {
    messageApi.open({
      type: "error",
      content: error,
      style: { marginTop: '60px' },
      duration: 5
    });
  };

  useEffect(() => {
    isError && handleError();
  }, [isError]);

  return (
    <>
      {contextHolder}
      <Table
        bordered
        dataSource={absences}
        columns={getTableColumns()}
        loading={isLoading}
        pagination={{
          position: ["bottomCenter"],
          defaultPageSize: 10,
        }}
        rowKey="id"
        sticky={{ offsetHeader: "64px" }}
        title={() => `Total Absences: ${absences.length}`}
        // locale={{
        //   emptyText: 'No Absence Data',
        // }}
      />
    </>
  );
}

export default Absences;
