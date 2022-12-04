import moment from "moment";
import { Tag } from 'antd';
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

const getStatus = (confirmedAt, rejectedAt) => {
  let status = ABSENCE_STATUS.REQUESTED;
  let color = 'blue';
  if (confirmedAt) {
    status = ABSENCE_STATUS.CONFIRMED;
    color = 'green'; 
  } else if (rejectedAt) {
    status = ABSENCE_STATUS.REJECTED;
    color = 'red';
  }
  return (
    <Tag color={color}>
      {status.toUpperCase()}
    </Tag>
  );
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
    width: "150px",
    dataIndex: "type",
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
        width: "120px",
        title: "No. of Days",
        render: (text, record) =>
          calculateNoOfDays(record.startDate, record.endDate),
      },
    ],
  },
  {
    title: "Member Note",
    dataIndex: "memberNote",
    render: text => text || '-'
  },
  {
    width: "120px",
    title: "Status",
    render: (text, record) =>
      getStatus(record.confirmedAt, record.rejectedAt),
  },
  { 
    title: "Admitter Note",
    dataIndex: "admitterNote",
    render: text => text || '-'
  },
];
