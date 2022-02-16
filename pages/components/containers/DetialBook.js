import React, { useState } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
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
import { BOOK, CLDE } from '../../../state/mapState';


const useStyles = makeStyles((theme) => {
    return {
        addBook__form: {
            width: 600,
        },
        addBook__button: {
            display: 'block',
            margin: '0 auto'
        },
        addBook__card: {
            padding: 10
        },
        body: {
            marginTop: theme.spacing(2),
            padding: '0px 20px 10px 20px'
        },
        divider: {
            marginTop: 10
        },
        closeDialogButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
        head: {
            textAlign: 'center'
        },
        cover: {
            width: '100%',
            height: 270,
            margin: '0px auto'
        },
        textfield: {
            marginBottom: theme.spacing(2)
        }

    }
});

const DetailBooks = () => {
    const classes = useStyles();
    const setClDe = useSetRecoilState(CLDE);
    const book = useRecoilValue(BOOK);
    return (
        <div>
            <div className={classes.addBook__form}>
                <Card className={classes.addBook__card}>
                    <div className={classes.head}>
                        <IconButton className={classes.closeDialogButton} onClick={() => (setClDe(false))}>
                            <CloseIcon />
                        </IconButton>
                        <Typography color='textSecondary' style={{padding: '0px 7px'}}>
                            Read more Detail about "{book.title}"
                        </Typography>
                    </div>
                    <Divider className={classes.divider} />
                    <div className={classes.body}>
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={12} lg={6}>
                                <Avatar
                                    className={classes.cover}
                                    variant='rounded'
                                    src={book.coverURL}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6}>
                                <TextField
                                    label='Title'
                                    variant='outlined'
                                    fullWidth
                                    className={classes.textfield}
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.title}
                                />
                                <TextField
                                    label='Author'
                                    variant='outlined'
                                    fullWidth
                                    className={classes.textfield}
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={
                                        book.author ? book.author : 'none'
                                    }
                                />
                                <TextField
                                    label='Sponsor'
                                    variant='outlined'
                                    fullWidth
                                    className={classes.textfield}
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.sponsor}
                                />
                                <TextField
                                    label='Category'
                                    variant='outlined'
                                    fullWidth
                                    className={classes.textfield}
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.category}
                                />
                                <TextField
                                    label='Subcategory'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={
                                        book.subCategory ? book.subCategory : 'none'
                                    }
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6}>
                                <TextField
                                    label='Condition'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.condition}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6}>
                                <TextField
                                    label='Amount'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.amount}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6}>
                                <TextField
                                    label='Recommend'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={
                                        book.recommend ? 'Yes' : 'No'
                                    }
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={6}>
                                <TextField
                                    label='Add At'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.createAt}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    label='Descripsion'
                                    variant='outlined'
                                    fullWidth
                                    multiline
                                    maxRows={7}
                                    size='small'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={book.descripsion}/>
                            </Grid>

                        </Grid>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default DetailBooks;