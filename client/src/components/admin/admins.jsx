import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import WithAdminHeaders from '../HOC/WithAdminHeaders';
import axios from '../../api/axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function Admins() {

    const [admins, setAdmins] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        axios.get('/dashboard/admins')
            .then(res => {
                setAdmins(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div style={{ padding: '10px 10px' }}>
                <Button variant="success" as={Link} to="/dashboard/admins/add" >+ Add Admin</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>E-mail</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.email}>
                                <TableCell component="th" scope="row">
                                    {admin.email}
                                </TableCell>
                                <TableCell align="right">{admin.firstName}</TableCell>
                                <TableCell align="right">{admin.lastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default WithAdminHeaders(Admins)
