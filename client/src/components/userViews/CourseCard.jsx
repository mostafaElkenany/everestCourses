import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context/UserContext';
import axios from '../../api/axios';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function CourseCard(props) {

    const { userData } = useContext(UserContext);

    const {
        course,
        myCoursesFlag,
        userCourses,
        status,
        updateUserCourses,
        updatePoints
    } = props;

    // find single user course from user courses array
    let userCourse = {};
    if (userData && !myCoursesFlag) {
        userCourse = userCourses.find((userCourse) => userCourse.course._id === course._id)
    }

    const classes = useStyles();
    const history = useHistory();

    const enroll = async (course) => {
        try {
            const response = await axios.post(`/user/courses/${course._id}`);
            updateUserCourses(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const unenroll = async (course) => {
        try {
            const response = await axios.delete(`/user/courses/${course._id}`);
            updateUserCourses(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const changeStatus = async (course) => {
        try {
            const response = await axios.patch(`/user/courses/${course._id}`);
            updateUserCourses(response.data.courses);
            updatePoints(response.data.points)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={`/${course.image}`}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {course.name}
                    </Typography>
                    <Typography>
                        {course.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        userData ?
                            userCourse || myCoursesFlag ?
                                <>
                                    <Button onClick={() => unenroll(course)}
                                        size="small" color="secondary" variant="contained">
                                        UnEnroll
                                    </Button>
                                    <FormControlLabel
                                        value="start"
                                        control={
                                            <Checkbox
                                                checked={userCourse.status || status}
                                                onChange={() => changeStatus(course)}
                                                name="status"
                                                color="primary" />
                                        }
                                        label="Mark as finished"
                                        labelPlacement="start"
                                    />
                                </>
                                :
                                <Button onClick={() => enroll(course)} variant="contained"
                                    size="small" color="primary">
                                    Enroll
                                </Button>
                            :
                            <Button onClick={() => history.push('/login')} variant="contained"
                                size="small" color="primary">
                                Enroll
                            </Button>
                    }

                </CardActions>
            </Card>
        </Grid>
    )
}

export default CourseCard
