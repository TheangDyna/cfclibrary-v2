import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { CLOSE } from '../../../state/mapState';
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
    Switch,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { addBookCategories, addBookSubCategories } from '../../../state/model';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';


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
            padding: 20,
        },
        body: {
            marginTop: theme.spacing(2)
        },
        divider: {
            marginTop: 10
        },
        phoneNumber__divider: {
            height: 20,
            marginLeft: 10,
            marginRight: 5,
            color: '#000000',
            background: '#808080',
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
        cover: {
            width: 100,
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

const AddBooks = () => {
    const classes = useStyles();
    const setClose = useSetRecoilState(CLOSE);
    const [viewCover, setViewCover] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [btn, setBtn] = useState(false);
    const [values, setValues] = useState({
        categories: '',
        subCategories: '',
        condition: '',

    });
    const [checked, setChecked] = useState(false);
    const switchHandle = (event) => {
        setChecked(event.target.checked);
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setBtn(true);
        const form = e.target.elements;
        const title = form.title.value;
        const author = form.author.value;
        const sponsor = form.sponsor.value;
        const category = form.category.value;
        const subCategory = form.subCategory.value;
        const condition = form.condition.value;
        const amount = form.amount.value;
        const descripsion = form.descripsion.value;
        const recommend = e.target.elements.recommend.checked;
        const stock = Number(amount);
        const today = new Date();
        const createAt = today.toLocaleDateString();
        const createAtN = today.getTime();
        if (form.cover) {
            const cover = form.cover.files[0];
            const storageRef = fireStorage.ref('covers')
            const fileRef = storageRef.child(title + ', ' + author);
            fileRef.put(cover)
                .then(() => {
                    fileRef.getDownloadURL()
                        .then((url) => {
                            firestore.collection('books')
                                .add({
                                    coverURL: url,
                                    title: title,
                                    author: author,
                                    sponsor: sponsor,
                                    category: category,
                                    subCategory: subCategory,
                                    condition: condition,
                                    amount: amount,
                                    stock: stock,
                                    recommend: recommend,
                                    descripsion: descripsion,
                                    createAt: createAt,
                                    createAtN: createAtN,
                                    borrow: 0
                                }).then(() => {
                                    setClose(false);
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
            setError("Please Choose book cover");
            setLoading(false);
            setBtn(false);
        }
    };
    const handleViewCover = (e) => {
        const cover = e.target.files[0];
        setViewCover(cover);
    };
    return (
        <div>
            <div className={classes.addBook__form}>
                <Card className={classes.addBook__card}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.head}>
                            <IconButton className={classes.closeDialogButton} onClick={() => (setClose(false))}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant='h5'>
                                Adding New Book
                            </Typography>
                            <Typography color='textSecondary'>
                                Adding the new book(s) by filling the form below.
                            </Typography>
                        </div>
                        <Divider className={classes.divider} />
                        <div className={classes.body}>
                            <Grid container spacing={2}>

                                <Grid item sm={12} md={12} lg={12}>
                                    {
                                        viewCover == null ?
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
                                                                    onChange={handleViewCover}
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
                                                                className={classes.cover}
                                                                variant='rounded'
                                                            >
                                                                <ImageRoundedIcon fontSize='large' />
                                                            </Avatar>
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
                                                                    onChange={handleViewCover}
                                                                    name='cover'
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
                                                                variant='rounded'
                                                                src={window.URL.createObjectURL(viewCover)}
                                                                className={classes.cover}
                                                            />
                                                        </div>
                                                    </Badge>
                                                </div>
                                            </Grid>
                                    }
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        label='Title'
                                        fullWidth
                                        name='title'
                                        required
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        label='Author'
                                        fullWidth
                                        name='author'
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        required
                                        label='Sponsor'
                                        fullWidth
                                        name='sponsor'
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        select
                                        required
                                        label='Category'
                                        fullWidth
                                        size='small'
                                        name='category'
                                        onChange={handleChange('categories')}
                                        value={values.categories}

                                    >
                                        {addBookCategories.map((bookCategory, index) => (
                                            <MenuItem
                                                key={index}
                                                value={bookCategory.title}
                                            >
                                                {bookCategory.title}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={12} md={12} lg={6}>
                                    <TextField
                                        variant='outlined'
                                        select
                                        label='Sub Category'
                                        fullWidth
                                        size='small'
                                        name='subCategory'
                                        onChange={handleChange('subCategories')}
                                        value={values.subCategories}

                                    >
                                        {addBookSubCategories.map((bookCategory, index) => (
                                            <MenuItem
                                                key={index}
                                                value={bookCategory.value}
                                            >
                                                {bookCategory.title}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={12} md={12} lg={4}>
                                    <TextField
                                        variant='outlined'
                                        select
                                        size='small'
                                        required
                                        label='Condition'
                                        fullWidth
                                        name='condition'
                                        onChange={handleChange('condition')}
                                        value={values.condition}

                                    >
                                        <MenuItem value='new'>New</MenuItem>
                                        <MenuItem value='medium'>Medium</MenuItem>
                                        <MenuItem value='old'>Old</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item sm={12} md={12} lg={4}>
                                    <TextField
                                        variant='outlined'
                                        type='number'
                                        size='small'
                                        className={classes.amount}
                                        required
                                        label='Amount'
                                        fullWidth
                                        name='amount'
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch color='primary' checked={checked} onChange={switchHandle} name='recommend' />
                                        }
                                        label='Recommend'
                                    />
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}>
                                    <TextField
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        multiline
                                        rows={5}
                                        required
                                        label='Descripsion'
                                        fullWidth
                                        name='descripsion'
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
                                        {loading ? <CircularProgress size={24} /> : 'Add'}
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

export default AddBooks;