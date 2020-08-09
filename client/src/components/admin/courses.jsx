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

function Course() {

    const [courses, setCourses] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('/dashboard/courses')
            .then(res => {
                // console.log(res.data);
                setCourses(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deleteCourse = (id) => {
        confirm({
            title: `Are you sure you want to delete this Course?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return axios.delete(`/dashboard/courses/${id}`)
                    .then(res => {
                        setCourses(courses.filter(course => course._id !== id))
                    })
                    .catch(err => console.log(err))
            },
            onCancel() { },
        });

    }

    const columns = [
        { title: 'Course Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Points', field: 'points' },
        {
            title: 'Categories',
            field: 'categories',
            render: rowData => rowData.categories.map(cat => <Chip key={cat._id} label={cat.name} />)
        },
        {
            title: 'Image',
            field: 'image',
            render: rowData => <img src={`/${rowData.image}`} alt="" style={{ width: 50, borderRadius: '50%' }} />
        }

    ];

    return (
        <MaterialTable
            title="Courses"
            columns={columns}
            data={courses}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit course',
                    onClick: (event, rowData) => history.push(`/dashboard/courses/${rowData._id}/edit`)
                },
                rowData => ({
                    icon: 'delete',
                    tooltip: 'Delete course',
                    onClick: (event, rowData) => deleteCourse(rowData._id)
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
                            <Chip label="+ Add Course" color="primary"
                                onClick={() => history.push('/dashboard/courses/add')}
                                style={{ marginRight: 5, backgroundColor:'green' }}
                            />
                        </div>
                    </div>
                ),
            }}
        />
    )
}

export default WithAdminHeaders(Course)
