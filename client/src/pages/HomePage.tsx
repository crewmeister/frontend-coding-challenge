import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

export function HomePage() {
    const classes = useStyles();
    const event = {
        title: "My Title",
        description: "My Description",
        startTime: "2018-10-07T10:30:00+10:00",
        endTime: "2018-10-07T12:00:00+10:00",
        location: "10 Carlotta St, Artarmon NSW 2064, Australia"
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Please proceed to Absence List screen to view the staff that is absent and their details
            </Typography>
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        height: "100%",
        textAlign: "center",
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },

    centerContainer: {
        flex: 1,
        height: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },

    button: {
        marginTop: 20,
    },
});
