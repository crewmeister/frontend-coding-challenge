import moment from "moment";
import { Tag } from "antd";
import { ABSENCE_STATUS } from "../constants/absences";

/**
 * Calculate the no of days between 2 dates
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */
export const calculateNoOfDays = (startDate, endDate) => {
  const noOfDays = moment(endDate).diff(moment(startDate), "days") + 1;
  if (isNaN(noOfDays)) return "Invalid Date format";
  return noOfDays > 0
    ? noOfDays
    : "End date should be same as or after Start date";
};

/**
 * Determine status and generate a colored tag
 * @param {*} confirmedAt
 * @param {*} rejectedAt
 * @returns
 */
const generateStatus = (confirmedAt, rejectedAt) => {
  let status = ABSENCE_STATUS.REQUESTED;
  let color = "blue";
  if (confirmedAt) {
    status = ABSENCE_STATUS.CONFIRMED;
    color = "green";
  } else if (rejectedAt) {
    status = ABSENCE_STATUS.REJECTED;
    color = "red";
  }
  return <Tag color={color}>{status.toUpperCase()}</Tag>;
};

/**
 * Generate table column configuration
 * @returns
 */
export const getTableColumns = () => [
  {
    title: "Member Name",
    dataIndex: "memberName",
    width: "150px",
  },
  {
    title: "Type of Absence",
    dataIndex: "type",
    width: "150px",
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
    onFilter: (value, record) => value.includes(record.type),
  },
  {
    title: "Period",
    children: [
      {
        title: "Start Date",
        dataIndex: "startDate",
        width: "120px",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        width: "120px",
      },
      {
        title: "No. of Days",
        render: (text, record) =>
          calculateNoOfDays(record.startDate, record.endDate),
        width: "120px",
      },
    ],
  },
  {
    title: "Member Note",
    dataIndex: "memberNote",
    render: (text) => text || "-",
  },
  {
    title: "Status",
    render: (text, record) =>
      generateStatus(record.confirmedAt, record.rejectedAt),
    width: "120px",
  },
  {
    title: "Admitter Note",
    dataIndex: "admitterNote",
    render: (text) => text || "-",
  },
];
