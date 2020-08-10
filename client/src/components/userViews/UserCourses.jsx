import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CourseCard from './CourseCard'
import WithUserHeaders from '../HOC/WithUserHeaders'
import axios from '../../api/axios'
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

    const myCoursesFlag = true;
    const classes = useStyles();
    const [userCourses, setUserCourses] = useState([])
    const [points, setPoints] = useState(0)

    useEffect(() => {
        axios.get(`/user/courses`)
            .then(res => {
                setUserCourses(res.data.courses);
                setPoints(res.data.points);
            })
            .catch(err => console.log(err))
    }, [])

    const updateUserCourses = (newCourses) => {
        setUserCourses(newCourses)
    }

    const updatePoints = (points) => {
        setPoints(points)
    }

    return (
        <>
            <main>
                <Points points={points} />
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            My Courses
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {userCourses.map((userCourse) => {
                            return <CourseCard key={userCourse._id} updateUserCourses={updateUserCourses}
                                updatePoints={updatePoints} course={userCourse.course}
                                status={userCourse.status} myCoursesFlag={myCoursesFlag} />
                        }
                        )}
                    </Grid>
                </Container>
            </main>

        </>
    );
}

export default WithUserHeaders(CategoryCourses)
