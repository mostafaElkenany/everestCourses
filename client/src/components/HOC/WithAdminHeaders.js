import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const WithAdminHeaders = (Component) => {
    const AdminHeaders = (props) => {

        const classes = useStyles();
        const { setUserData } = useContext(UserContext);
        const history = useHistory();
        const logout = () => {
            localStorage.removeItem("auth-token");
            setUserData(null)
            history.push("/login");
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <Link to="/dashboard/admins">
                            <ListItem button key={"Admins"}>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={"Admins"} />
                            </ListItem>
                        </Link>
                        <Link to="/dashboard/users">
                            <ListItem button key={"Users"}>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={"Users"} />
                            </ListItem>
                        </Link>
                        <Link to="/dashboard/categories">
                            <ListItem button key={"Categories"}>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={"Categories"} />
                            </ListItem>
                        </Link>
                        <Link to="/dashboard/courses">
                            <ListItem button key={"Courses"}>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={"Courses"} />
                            </ListItem>
                        </Link>
                        <Link to="#" onClick={logout} >
                            <ListItem button key={"Logout"}>
                                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Component {...props} />
                </main>
            </div>
        );
    }
    return AdminHeaders;
}

export default WithAdminHeaders
