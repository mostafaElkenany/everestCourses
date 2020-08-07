import React, { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function NavBar() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const logout = ()=>{
        localStorage.removeItem("auth-token");
        setUserData(null)
        history.push("/login");
    }
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/home"  >  Home </Nav.Link>
                        <Nav.Link as={Link} to="/categories" >Categories</Nav.Link>
                        <Nav.Link as={Link} to="/courses" >Courses</Nav.Link>
                    </Nav>
                    {
                        userData.id ?
                            <Nav.Link as={Link} onClick={logout} > Logout </Nav.Link>
                            :
                            <>
                                <Nav.Link as={Link} to="/login" > Login </Nav.Link>
                                <Nav.Link as={Link} to="/register" > Register </Nav.Link>
                            </>
                    }

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar
