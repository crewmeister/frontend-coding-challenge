import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

export function HomePage() {
    const classes = useStyles();

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
