// imports
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { Absences } from "../model/index";
import { RootState } from "../reducers/index";
import Pagination from '@material-ui/lab/Pagination';
import ICalendarLink from "react-icalendar-link";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from "@material-ui/core";

interface iCalType {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    location: string;
};

const useStyles = makeStyles({
    paper: {
        width: "100%",
        minWidth: 260,
        display: "inline-block",
    },
    select: {
        height: '48px',
        marginRight: '2px',
        width: '150px',
    },
    table: {
        width: "100%",
    },
    paginator: {
        justifyContent: "center",
        padding: "10px"
    },
    textAlignCenter: {
        textAlign: 'center',
    },
});

export default function AbsenceTable() {
    const [vacationType, setVacationType] = React.useState('all');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [page, setPage] = React.useState(1);

    const classes = useStyles();
    const absenceList = useSelector((state: RootState) => state.absenceList);
    const membersList = useSelector((state: RootState) => state.membersList);
    const itemsPerPage = 10;

    const handleSelectChange = (event: any) => {
        setVacationType(event.target.value);
        setPage(1);
    };

    const handleDateToChange = (event: any) => {
        setStartDate(event.target.value);
        setPage(1);
    };

    const handleDateFromChange = (event: any) => {
        setEndDate(event.target.value);
        setPage(1);
    };

    const handleChange = (event: any, value: any) => {
        setPage(value);
    };

    const filterAbsenceListing = () => {
        if (!absenceList || !membersList) return [];
        return absenceList.filter(obj => {
            return (obj['type'] === vacationType || vacationType === 'all') &&
                (!startDate || new Date(startDate) < new Date(obj['startDate'])) &&
                (!endDate || new Date(endDate) > new Date(obj['startDate']))
        });
    };

    const getAbsenceList = (): Absences[] => {
        return filterAbsenceListing();
    };


    const getName = (userId: string): string => {
        return membersList.find(member => member.userId === userId)?.name || '';
    };

    const getPeriod = (startDate: string, endDate: string): string => {
        const startDateObject = new Date(startDate);
        const endDateObject = new Date(endDate);
        return `${startDateObject.getUTCDate()}/${startDateObject.getUTCMonth() + 1}/${startDateObject.getUTCFullYear()}` + ' - ' +
            `${endDateObject.getUTCDate()}/${endDateObject.getUTCMonth() + 1}/${endDateObject.getUTCFullYear()}`;
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

    const getIcalFormat = (values: any): iCalType => {
        return {
            title: values['memberNote'],
            description: values['admitterNote'],
            startTime: values['startDate'],
            endTime: values['endDate'],
            location: values['type'] === 'Vacation' ? 'Remote' : 'Sick'
        }
    }

    return (
        <Paper className={classes.paper}>
            {!membersList || !absenceList &&
                <div>
                    Error in fetching data
                </div>
            }
            {membersList && absenceList &&
                <div>
                    <Grid item xs={8}>
                        <Typography variant="h5">
                            Total {getAbsenceList().length}
                        </Typography>
                        <Select className={classes.select}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vacationType}
                            onChange={handleSelectChange}>
                            <MenuItem value='all'>All</MenuItem>
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
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="default">Member</TableCell>
                                <TableCell padding="default">Type of absence</TableCell>
                                <TableCell padding="default">Period</TableCell>
                                <TableCell padding="default">Member note</TableCell>
                                <TableCell padding="default">Status  (Requested/Confirmed/Rejected)</TableCell>
                                <TableCell padding="default">Admitter note</TableCell>
                                <TableCell padding="default">Download ICal File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                getAbsenceList().length > 0 ? getAbsenceList().slice((page - 1) * itemsPerPage, page * itemsPerPage).map((n: Absences) => {
                                    return (
                                        <TableRow
                                            key={n.id}
                                            hover>
                                            <TableCell>{getName(n.userId)}</TableCell>
                                            <TableCell>{n.type}</TableCell>
                                            <TableCell>{getPeriod(n.startDate, n.endDate)}</TableCell>
                                            <TableCell>{n.memberNote || 'No note available'}</TableCell>
                                            <TableCell>{getStatus(n.rejectedAt, n.confirmedAt)}</TableCell>
                                            <TableCell>{n.admitterNote || 'No note available'}</TableCell>
                                            <TableCell>
                                                <ICalendarLink event={getIcalFormat(n)}>
                                                    Add to Calendar
                                            </ICalendarLink>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                    :
                                    <TableRow>
                                        <TableCell className={classes.textAlignCenter} colSpan={6}>No Data</TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                    <Pagination
                        count={Math.ceil(getAbsenceList().length / itemsPerPage)}
                        page={page}
                        onChange={handleChange}
                        defaultPage={1}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        classes={{ ul: classes.paginator }}
                    />
                </div>
            }
        </Paper>
    );
}

