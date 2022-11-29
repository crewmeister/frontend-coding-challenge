import { SearchOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";

export const getColumnDatePickerSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, confirm }) => {
    const handleChange = (_, dateString) => {
      setSelectedKeys(dateString ? [dateString] : []);
      confirm();
    };

    return (
      <div
        style={{
          padding: 8,
        }}
      >
        <DatePicker onChange={handleChange} />
      </div>
    );
  },
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? "#1890ff" : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex]?.toString()?.toLowerCase().includes(value?.toLowerCase()),
  render: (text) => text,
});
