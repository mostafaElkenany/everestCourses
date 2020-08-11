import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CourseCard from './CourseCard';
import WithUserHeaders from '../HOC/WithUserHeaders';
import UserContext from '../../context/UserContext';
import axios from '../../api/axios';
import Points from './Points';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

function CategoryCourses(props) {

    const { userData } = useContext(UserContext);

    const classes = useStyles();
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState({})
    const [userCourses, setUserCourses] = useState([]);
    const [points, setPoints] = useState(0)

    const { match: { params: { id } } } = props
    useEffect(() => {
        axios.get(`/categories/${id}`)
            .then(res => {
                setCourses(res.data.courses);
                setCategory(res.data.category);
            })
            .catch(err => console.log(err))
        if (userData) {
            axios.get(`/user/courses`)
                .then(res => {
                    setUserCourses(res.data.courses);
                    setPoints(res.data.points);
                })
                .catch(err => console.log(err))
        }
    }, [id, userData])

    const updateUserCourses = (newCourses) => {
        setUserCourses(newCourses)
    }

    const updatePoints = (points) => {
        setPoints(points)
    }

    return (
        <>
            <main>
                {userData ? <Points points={points} /> : null}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {category.name} Courses
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {courses.map((course) => {
                            return <CourseCard key={course._id} course={course} userCourses={userCourses}
                                updateUserCourses={updateUserCourses} updatePoints={updatePoints} />
                        }
                        )}
                    </Grid>
                </Container>
            </main>

        </>
    );
}

export default WithUserHeaders(CategoryCourses)
