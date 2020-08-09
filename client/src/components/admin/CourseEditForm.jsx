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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
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

function CourseEditForm(props) {
    const classes = useStyles();
    const [course, setCourse] = useState({ "name": '', "description": '', "number": 0 })
    const [categories, setCategories] = useState([])
    const [selectedCat, setSelectedCat] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const { match: { params: { id } } } = props
        // console.log(id);
        axios.get(`/dashboard/courses/${id}`)
            .then(res => {
                setCourse(res.data);
                setSelectedCat(res.data.categories.map(cat => cat._id))
            })
            .catch(err => console.log(err))

        axios.get('/dashboard/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }, [props])

    const history = useHistory();
    const handleChange = e => setCourse({ ...course, [e.target.name]: e.target.value });
    const handleCatChange = e => setSelectedCat(e.target.value);
    const handleImageChange = e => setCourse({ ...course, "image": e.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { match: { params: { id } } } = props
        const formData = new FormData()
        formData.append("name", course.name)
        formData.append("description", course.description)
        formData.append("points", course.points)
        formData.append("categories", JSON.stringify(selectedCat))
        formData.append("image", course.image)
        try {
            await axios.patch(`/dashboard/courses/${id}`, formData);
            history.push('/dashboard/courses');
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
                    Edit Course
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                value={course.name}
                                fullWidth
                                id="name"
                                label="Course Name"
                                autoFocus
                                onChange={handleChange}
                                error={errors.name ? true : false}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                value={course.description}
                                fullWidth
                                multiline
                                rows={3}
                                id="description"
                                label="Description"
                                name="description"
                                onChange={handleChange}
                                error={errors.description ? true : false}
                                helperText={errors.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="points"
                                label="Points"
                                type="number"
                                name="points"
                                onChange={handleChange}
                                error={errors.points ? true : false}
                                helperText={errors.points}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="demo-mutiple-name-label">Category</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                value={selectedCat}
                                multiple
                                input={<Input />}
                                MenuProps={MenuProps}
                                onChange={handleCatChange}
                                error={errors.categories ? true : false}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat._id} value={cat._id} >
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.categories}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="demo-mutiple-name-label">Image</InputLabel>
                            <Input
                                type="file"
                                name="image"
                                id="image"
                                onChange={handleImageChange}
                                error={errors.message ? true : false}
                            />
                            <FormHelperText>{errors.message}</FormHelperText>
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

export default WithAdminHeaders(CourseEditForm)
