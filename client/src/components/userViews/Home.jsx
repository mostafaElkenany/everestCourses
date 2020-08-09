import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CourseCard from './CourseCard'
import WithUserHeaders from '../HOC/WithUserHeaders'
import axios from '../../api/axios'

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

function Home() {
    const classes = useStyles();
    const [courses, setCourses] = useState([])
    useEffect(() => {
        axios.get('/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Welcome
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
            </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {courses.map((course) => <CourseCard key={course._id} course={course} />)}
                    </Grid>
                </Container>
            </main>

        </>
    );
}

export default WithUserHeaders(Home)
