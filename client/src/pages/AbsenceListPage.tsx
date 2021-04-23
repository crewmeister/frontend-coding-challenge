import { Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { AbsenceTableTable } from "../components";
import { useActions } from "../actions";
import * as AbsenceListActionList from "../actions/absenceList";
import * as MembersListActionList from "../actions/membersList";
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

export function AbsenceListPage() {
    const classes = useStyles();
    const AbsenceListActions = useActions(AbsenceListActionList);
    const MembersListActions = useActions(MembersListActionList);

    axios.get(`http://localhost:3001/absences`)
        .then(absenceRes => {
            AbsenceListActions.createAbsenceListing(absenceRes.data.payload);
        })
        .then(() => {
            axios.get(`http://localhost:3001/members`)
                .then(membersRes => {
                    MembersListActions.createMembersListing(membersRes.data.payload);
                })
        })

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
            <Grid item xs={8}>
                <Typography variant="h5" gutterBottom>
                    Filter List
				</Typography>
                <Select className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={vacationType}
                    onChange={handleChange}>
                    <MenuItem value={vacationType}>All</MenuItem>
                    <MenuItem value='vacation'>Vacation</MenuItem>
                    <MenuItem value='sickness'>Sickness</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                </Select>
                <TextField
                    id="date"
                    onChange={handleDateToChange}
                    value={startDate}
                    label="From:"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    onChange={handleDateFromChange}
                    value={endDate}
                    label="To:"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
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
