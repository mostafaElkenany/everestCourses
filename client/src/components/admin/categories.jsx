import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import WithAdminHeaders from '../HOC/WithAdminHeaders';
import MaterialTable, { MTableToolbar } from 'material-table';
import Chip from '@material-ui/core/Chip';
import axios from '../../api/axios';
import { Modal } from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons'
const { confirm } = Modal;

function Category() {

    const [categories, setCategories] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('/dashboard/categories')
            .then(res => {
                // console.log(res.data);
                setCategories(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deleteCategory = (id) => {
        confirm({
            title: `Are you sure you want to delete this Category?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return axios.delete(`/dashboard/categories/${id}`)
                    .then(res => {
                        setCategories(categories.filter(cat => cat._id !== id))
                    })
                    .catch(err => console.log(err))
            },
            onCancel() { },
        });

    }
    const columns = [
        { title: 'Category Name', field: 'name' },
    ];

    return (
        <MaterialTable
            title="Categories"
            columns={columns}
            data={categories}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit category',
                    onClick: (event, rowData) => history.push(`/dashboard/categories/${rowData._id}/edit`)
                },
                rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete category',
                    onClick: (event, rowData) => deleteCategory(rowData._id)
                })
            ]}
            options={{
                actionsColumnIndex: -1,
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
                            <Chip label="+ Add Category" color="primary"
                                onClick={() => history.push('/dashboard/categories/add')}
                                style={{ marginRight: 5, backgroundColor:'green' }}
                            />
                        </div>
                    </div>
                ),
            }}
        />
    )
}

export default WithAdminHeaders(Category)
