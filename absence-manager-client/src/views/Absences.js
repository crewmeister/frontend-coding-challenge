import { useEffect, useState } from "react";
import { Table, message, Typography, Space, Row, Col } from "antd";
import dayjs from "dayjs";

import DatePicker from "../components/DatePicker.style";
import { getTableColumns } from "../helpers/absencesHelper";

const { Text } = Typography;

function Absences({ absences, isLoading, isError, error }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [filterByDate, setFilterByDate] = useState("");

  useEffect(() => {
    // show error banner
    if (isError) {
      messageApi.open({
        type: "error",
        content: error,
        style: { marginTop: "60px" },
        duration: 5,
      });
    }
  }, [isError, error, messageApi]);

  const onDateChange = (value, strDate) => {
    setFilterByDate(strDate);
  };

  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };

  return (
    <>
      {contextHolder}
      <Row justify="space-between" style={{ marginBottom: "1rem" }}>
        <Col>
          <Space>
            <Text strong>Filter by Date: </Text>
            <DatePicker
              onChange={onDateChange}
              size="large"
              value={filterByDate && dayjs(filterByDate)}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Text type="secondary">Total Absences: </Text>
            <Text style={{ fontSize: "24px" }}>{absences.length}</Text>
          </Space>
        </Col>
      </Row>

      <Table
        bordered
        dataSource={absences}
        columns={getTableColumns(filteredInfo, filterByDate)}
        loading={isLoading}
        pagination={{
          position: ["bottomCenter"],
          defaultPageSize: 10,
        }}
        rowKey="id"
        sticky={{ offsetHeader: "64px" }}
        // title={() => `Total Absences: ${absences.length}`} // uncomment to show total in table header
        // locale={{ // uncomment to show custom no data text
        //   emptyText: 'No Absence Data',
        // }}
        onChange={handleChange}
      />
    </>
  );
}

export default Absences;
