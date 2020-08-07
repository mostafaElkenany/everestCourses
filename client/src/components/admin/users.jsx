import React, { useEffect, useState } from 'react';
import WithAdminHeaders from '../HOC/WithAdminHeaders';
import MaterialTable from 'material-table';
import Switch from '@material-ui/core/Switch';
import axios from '../../api/axios';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/dashboard/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => console.log(err))
    }, [users])

    const handleDisable = (id) => {
        axios.post(`/dashboard/users/${id}`)
            .then(res => {
                console.log(res.data);
                setUsers([...users, res.data]);

            })
            .catch(err => console.log(err.response))
    }

    const columns = [
        { title: 'E-mail', field: 'email' },
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        {
            title: 'Disable',
            field: 'disabled',
            render: rowData => <Switch checked={rowData.disabled} onChange={() => handleDisable(rowData._id)} />
        },
    ];

    return (
        <MaterialTable
            title="Users Accounts"
            columns={columns}
            data={users}
        />
    )
}

export default WithAdminHeaders(Users)
