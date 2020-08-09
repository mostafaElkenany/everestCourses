import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CategoryCard from './CategoryCard'
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

function Categories() {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Categories
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {categories.map((category) => <CategoryCard key={category._id} category={category} />)}
                    </Grid>
                </Container>
            </main>

        </>
    );
}

export default WithUserHeaders(Categories)
