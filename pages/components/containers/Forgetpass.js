import React, { useState } from 'react';
import { fireAuth } from '../../../services/firebase';
import {
    makeStyles,
    Button,
    TextField,
    Typography,
    Grid,
    Divider,
    Link,
    CircularProgress,
} from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { RESET } from '../../../state/mapState';
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
}));

const Forgetpass = ({ signup, signin }) => {
    const classes = useStyles();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(false);
    const setReset = useSetRecoilState(RESET);
    const handleForgetPassword = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setBtn(true);

        const form = e.target.elements;
        fireAuth.sendPasswordResetEmail(form.email.value)
            .then(() => {
                alert('note: After entering your email, please check your email and follow the link to reset your new password.')
                setReset(signin);
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
                            Welcome To CFC Library
                        </Typography>
                        <Typography color='textSecondary'>
                            Recover Your Password by filling the form below.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            <div
                className={classes.body}
            >
                <form
                    onSubmit={handleForgetPassword}
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
                                {loading ? <CircularProgress size={24} /> : 'Send'}
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
                                Don't have an account. <Link className={classes.link} onClick={signup} >Sign Up Now.</Link>
                            </Typography>
                            <Typography>
                                Ready have an account. <Link className={classes.link} onClick={signin} >Sign In Now.</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </>
    );
}

export default Forgetpass;