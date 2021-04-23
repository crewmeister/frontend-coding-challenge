// imports
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { Router } from "react-router-dom";
import { RouterSwitch } from 'react-typesafe-routes';
import { Drawer } from "./components/Drawer";
import { history } from "./configureStore";
import { withRoot } from "./withRoot";
import { router } from "./Router";

function App() {
    const classes = useStyles();

    return (
        <Router history={history}>
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <Drawer />
                    <div className={classes.content}>
                        <RouterSwitch router={router} />
                    </div>
                </div>
            </div>
        </Router>
    );
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
    },
    appFrame: {
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: "absolute",
    },
    navIconHide: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "calc(100% - 56px)",
        marginTop: 56,
        overflowY: 'auto',
        [theme.breakpoints.up("sm")]: {
            height: "calc(100% - 64px)",
            marginTop: 64,
        },
    },
}));

export default withRoot(App);
