// imports
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as AbsenceListActionList from "../actions/absenceList";
import { Absences } from "../model/index";
import { RootState } from "../reducers/index";
import Pagination from '@material-ui/lab/Pagination';

export function AbsenceTableTable() {
    const classes = useStyles();
    const absenceList = useSelector((state: RootState) => state.absenceList);
    const membersList = useSelector((state: RootState) => state.membersList);
    const AbsenceListActions = useActions(AbsenceListActionList);

    const itemsPerPage = 10;
    const [page, setPage] = React.useState(1);
    const [noOfPages] = React.useState(
        Math.ceil(absenceList.length / itemsPerPage)
    );

    const handleChange = (event: any, value: any) => {
        setPage(value);
    };

    const getName = (userId: string): string => {
        return membersList.find(member => member.userId === userId)?.name || '';
    };

    const getPeriod = (startDate: string, endDate: string): string => {
        return startDate + ' - ' + endDate;
    };

    const getStatus = (rejectedAt: string, confirmedAt: string): string => {
        if (!!confirmedAt) {
            return 'Confirmed'
        }
        if (!!rejectedAt) {
            return 'Rejected'
        }
        return 'Requested'
    };

    return (
        <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="default">Member</TableCell>
                        <TableCell padding="default">Type of absence</TableCell>
                        <TableCell padding="default">Period</TableCell>
                        <TableCell padding="default">Member note</TableCell>
                        <TableCell padding="default">Status  (Requested/Confirmed/Rejected)</TableCell>
                        <TableCell padding="default">Admitter note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {absenceList.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((n: Absences) => {
                        return (
                            <TableRow
                                key={n.id}
                                hover>
                                <TableCell>{getName(n.userId)}</TableCell>
                                <TableCell>{n.type}</TableCell>
                                <TableCell>{getPeriod(n.startDate, n.endDate)}</TableCell>
                                <TableCell>{n.memberNote || 'No note availble'}</TableCell>
                                <TableCell>{getStatus(n.rejectedAt, n.confirmedAt)}</TableCell>
                                <TableCell>{n.admitterNote || 'No note availble'}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination
                count={noOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
            />
        </Paper>
    );
}

const useStyles = makeStyles({
    paper: {
        width: "100%",
        minWidth: 260,
        display: "inline-block",
    },
    table: {
        width: "100%",
    },
    paginator: {
        justifyContent: "center",
        padding: "10px"
    }
});
