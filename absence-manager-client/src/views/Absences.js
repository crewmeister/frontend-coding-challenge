import { Table } from "antd";

import { getTableColumns } from "../helpers/absencesHelper";

function Absences({ absences, isLoading }) {
  return (
    <Table
      bordered
      dataSource={absences}
      columns={getTableColumns()}
      loading={isLoading}
    />
  );
}

export default Absences;
