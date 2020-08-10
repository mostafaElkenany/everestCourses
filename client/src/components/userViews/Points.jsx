import React from 'react'
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

function Points(props) {

    const { points } = props;

    const classes = useStyles();

    return (
        <div className={classes.root} style={{ float: "right", margin: 10 }}>
            <Typography variant="h5" color="textSecondary">
                My Points:
            </Typography>
            <Chip
                icon={<DoneIcon />}
                label={points}
                clickable
                color="primary"
            />
        </div>
    )
}

export default Points
