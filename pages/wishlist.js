import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../services/firebase';
import {
    makeStyles,
    Button,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    TextField,
    MenuItem,
    Dialog,
    CircularProgress,
} from '@material-ui/core';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DetailBooks from './components/containers/DetialBook';
import Banner from './components/presentaions/Banner';
import { bookCategories } from '../state/model';
import { CLOSE, RBOOKS, CLDE, BOOK, CURRENTUSER, USERSAVE } from '../state/mapState';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';



const useStyles = makeStyles((theme) => ({
    card: {
        margin: '20px 10px 0px 10px',
        width: 180
    },
    container: {
        marginTop: 20
    },
    card__img: {
        width: '100%',
        height: 200,
        marginBottom: theme.spacing(1)
    },
    card__content: {
        padding: '0 10px'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    },
    card__imgSearch: {
        width: '90%',
        height: 120,
        margin: 10
    },
    loading: {
        margin: '100px auto 0px auto',
        width: 50
    },
}));

const wishList = () => {
    const [categories, setCategories] = useState('');
    const classes = useStyles();
    const [valueSearch, setValueSearch] = useState('');
    const [clDe, setClDe] = useRecoilState(CLDE);
    const rBooks = useRecoilValue(RBOOKS);
    const [loading, setLoading] = useState(false);
    const setBook = useSetRecoilState(BOOK);
    const user = useRecoilValue(CURRENTUSER);
    const setUserSave = useSetRecoilState(USERSAVE);
    console.log(user);
    const usered = false;
    const fetchBook = (book) => {
        setClDe(true);
        setBook(book);
    }
    const saveBook = (book) => {
        var bookId = {};
        bookId[`save.${book.id}`] = true;
        firestore.collection('users')
            .doc(user.id)
            .update(bookId)
            .then(() => {
                setUserSave(true)
                alert('Add to wish List succesful!');
            }).catch((err) => {
                setLoading(false);
                alert(err.message);
            })
    }
    const unSaveBook = (book) => {
        var bookId = {};
        bookId[`save.${book.id}`] = false;
        firestore.collection('users')
            .doc(user.id)
            .update(bookId)
            .then(() => {
                setUserSave(true)
                alert('Remove from wish List succesful!');
            }).catch((err) => {
                setLoading(false);
                alert(err.message);
            })
    }
    const boBook = (book) => {
        var bookId = {};
        bookId[`boBo.${book.id}`] = true;
        firestore.collection('users')
            .doc(user.id)
            .update(bookId)
            .then(() => {
                setUserSave(true)
                alert('Borrow Book succesful!');
            }).catch((err) => {
                setLoading(false);
                alert(err.message);
            });
        const inBoRef = firestore.collection('books').doc(book.id);
        const inBy = firebase.firestore.FieldValue.increment(1);
        const res = inBoRef.update({
            borrow: inBy,
            stock: inBy,
        });
    }
    const reBook = (book) => {
        var bookId = {};
        bookId[`boBo.${book.id}`] = false;
        firestore.collection('users')
            .doc(user.id)
            .update(bookId)
            .then(() => {
                setUserSave(true)
                alert('Return Book succesful!');
            }).catch((err) => {
                setLoading(false);
                alert(err.message);
            });
        const inBoRef = firestore.collection('books').doc(book.id);
        const inBy = firebase.firestore.FieldValue.increment(-1);
        const res = inBoRef.update({
            stock: inBy
        });
    }
    return (
        <div>
            <Banner title='Library Page' img='url("./images/library.jpg")' />
            <Grid container spacing={2}>
                <Grid item sm={12} md={12} lg={8}>
                    <TextField
                        variant='outlined'
                        type='text'
                        size='small'
                        onChange={(e) => setValueSearch(e.target.value)}
                        value={valueSearch}
                        label='Search'
                        fullWidth
                        InputProps={{
                            endAdornment: valueSearch && (
                                <IconButton
                                    size='small'
                                    aria-label='toggle password visibility'
                                    onClick={() => setValueSearch('')}
                                >
                                    <ClearOutlinedIcon />
                                </IconButton>
                            )
                        }}
                    />
                </Grid>
                <Grid item sm={12} md={12} lg={4}>
                    <TextField
                        variant='outlined'
                        select
                        label='Categories'
                        fullWidth
                        size='small'
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    >
                        {bookCategories.map((bookCategory, index) => (
                            <MenuItem
                                key={index}
                                value={bookCategory.value}
                            >
                                {bookCategory.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            {
                user ?
                    // user.save[book.id]
                    <Grid container spacing={3} className={classes.container}>
                        {rBooks.filter((book) => user.save[book.id] == true
                        ).filter((book) => book.category.toLowerCase().includes(categories.toLowerCase())
                            || book.subCategory.toLowerCase().includes(categories.toLowerCase())
                        ).filter((book) => book.title.toLowerCase().includes(valueSearch.toLowerCase())
                            || book.author.toLowerCase().includes(valueSearch.toLowerCase())
                        ).map((book, index) => (
                            valueSearch == '' ?
                                (

                                    <Card className={classes.card} key={index}>
                                        <CardMedia
                                            className={classes.card__img}
                                            image={book.coverURL}
                                        />
                                        <CardContent className={classes.card__content}>
                                            <Grid container>
                                                <Grid item lg={12}>
                                                    <Typography noWrap>
                                                        {book.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid container alignItems='center'>
                                                    <Grid item lg={10}>
                                                        <Typography variant='subtitle1' color='textSecondary' noWrap>
                                                            {book.author == '' ? 'none' : book.author}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={2}>
                                                        {
                                                            user.save[book.id] ?
                                                                <IconButton color='primary' size='small' onClick={() => unSaveBook(book)}>
                                                                    {loading ? <CircularProgress size={24} /> : <BookmarkRoundedIcon />}
                                                                </IconButton>
                                                                : <IconButton color='primary' size='small' onClick={() => saveBook(book)}>
                                                                    {loading ? <CircularProgress size={24} /> : <BookmarkBorderOutlinedIcon />}
                                                                </IconButton>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant='outlined'
                                                color='primary'
                                                onClick={() => fetchBook(book)}
                                            >
                                                detail
                                            </Button>
                                            {
                                                user ?
                                                    <div>
                                                        {
                                                            user.boBo[book.id] ?
                                                                <Button variant='contained' style={{ background: '#0066ff', color: 'white' }} onClick={() => reBook(book)} >
                                                                    Return
                                                                </Button>
                                                                : <Button variant='contained' color='primary' onClick={() => boBook(book)}>
                                                                    Borrow
                                                                </Button>
                                                        }
                                                    </div>
                                                    : null
                                            }
                                        </CardActions>
                                    </Card>
                                ) : (
                                    <Grid item lg={12} key={index}>
                                        <Card>
                                            <Grid container spacing={2}>
                                                <Grid item lg={1}>
                                                    <CardMedia
                                                        className={classes.card__imgSearch}
                                                        image={book.coverURL}
                                                    />
                                                </Grid>
                                                <Grid item lg={11} style={{ display: 'flex' }}>
                                                    <CardContent>
                                                        <Typography variant='h6' noWrap>
                                                            {book.title}
                                                        </Typography>
                                                        <Typography variant='subtitle1' color='textSecondary' noWrap>
                                                            {book.author == '' ? 'none' : book.author}
                                                        </Typography>
                                                        {
                                                            user.save[book.id] ?
                                                                <IconButton color='primary' size='small' onClick={() => unSaveBook(book)}>
                                                                    {loading ? <CircularProgress size={24} /> : <BookmarkRoundedIcon />}
                                                                </IconButton>
                                                                : <IconButton color='primary' size='small' onClick={() => saveBook(book)}>
                                                                    {loading ? <CircularProgress size={24} /> : <BookmarkBorderOutlinedIcon />}
                                                                </IconButton>
                                                        }
                                                    </CardContent>
                                                    <div style={{ flexGrow: 1 }} />
                                                    <CardActions>
                                                        <div>
                                                            <div align='center'>
                                                                <Button
                                                                    variant='outlined'
                                                                    color='primary'
                                                                    onClick={() => fetchBook(book)}
                                                                >
                                                                    detail
                                                                </Button>
                                                            </div>
                                                            <div style={{ height: 20 }} />
                                                            <div align='center' >
                                                                {
                                                                    user ?
                                                                        <div>
                                                                            {
                                                                                user.boBo[book.id] ?
                                                                                    <Button variant='contained' style={{ background: '#0066ff', color: 'white' }} onClick={() => reBook(book)} >
                                                                                        Return
                                                                                    </Button>
                                                                                    : <Button variant='contained' color='primary' onClick={() => boBook(book)}>
                                                                                        Borrow
                                                                                    </Button>
                                                                            }
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>

                                                        </div>

                                                    </CardActions>
                                                </Grid>
                                            </Grid>
                                        </Card>

                                    </Grid>
                                )
                        ))}
                    </Grid>
                    : <div className={classes.loading}>
                        <CircularProgress size={50} />
                    </div>
            }
            <Dialog open={clDe}>
                <DetailBooks />
            </Dialog>
        </div >
    );
}

export default wishList;