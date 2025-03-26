import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function Filter({
  filterType,
  filterDate,
  setFilterType,
  setFilterDate,
  numberOfAbsentees,
}) {
  return (
    <>
      <h1 className="header">Absence Manager</h1>
      <div className="header-row">
        <div className="total-absentees">
          Total Absences:{" "}
          <span data-testid="numAbsentees">{numberOfAbsentees}</span>
        </div>
        <div className="filters">
          <div className="filter-type">
            <TextField
              id="outlined-basic"
              label="Absence Type Filter"
              variant="outlined"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            />
          </div>
          <div className="filter-date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Filter"
                value={filterDate}
                onChange={(newValue) => {
                  setFilterDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
