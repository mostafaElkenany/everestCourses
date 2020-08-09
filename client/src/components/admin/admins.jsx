import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WithAdminHeaders from '../HOC/WithAdminHeaders';
import axios from '../../api/axios';
import MaterialTable, { MTableToolbar } from 'material-table';
import Chip from '@material-ui/core/Chip';

function Admins() {

    const [admins, setAdmins] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get('/dashboard/admins')
            .then(res => {
                setAdmins(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const columns = [
        { title: 'E-mail', field: 'email' },
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },

    ];

    return (
        <>
            <MaterialTable
                title="Admins Accounts"
                columns={columns}
                data={admins}
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{ padding: '10px 10px' }}>
                                <Chip label="+ Add Admin" color="primary"
                                    onClick={() => history.push('/dashboard/admins/add')}
                                    style={{ marginRight: 5, backgroundColor: 'green' }}
                                />
                            </div>
                        </div>
                    ),
                }}
            />
        </>
    )
}

export default WithAdminHeaders(Admins)
