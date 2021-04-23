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

    return (
        <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="default">Completed</TableCell>
                        <TableCell padding="default">Text</TableCell>
                        <TableCell padding="default">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {absenceList.map((n: Absences) => {
                        return (
                            <TableRow
                                key={n.id}
                                hover>
                                <TableCell>{n.crewId}</TableCell>
                                <TableCell>{n.name}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="Delete"
                                        color="default"
                                        onClick={() =>
                                            AbsenceListActions.deleteTodo(n.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
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
