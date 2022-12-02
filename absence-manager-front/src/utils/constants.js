import { getColumnDatePickerSearchProps } from "./index";

export const absenceTypes = {
  REQUESTED: "Requested",
  CONFIRMED: "Confirmed",
  REJECTED: "Rejected",
};

export const absenceTableColumns = [
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
