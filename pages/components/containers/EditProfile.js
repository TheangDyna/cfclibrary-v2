import React, { useState } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { CLEDU, CURRENTUSER, FETCHUSER} from '../../../state/mapState';
import { fireStorage, firestore } from '../../../services/firebase';
import {
    makeStyles,
    TextField,
    Grid,
    Typography,
    IconButton,
    Divider,
    MenuItem,
    Card,
    Button,
    Badge,
    Avatar,
    CircularProgress,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';


const useStyles = makeStyles((theme) => {
    return {
        addBook__form: {
            width: '100%',
        },
        addBook__button: {
            display: 'block',
            margin: '0 auto'
        },
        addBook__card: {
            padding: 10
        },
        body: {
            marginTop: theme.spacing(2)
        },
        divider: {
            marginTop: 10
        },
        amount: {
            '& input[type=number]': {
                '-moz-appearance': 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            }
        },
        radio: {
            paddingLeft: 14
        },
        bottomLink: {
            display: 'flex',
            justifyContent: 'center',
        },
        closeDialogButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
        link: {
            cursor: 'pointer'
        },

        badgeCover: {
            textAlign: 'center',
        },
        profile: {
            width: 120,
            height: 120
        },
        uploadProfile: {
            display: 'none',
        },
        bgBtnUl: {
            width: 42,
            height: 42,
            background: '#FFFFFF'

        },
        err: {
            textAlign: 'center',
            color: 'red',
        },
        head: {
            textAlign: 'center'
        }

    }
});

const EditProfile = () => {
    const classes = useStyles();
    const setClUpU = useSetRecoilState(CLEDU);
    const [viewProfile, setViewProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(false);
    const [user, setUser] = useRecoilState(FETCHUSER);
    const setCUser = useSetRecoilState(CURRENTUSER);
    const handleSubmit = (e) => {
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
        const today = new Date();
        const createAt = today.toLocaleDateString();
        if (form.profile) {
            const profile = form.profile.files[0];
            const storageRef = fireStorage.ref('profiles')
            const fileRef = storageRef.child(lname + ', ' + email);
            fileRef.put(profile)
                .then(() => {
                    fileRef.getDownloadURL()
                        .then((url) => {
                            firestore.collection('users')
                                .doc(user.id)
                                .update({
                                    profileURL: url,
                                    fname: fname,
                                    lname: lname,
                                    gender: gender,
                                    birthDate: birthDate,
                                    grade: grade,
                                    email: email,
                                    updateAt: createAt,
                                }).then(() => {
                                    setClUpU(false);
                                    setCUser(user);
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
        } else {

            firestore.collection('users')
                .doc(user.id)
                .update({
                    fname: fname,
                    lname: lname,
                    gender: gender,
                    birthDate: birthDate,
                    grade: grade,
                    email: email,
                    updateAt: createAt,
                }).then(() => {
                    setClUpU(false);
                    setCUser(user);
                }).catch((err) => {
                    setError(err.message);
                    setLoading(false);
                    setBtn(false);
                })

        }
    };
    const handleViewProfile = (e) => {
        const profile = e.target.files[0];
        setViewProfile(profile);
    };
    const [touched, setTouched] = useState(false);
    return (
        <div>
            <div className={classes.addBook__form}>
                <Card className={classes.addBook__card}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.head}>
                            <IconButton className={classes.closeDialogButton} onClick={() => (setClUpU(false))}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant='h5'>
                                Edit Profile
                            </Typography>
                            <Typography color='textSecondary'>
                                Edit Your Profile by filling the form below.
                            </Typography>
                        </div>
                        <Divider className={classes.divider} />
                        <div className={classes.body}>
                            <Grid container spacing={2}>

                                <Grid item sm={12} md={12} lg={12}>
                                    {
                                        viewProfile == null ?
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div
                                                    className={classes.badgeCover}
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
                                                                src={user.profileURL}
                                                                className={classes.profile}
                                                            />
                                                        </div>
                                                    </Badge>
                                                </div>
                                            </Grid>
                                            :
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div
                                                    className={classes.badgeCover}
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
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        required
                                        label='First Name'
                                        fullWidth
                                        name='fname'
                                        value={user.fname}
                                        onChange={(e) => setUser((prev) => ({ ...prev, fname: e.target.value }))}
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
                                        value={user.lname}
                                        onChange={(e) => setUser((prev) => ({ ...prev, lname: e.target.value }))}
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <FormControl required className={classes.radio}>
                                        <FormLabel>Gender</FormLabel>
                                        <RadioGroup
                                            name='gender'
                                            value={user.gender}
                                            onChange={(e) => setUser((prev) => ({ ...prev, gender: e.target.value }))}
                                        >
                                            <div>
                                                <FormControlLabel value='Female' control={<Radio size='small' color='primary' required />} label='Female' />
                                                <FormControlLabel value='Male' control={<Radio size='small' color='primary' required />} label='Male' />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type='date'
                                        size='small'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        label='Birth Date'
                                        fullWidth
                                        name='birthDate'
                                        value={user.birthDate}
                                        onChange={(e) => setUser((prev) => ({ ...prev, birthDate: e.target.value }))}

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
                                        name='grade'
                                        value={user.grade}
                                        onChange={(e) => setUser((prev) => ({ ...prev, grade: e.target.value }))}
                                    >
                                        <MenuItem value='10 A'>10 A</MenuItem>
                                        <MenuItem value='10 B'>10 B</MenuItem>
                                        <MenuItem value='11 A'>11 A</MenuItem>
                                        <MenuItem value='11 B'>11 B</MenuItem>
                                        <MenuItem value='12 A'>12 A</MenuItem>
                                        <MenuItem value='12 B'>12 B</MenuItem>
                                    </TextField>
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
                                        value={user.email}
                                        onChange={()=>(setTouched(true))}
                                        onBlur={()=>(setTouched(false))}   
                                        error = {touched}
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <Typography
                                        className={classes.err}
                                        variant='body2'
                                    >
                                        {error}
                                        {touched && `You can't Edit email`}
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
                                        {loading ? <CircularProgress size={24} /> : 'Edit'}
                                    </Button>
                                </Grid>
                            </Grid>

                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default EditProfile;