import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../../api/axios'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WithAdminHeaders from '../HOC/WithAdminHeaders';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

function CategoryEditForm(props) {
    const classes = useStyles();
    const [category, setCategory] = useState({ "name": '' })
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        const { match: { params: { id } } } = props
        // console.log(id);
        axios.get(`/dashboard/categories/${id}`)
            .then(res => {
                setCategory(res.data);
            })
            .catch(err => console.log(err))
    }, [props])

    const history = useHistory();
    const handleChange = e => setCategory({ ...category, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { match: { params: { id } } } = props
        try {
            await axios.patch(`/dashboard/categories/${id}`, category);
            history.push('/dashboard/categories');
        } catch (error) {
            if (error.response.data.errors) {
                setErrors(error.response.data.errors.reduce((agg, cur) => {
                    return agg = Object.assign(agg, { [cur.param]: cur.msg })
                }, {}));
            } else {
                setErrors(error.response.data);
            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit Category
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                value={category.name}
                                fullWidth
                                id="name"
                                label="Category Name"
                                autoFocus
                                onChange={handleChange}
                                error={errors.name ? true : false}
                                helperText={errors.name}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save Changes
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default WithAdminHeaders(CategoryEditForm)
