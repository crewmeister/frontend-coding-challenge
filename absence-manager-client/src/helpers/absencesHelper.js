import moment from "moment";

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
 * Generate table column configuration
 * @returns
 */
export const getTableColumns = () => [
  {
    title: "Member Name",
    dataIndex: "memberName",
  },
  {
    title: "Type of Absence",
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
        title: "No. of Days",
        render: (text, record) =>
          calculateNoOfDays(record.startDate, record.endDate),
        key: "days",
      },
    ],
  },
  {
    title: "Member Note",
    dataIndex: "memberNote",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  { title: "Admitter Note", dataIndex: "admitterNote" },
];
