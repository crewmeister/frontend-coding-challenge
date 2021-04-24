// prettier-ignore
import { Divider, Drawer as DrawerMui, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FilterList from '@material-ui/icons/FilterList';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { router } from '../Router';
import { useRoutesActive } from 'react-typesafe-routes';
import { useHistory } from 'react-router-dom';
import { useActions } from '../actions';
import * as ConfigActions from '../actions/config';

export default function Drawer() {
    const classes = useStyles();
    const drawerOpen: boolean = useSelector((state: RootState) => state.drawerOpen);
    const configActions: typeof ConfigActions = useActions(ConfigActions);

    const handleDrawerToggle = () => {
        configActions.setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <Hidden mdUp>
                <DrawerMui
                    variant="temporary"
                    anchor={'left'}
                    open={drawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Content />
                </DrawerMui>
            </Hidden>
            <Hidden smDown>
                <DrawerMui
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Content />
                </DrawerMui>
            </Hidden>
        </>
    );
}

function Content() {
    const history = useHistory();

    const { home, absenceList } = useRoutesActive({
        home: router.home,
        absenceList: router.absenceList,
    });

    return (
        <div>
            <Divider />
            <List>
                <ListItem button onClick={() => history.push(router.home().$)} selected={home}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => history.push(router.absenceList().$)} selected={absenceList}>
                    <ListItemIcon>
                        <FilterList />
                    </ListItemIcon>
                    <ListItemText primary="Absence List" />
                </ListItem>
            </List>
        </div>
    );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    drawerHeader: { ...theme.mixins.toolbar },
    drawerPaper: {
        width: 250,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
}));
