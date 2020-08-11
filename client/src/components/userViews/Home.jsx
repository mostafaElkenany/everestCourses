import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import CourseCard from './CourseCard'
import WithUserHeaders from '../HOC/WithUserHeaders'
import UserContext from '../../context/UserContext';
import Points from './Points';
import axios from '../../api/axios'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            margin: theme.spacing(2),
        },
    },
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

function Home() {

    const { userData } = useContext(UserContext);

    const history = useHistory();
    const classes = useStyles();
    const [courses, setCourses] = useState([])
    const [points, setPoints] = useState(0)
    const [userCourses, setUserCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        //get courses paginated
        axios.get(`/courses?page=${page}&limit=9`)
            .then(res => {
                setCourses(res.data.courses);
                setPageCount(res.data.pages);
            })
            .catch(err => console.log(err))
        //get user courses and points
        if (userData) {
            axios.get(`/user/courses`)
                .then(res => {
                    setUserCourses(res.data.courses);
                    setPoints(res.data.points);
                })
                .catch(err => console.log(err))
        }
    }, [userData, page])

    const updateUserCourses = (newCourses) => {
        setUserCourses(newCourses)
    }

    const updatePoints = (points) => {
        setPoints(points)
    }

    const handlePage = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <main>
                {userData ? <Points points={points} /> : null}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {userData ? `Hi,${userData.name.split(' ')[0]}` : "Welcome"}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Build skills with courses, certificates,
                            and degrees online from world-class universities and companies.

                        {userData ? null : <Button onClick={() => history.push('/register')}
                                variant="contained" size="small" color="primary">
                                Join For Free
                            </Button>}
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
                    <div className={classes.root}>
                        <Typography>Page: {page}</Typography>
                        <Pagination count={pageCount} page={page} onChange={handlePage} />
                    </div>
                </Container>
            </main>

        </>
    );
}

export default WithUserHeaders(Home)
