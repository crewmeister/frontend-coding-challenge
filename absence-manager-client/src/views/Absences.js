import { Table } from "antd";

import { getTableColumns } from "../helpers/absencesHelper";

function Absences({ absences, isLoading }) {
  return (
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
      sticky={{offsetHeader: "64px"}}
      title={() => `Total Absences: ${absences.length}`}
    />
  );
}

export default Absences;
