import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../services/firebase';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CardActions,
  CircularProgress,
  Dialog
} from '@material-ui/core';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import DetailBooks from './components/containers/DetialBook';
import { RBOOKS, CLDE, BOOK, CURRENTUSER, USERSAVE, BOOKS, BOBOOKS} from '../state/mapState';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const useStyles = makeStyles((theme) => ({

  wel__img: {
    backgroundImage: `url('https://stmariagoretti.org/media/1922/library.jpg')`,
    backgroundSize: 'cover',
    height: 'calc(100vh - 200px)',
  },
  wel__text: {
    background: 'rgba(255,255,255,0.7)',
    padding: 50,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crip: {
    margin: '20px 0px'
  },
  wel__button: {
    display: 'block',
    margin: '0 auto'
  },
  title: {
    width: `calc(100vw - ${290}px)`,
    margin: '40px auto 20px auto',
    color: '#ff9900',
  },
  carousel: {
    width: `calc(100vw - ${290}px)`,
    margin: '0px auto'
  },
  carousel__item: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    margin: 10
  },
  card__img: {
    width: '100%',
    height: 200,
    marginBottom: theme.spacing(1)
  },
  card__content: {
    padding: '0 10px'
  },
  loading: {
    margin: '100px auto 0px auto',
    width: 50
  },


}));

const home = () => {
  const classes = useStyles();
  const books = useRecoilValue(BOOKS);
  const rBooks = useRecoilValue(RBOOKS);
  const boBooks = useRecoilValue(BOBOOKS);
  const [clDe, setClDe] = useRecoilState(CLDE);
  const [loading, setLoading] = useState(false);
  const setBook = useSetRecoilState(BOOK);
  const user = useRecoilValue(CURRENTUSER);
  const setUserSave = useSetRecoilState(USERSAVE);
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
      {user ?
        <div>
          <div>
            <Grid container className={classes.wel__img}>
              {/* <Grid item lg={6} className={classes.wel__text}>
            <div>
              <img src='./images/logo.png' alt='Logo' width='200' />
              <Typography variant='h4' color='primary'>Welcome to CFC Library</Typography>
              <Typography className={classes.crip}>We believe that reading opens doors, and part of our mission is to change the way the world reads by providing a wide range of reading material in both print and audio formats at a price that is fair for both creators and consumers.</Typography>
              <Button variant='contained' color='primary'>
                Get Start
              </Button>
            </div>
          </Grid> */}
            </Grid>
          </div>
          <div className={classes.title}>
            <Typography variant='h6'>
              New Arrival Books
            </Typography>
          </div>
          <div >
            <Carousel
              className={classes.carousel}
              responsive={responsive}
              slidesToSlide={5}
            >
              {
                books.map((book, index) => (
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
                      <Button variant='outlined' color='primary' onClick={() => fetchBook(book)}>
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
                ))
              }
            </Carousel>
          </div>
          <div className={classes.title}>
            <Typography variant='h6'>
              Recommend Books
            </Typography>
          </div>
          <div >
            <Carousel
              className={classes.carousel}
              responsive={responsive}
              slidesToSlide={5}
            >
              {
                rBooks.filter((book) => book.recommend == true).map((book, index) => (
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
                      <Button variant='outlined' color='primary' onClick={() => fetchBook(book)}>
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
                ))
              }
            </Carousel>
          </div><div className={classes.title}>
            <Typography variant='h6'>
              Top Boroow Books
            </Typography>
          </div>
          <div >
            <Carousel
              className={classes.carousel}
              responsive={responsive}
              slidesToSlide={5}
            >
              {
                boBooks.map((book, index) => (
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
                      <Button variant='outlined' color='primary' onClick={() => fetchBook(book)}>
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
                ))
              }
            </Carousel>
          </div>
          <Dialog open={clDe}>
            <DetailBooks />
          </Dialog>
        </div>
        : <div className={classes.loading}>
          <CircularProgress size={50} />
        </div>
      }
    </div>
  );
}

export default home;