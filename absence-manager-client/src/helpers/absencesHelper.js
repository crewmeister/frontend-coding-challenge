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
 * Check the given date is within the start and end dates
 * @param {*} date 
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns 
 */
const checkDateWithinRange = (date, startDate, endDate) => {
  const isWithinRange = moment(date).isBetween(startDate, endDate, undefined, '[]');
  return !date || isWithinRange;
};

/**
 * Generate table column configuration
 * 
 * @param {*} filteredInfo filer values
 * @param {*} filterByDate 
 * @returns 
 */
export const getTableColumns = (filteredInfo, filterByDate) => [
  {
    title: "Member Name",
    dataIndex: "memberName",
    width: "150px",
    key: "name"
  },
  {
    title: "Type of Absence",
    dataIndex: "type",
    width: "150px",
    filteredValue: filteredInfo.type || null,
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
    key: "type"
  },
  {
    title: "Period",
    key: "period",
    children: [
      {
        title: "Start Date",
        dataIndex: "startDate",
        width: "120px",
        filteredValue: [filterByDate],
        onFilter: (value, record) => checkDateWithinRange(value, record.startDate, record.endDate),
        key: "startDate"
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        width: "120px",
        key: "startDate"
      },
      {
        title: "No. of Days",
        render: (text, record) =>
          calculateNoOfDays(record.startDate, record.endDate),
        width: "120px",
        key: "days"
      },
    ],
  },
  {
    title: "Member Note",
    dataIndex: "memberNote",
    render: (text) => text || "-",
    key: "memberNote"
  },
  {
    title: "Status",
    render: (text, record) =>
      generateStatus(record.confirmedAt, record.rejectedAt),
    width: "120px",
    key: "status"
  },
  {
    title: "Admitter Note",
    dataIndex: "admitterNote",
    render: (text) => text || "-",
    key: "admitterNote"
  },
];
