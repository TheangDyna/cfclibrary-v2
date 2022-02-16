import React, { useState } from 'react';
import { fireAuth } from '../../../services/firebase';
import { useRouter } from 'next/router';
import {
    makeStyles,
    Button,
    TextField,
    Typography,
    Grid,
    IconButton,
    InputAdornment,
    Divider,
    Link,
    CircularProgress,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '10px 20px',
        width: 500,
    },
    head: {
        margin: '20px 0',
        textAlign: 'center'
    },
    body: {
        margin: '20px 0'
    },
    foot: {
        margin: '20px 0',
        textAlign: 'center'
    },
    link: {
        cursor: 'pointer'
    },
    err: {
        textAlign: 'center',
        color: 'red',
    },
    // background: '#FF5403',
}));

const Signin = ({ signup, forgetpass }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    const pass = {
        endAdornment: (
            <InputAdornment position='end'>
                <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )
    };
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(false);
    const handleUserSignin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setBtn(true);
        const form = e.target.elements;
        fireAuth.signInWithEmailAndPassword(form.email.value, form.pass.value)
            .then(() => {
                router.push('/home');
            }).catch((err) => {
                setError(err.message);
                setLoading(false);
                setBtn(false);
            })
    };
    return (
        <>
            <div
                className={classes.head}
            >
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                        <Typography variant='h5'>
                            Sign In To CFC Library
                        </Typography>
                        <Typography color='textSecondary'>
                            Sign in your account by filling the form below.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            <div
                className={classes.body}
            >
                <form
                    onSubmit={handleUserSignin}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={12} lg={12}>
                            <TextField
                                variant='outlined'
                                name='email'
                                type='email'
                                size='small'
                                required
                                label='Email'
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <TextField
                                variant='outlined'
                                name='pass'
                                type='password'
                                size='small'
                                required
                                label='Password'
                                fullWidth
                                type={values.showPassword ? 'text' : 'password'}
                                InputProps={pass}
                            />
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <Typography
                                className={classes.err}
                                variant='body2'
                            >
                                {error}
                            </Typography>
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <Button
                                variant='contained'
                                fullWidth
                                color='primary'
                                type='submit'
                                disabled={btn}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Sign In'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <div
                    className={classes.foot}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={12} lg={12}>
                            <Typography>
                                Don't have an account. <Link className={classes.link} onClick={signup}>Sign Up Now.</Link>
                            </Typography>
                            <Typography>
                                <Link className={classes.link} onClick={forgetpass}>Forget Password.</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </>
    );
}

export default Signin;