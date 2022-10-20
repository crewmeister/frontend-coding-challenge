import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    maxHeight: 600,
  },
});

const AbsencesList = (props) => {
  // styles
  const classes = useStyles();

  // props
  const absencesList = props.list || [];


  // states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function duration(t0, t1) {
    let d = new Date(t1) - new Date(t0);
    let weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
    let days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
    let hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
    let minutes = Math.floor(
      d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60
    );
    let seconds = Math.floor(
      d / 1000 -
        weekdays * 7 * 24 * 60 * 60 -
        days * 24 * 60 * 60 -
        hours * 60 * 60 -
        minutes * 60
    );
    let milliseconds = Math.floor(
      d -
        weekdays * 7 * 24 * 60 * 60 * 1000 -
        days * 24 * 60 * 60 * 1000 -
        hours * 60 * 60 * 1000 -
        minutes * 60 * 1000 -
        seconds * 1000
    );
    let t = {};
    ["weekdays", "days", "hours", "minutes", "seconds", "milliseconds"].forEach(
      (q) => {
        if (eval(q) > 0) {
          t[q] = eval(q);
        }
      }
    );
    return t;
  }

  return (
    <>
      <TableContainer className={classes.container} data-testid="list-of-absences" >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{minWidth: "200"}}>Member name</TableCell>
              <TableCell align="center" style={{minWidth: "100"}}>Type</TableCell>
              <TableCell align="center" style={{minWidth: "100"}}>Period</TableCell>
              <TableCell align="center" style={{minWidth: "150"}}>Member Note</TableCell>
              <TableCell align="center" style={{minWidth: "100"}}>Status</TableCell>
              <TableCell align="center" style={{minWidth: "150"}}>Admitter note</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {(absencesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row , index) => {

              const start_date = new Date(row?.startDate);
              const end_date = new Date(row?.endDate);
              
              let period = duration(
                end_date,
                start_date
              );

              let absenceStatus = "Requested";
              if(row.rejectedAt != null)
                absenceStatus = "Rejected"
              if(row.confirmedAt != null)
                absenceStatus = "Confirmed"

              
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell align="center">{row?.member_data.name}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{period?.days || 0 } day(s)</TableCell>
                  <TableCell align="center">{row.memberNote}</TableCell>
                  <TableCell align="center">{absenceStatus}</TableCell>
                  <TableCell align="center">{row.admitterNote}</TableCell>
                </TableRow>
              );
            }))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={absencesList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
export default AbsencesList;