import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../../api/axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import UserContext from '../../context/UserContext'

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();

    const history = useHistory();
    const [userInput, setUserInput] = useState({});
    const [errors, setErrors] = useState({});
    const { setUserData } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const user = JSON.parse(window.atob(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
            setUserData(user)
            history.push("/");
        }
    }, [history, setUserData])

    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const user = { ...userInput };
        try {
            const response = await axios.post("/login", userInput);
            const token = response.data.token;
            const user = JSON.parse(window.atob(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
            // console.log(user);
            setUserData(user)
            localStorage.setItem('auth-token', token)
            history.push("/");
        } catch (error) {
            // console.log(error.response.data);
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
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {errors.message ?
                    <Alert severity="error">{errors.message}</Alert>
                    : null}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        error={errors.password ? true : false}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}