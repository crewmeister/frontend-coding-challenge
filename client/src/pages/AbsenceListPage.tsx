import { Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { AbsenceTableTable } from "../components";
import { useActions } from "../actions";
import * as AbsenceListActionList from "../actions/absenceList";
import * as MembersListActionList from "../actions/membersList";
import axios from 'axios';

export function AbsenceListPage() {
    const classes = useStyles();
    const AbsenceListActions = useActions(AbsenceListActionList);
    const MembersListActions = useActions(MembersListActionList);

    axios.get(`http://localhost:3001/members`)
        .then(res => {
            console.log('members res:', res);
            AbsenceListActions.createAbsenceListing(res.data.payload);
        })
        .then(() => {
            axios.get(`http://localhost:3001/absences`)
                .then(res => {
                    console.log('absences res:', res);
                    MembersListActions.createMembersListing(res.data.payload);
                })
        })

    return (
        <Grid container className={classes.root}>
            <Grid item xs={6}>
                <Typography variant="h4" gutterBottom>
                    Absence List
				</Typography>
            </Grid>
            <Grid item xs={12}>
                <AbsenceTableTable />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: 20,
        [theme.breakpoints.down("md")]: {
            paddingTop: 50,
            paddingLeft: 15,
            paddingRight: 15,
        },
    },

    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    },

    button: {
        marginBottom: 15,
    },
}));
