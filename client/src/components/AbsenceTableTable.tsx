// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as AbsenceListActionList from "../actions/absenceList";
import { Absences } from "../model/index";
import { RootState } from "../reducers/index";

export function AbsenceTableTable() {
    const classes = useStyles();
    const absenceList = useSelector((state: RootState) => state.absenceList);
    const membersList = useSelector((state: RootState) => state.membersList);
    const AbsenceListActions = useActions(AbsenceListActionList);

    setTimeout(() => {
        console.log('membersList', membersList);
        console.log('absenceList', absenceList);
    }, 4000);


    const getName = (userId: string): string => {
        return membersList.find(member => member.userId === userId)?.name || '';
    };

    const getPeriod = (startDate: string, endDate: string): string => {
        return startDate + ' - ' + endDate;
    };

    const getStatus = (rejectedAt: string, confirmedAt: string): string => {
        return rejectedAt;
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
                    {absenceList.map((n: Absences) => {
                        return (
                            <TableRow
                                key={n.id}
                                hover>
                                <TableCell>{getName(n.userId)}</TableCell>
                                <TableCell>{n.type}</TableCell>
                                <TableCell>{getPeriod(n.startDate, n.endDate)}</TableCell>
                                <TableCell>{n.memberNote || 'No not availble'}</TableCell>
                                <TableCell>{getStatus(n.rejectedAt, n.confirmedAt)}</TableCell>
                                <TableCell>{n.admitterNote}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
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
});
