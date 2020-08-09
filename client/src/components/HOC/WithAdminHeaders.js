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
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

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
        const { userData, setUserData } = useContext(UserContext);
        const history = useHistory();
        const logout = () => {
            localStorage.removeItem("auth-token");
            setUserData(null)
            history.push("/login");
        }
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };
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
                    <Button aria-controls="simple-menu"
                        variant="contained"
                        color="primary"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        {userData.name}
                        <ArrowDropDownCircleIcon />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                    <List>
                        <Link to="/dashboard/admins">
                            <ListItem button key={"Admins"}>
                                <ListItemIcon> <GroupIcon /> </ListItemIcon>
                                <ListItemText primary={"Admins"} />
                            </ListItem>
                        </Link>
                        <Link to="/dashboard/users">
                            <ListItem button key={"Users"}>
                                <ListItemIcon> <PeopleOutlineIcon /> </ListItemIcon>
                                <ListItemText primary={"Users"} />
                            </ListItem>
                        </Link>
                        <Link to="/dashboard/categories">
                            <ListItem button key={"Categories"}>
                                <ListItemIcon> <CategoryIcon /> </ListItemIcon>
                                <ListItemText primary={"Categories"} />
                            </ListItem>
                        </Link>
                        <Link to="/dashboard/courses">
                            <ListItem button key={"Courses"}>
                                <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
                                <ListItemText primary={"Courses"} />
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
