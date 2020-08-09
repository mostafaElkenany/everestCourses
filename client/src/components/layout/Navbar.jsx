import React, { useContext, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

function NavBar() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("auth-token");
        setUserData(null)
        history.push("/login");
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand as={Link} to="/">Everest Courses</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" >  Home </Nav.Link>
                        <Nav.Link as={Link} to="/categories" >Categories</Nav.Link>
                        {
                            userData && userData.id ?
                                <Nav.Link as={Link} to="/mycourses" >My Courses</Nav.Link>
                                : null
                        }
                    </Nav>
                    {
                        userData && userData.id ?
                            <>
                                <Button aria-controls="simple-menu"
                                    variant="contained"
                                    // color="primary"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <AccountCircle />
                                    {userData.name}
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
                            </>
                            :
                            <>
                                <Button aria-controls="simple-menu" variant="contained"
                                    aria-haspopup="true" onClick={() => history.push('/login')}
                                >
                                    Login
                                </Button>
                                <Button aria-controls="simple-menu" variant="contained"
                                    aria-haspopup="true" onClick={() => history.push('/register')}
                                    style={{ marginLeft: 5 }}
                                >
                                    Register
                                </Button>
                            </>
                    }

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar
