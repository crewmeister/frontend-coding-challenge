import * as React from "react";
import Loading from "./Loading";
import Filter from "./Filter";
import AbsenceTable from "./AbsenceTable";
import { useEffect, useState } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const columns = [
  { id: "name", label: "Member Name", minWidth: 100 },
  { id: "type", label: "Type Of Absence", minWidth: 100 },
  { id: "period", label: "Period", minWidth: 100 },
  { id: "memberNote", label: "Member Note", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "admitterNote", label: "Admitter Note", minWidth: 100 },
];

export default function CustomPaginationActionsTable() {
  const moment = extendMoment(Moment);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const [absenceData, setAbsenceData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [absenceList, setAbsenceList] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [error, setError] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function fetchAbsence() {
    setLoading(true);
    fetch("http://localhost:3001/absence")
      .then((response) => response.json())
      .then((data) => {
        setError(!data.payload);
        setAbsenceData(data.payload ? data.payload : []);
        setAbsenceList(data.payload ? data.payload : []);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchMembers() {
    setLoading(true);
    fetch("http://localhost:3001/members")
      .then((response) => response.json())
      .then((response) => {
        setError(!response.payload);
        setMemberData(response.payload ? response.payload : []);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getMemberName(userId) {
    let user = memberData.find((row) => row.userId === userId);
    return user?.name;
  }

  function getDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const range = moment.range(start, end);
    return range.diff("days") + 1;
  }

  function getStatus(confirmedAt, createdAt, rejectedAt) {
    if (confirmedAt === null && createdAt !== null && rejectedAt === null) {
      return "Requested";
    }
    if (confirmedAt !== null && createdAt !== null) {
      return "Confirmed";
    }
    if (rejectedAt !== null) {
      return "Rejected";
    }
  }

  function handleErrorState() {
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={6} style={{ textAlign: "center" }}>
          Failed to fetch data
          </TableCell>
        </TableRow>
      );
    }
    else if (absenceList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} style={{ textAlign: "center" }}>
            No Rows Found
          </TableCell>
        </TableRow>
      );
    }
  }

  useEffect(() => {
    fetchAbsence();
    fetchMembers();
  }, []);

  useEffect(() => {
    if (filterType !== "" && filterDate) {
      setAbsenceList(
        absenceData.filter(
          (row) =>
            row.type.includes(filterType) &&
            (filterDate.toDateString() ===
              new Date(row.startDate).toDateString() ||
              filterDate.toDateString() ===
                new Date(row.endDate).toDateString())
        )
      );
    } else if (filterType !== "") {
      setAbsenceList(absenceData.filter((row) => row.type.includes(filterType)));
    } else if (filterDate) {
      setAbsenceList(
        absenceData.filter((row) => {
          return (
            filterDate.toDateString() ===
              new Date(row.startDate).toDateString() ||
            filterDate.toDateString() === new Date(row.endDate).toDateString()
          );
        })
      );
    } else {
      setAbsenceList(absenceData);
    }
  }, [filterType, filterDate]);

  return (
    <div className="header-top">
      <Filter
        filterType={filterType}
        filterDate={filterDate}
        setFilterType={setFilterType}
        setFilterDate={setFilterDate}
        numberOfAbsentees={absenceList.length}
      />
      {loading ? (
        <Loading />
      ) : (
        <AbsenceTable
          columns={columns}
          rowsPerPage={rowsPerPage}
          absenceList={absenceList}
          page={page}
          memberName={getMemberName}
          duration={getDuration}
          status={getStatus}
          errorState={handleErrorState}
          changePage={handleChangePage}
          changeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}