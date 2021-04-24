import { Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { AbsenceTable } from "../components";
import { useActions } from "../actions";
import * as AbsenceListActionList from "../actions/absenceList";
import * as MembersListActionList from "../actions/membersList";
import axios from 'axios';

export function AbsenceListPage() {
    const classes = useStyles();
    const AbsenceListActions = useActions(AbsenceListActionList);
    const MembersListActions = useActions(MembersListActionList);

    React.useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:3001/absences`),
            axios.get(`http://localhost:3001/members`)
        ]).then(res => {
            AbsenceListActions.createAbsenceListing(res[0].data.payload);
            MembersListActions.createMembersListing(res[1].data.payload);
        })
    }, []);

    const [vacationType, setVacationType] = React.useState('all');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const handleChange = (event: any) => {
        setVacationType(event.target.value);
        AbsenceListActions.filterAbsenceListing({ endDate: endDate, startDate: startDate, type: vacationType });
    };

    const handleDateToChange = (event: any) => {
        setStartDate(event.target.value);
        AbsenceListActions.filterAbsenceListing({ endDate: endDate, startDate: startDate, type: vacationType });
    };

    const handleDateFromChange = (event: any) => {
        setEndDate(event.target.value);
        AbsenceListActions.filterAbsenceListing({ endDate: endDate, startDate: startDate, type: vacationType });
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4}>
                <Typography variant="h4" gutterBottom>
                    Absence List
				</Typography>
            </Grid>
            <Grid item xs={12}>
                <AbsenceTable />
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

    select: {
        height: '48px',
        marginRight: '2px',
        width: '150px',
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
