// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as AbsenceListActionList from "../actions/absenceList";
import { Todo } from "../model/index";
import { RootState } from "../reducers/index";

export function AbsenceTableTable() {
    const classes = useStyles();
    const todoList = useSelector((state: RootState) => state.todoList);
    const AbsenceListActions = useActions(AbsenceListActionList);

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
                    {todoList.map((n: Todo) => {
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
