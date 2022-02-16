import React, { useState } from 'react';
import { fireAuth, fireStorage, firestore } from '../../../services/firebase';
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
    CircularProgress,
    Avatar,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    MenuItem,
    Link,
    Badge
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
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
        cursor: 'pointer',
    },
    err: {
        textAlign: 'center',
        color: 'red',
    },
    radio: {
        paddingLeft: 14
    },
    badgeProfile: {
        textAlign: 'center',
    },
    profile: {
        width: 100,
        height: 100,
    },
    uploadProfile: {
        display: 'none',
    },
    bgBtnUl: {
        width: 35,
        height: 35,
        background: '#FFFFFF'

    }
}));

const Signup = ({ signin }) => {
    const router = useRouter();
    const classes = useStyles();
    const [viewProfile, setViewprofile] = useState(null);
    const [grade, setGrade] = useState('');
    const handleChangeGrade = (e) => {
        setGrade(e.target.value);
    };
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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(false);
    const handleUserSignup = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setBtn(true);
        const form = e.target.elements;
        const fname = form.fname.value;
        const lname = form.lname.value;
        const gender = form.gender.value;
        const birthDate = form.birthDate.value;
        const grade = form.grade.value;
        const email = form.email.value;
        const pass = form.pass.value;
        const today = new Date();
        const createAt = today.toLocaleDateString();
        const createAtN = today.getTime();

        if (form.profile) {
            const profile = form.profile.files[0];
            fireAuth.createUserWithEmailAndPassword(form.email.value, form.pass.value)
                .then((user) => {
                    const uid = user.user.uid;
                    const storageRef = fireStorage.ref('profiles')
                    const fileRef = storageRef.child(lname + ', ' + email);
                    fileRef.put(profile)
                        .then(() => {
                            fileRef.getDownloadURL()
                                .then((url) => {
                                    firestore.collection('users')
                                        .add({
                                            uid: uid,
                                            profileURL: url,
                                            fname: fname,
                                            lname: lname,
                                            gender: gender,
                                            birthDate: birthDate,
                                            grade: grade,
                                            email: email,
                                            password: pass,
                                            createAt: createAt,
                                            createAtN: createAtN,
                                            save: {},
                                            boBo:{}
                                        }).then(() => {
                                            router.push('/home');
                                        }).catch((err) => {
                                            setError(err.message);
                                            setLoading(false);
                                            setBtn(false);
                                        })
                                }).catch((err) => {
                                    setError(err.message);
                                    setLoading(false);
                                    setBtn(false);
                                })
                        })
                        .catch((err) => {
                            setError(err.message);
                            setLoading(false);
                            setBtn(false);
                        })
                }).catch((err) => {
                    setError(err.message);
                    setLoading(false);
                    setBtn(false);
                })
        } else {
            setError("Please Choose Your Profile");
            setLoading(false);
            setBtn(false);
        }
    };
    const handleViewProfile = (e) => {
        const profile = e.target.files[0];
        setViewprofile(profile);
    };
    return (
        <>
            <div
                className={classes.head}
            >
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                        <Typography variant='h5'>
                            Sign Up To CFC Library
                        </Typography>
                        <Typography color='textSecondary'>
                            Create your new account by filling the form below.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            <div
                className={classes.body}
            >
                <form
                    onSubmit={handleUserSignup}
                >
                    <Grid container spacing={2}>
                        {
                            viewProfile == null ?
                                <Grid item sm={12} md={12} lg={12}>
                                    <div
                                        className={classes.badgeProfile}
                                    >
                                        <Badge
                                            overlap='circular'
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            badgeContent={
                                                <div>
                                                    <input
                                                        accept='image/*'
                                                        className={classes.uploadProfile}
                                                        id='icon-button-file'
                                                        type='file'
                                                        onChange={handleViewProfile}
                                                    />
                                                    <label htmlFor='icon-button-file'>
                                                        <IconButton component='span' className={classes.bgBtnUl} >
                                                            <CameraAltRoundedIcon />
                                                        </IconButton>
                                                    </label>
                                                </div>
                                            }
                                        >
                                            <div>
                                                <Avatar
                                                    className={classes.profile}
                                                />
                                            </div>
                                        </Badge>
                                    </div>
                                </Grid>
                                :
                                <Grid item sm={12} md={12} lg={12}>
                                    <div
                                        className={classes.badgeProfile}
                                    >
                                        <Badge
                                            overlap='circular'
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            badgeContent={
                                                <div>
                                                    <input
                                                        accept='image/*'
                                                        className={classes.uploadProfile}
                                                        id='icon-button-file'
                                                        type='file'
                                                        onChange={handleViewProfile}
                                                        name='profile'
                                                    />
                                                    <label htmlFor='icon-button-file'>
                                                        <IconButton component='span' className={classes.bgBtnUl} >
                                                            <CameraAltRoundedIcon />
                                                        </IconButton>
                                                    </label>
                                                </div>
                                            }
                                        >
                                            <div>
                                                <Avatar
                                                    src={window.URL.createObjectURL(viewProfile)}
                                                    className={classes.profile}
                                                />
                                            </div>
                                        </Badge>
                                    </div>
                                </Grid>
                        }
                        <Grid item sm={12} md={12} lg={12}>
                            <Grid container spacing={1}>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        required
                                        label='First Name'
                                        fullWidth
                                        name='fname'
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        required
                                        label='Last Name'
                                        fullWidth
                                        name='lname'
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <FormControl required className={classes.radio}>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    name='gender'
                                >
                                    <div>
                                        <FormControlLabel value='Female' control={<Radio size='small' color='primary' required />} label='Female' />
                                        <FormControlLabel value='Male' control={<Radio size='small' color='primary' required />} label='Male' />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <Grid container spacing={1}>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type= 'date'
                                        format={'DD/MM/YYYY'}
                                        size='small'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        label='Birth Date'
                                        fullWidth
                                        name='birthDate'

                                    />
                                </Grid>


                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        select
                                        size='small'
                                        required
                                        label='Grade'
                                        fullWidth
                                        value={grade}
                                        onChange={handleChangeGrade}
                                        name='grade'
                                    >
                                        <MenuItem value='10 A'>10 A</MenuItem>
                                        <MenuItem value='10 B'>10 B</MenuItem>
                                        <MenuItem value='11 A'>11 A</MenuItem>
                                        <MenuItem value='11 B'>11 B</MenuItem>
                                        <MenuItem value='12 A'>12 A</MenuItem>
                                        <MenuItem value='12 B'>12 B</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} md={12} lg={12}>
                            <TextField
                                variant='outlined'
                                type='email'
                                size='small'
                                required
                                label='Email'
                                fullWidth
                                name='email'
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
                                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
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
                                Ready have an account. <Link className={classes.link} onClick={signin}>Sign In Now.</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default Signup;