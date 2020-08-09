import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function CategoryCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const { category } = props
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Category
            </Typography>
                    <Typography variant="h5" component="h2">
                        {category.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color='primary'
                        onClick={() => history.push(`/categories/${category._id}`)}
                    >Show Courses</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CategoryCard;