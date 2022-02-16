import React from "react";
import {
    Grid,
    Paper,
    Card,
    Typography,
    Avatar,
    makeStyles,
    Container
} from "@material-ui/core";
import Banner from './components/presentaions/Banner';

const useStyles = makeStyles((theme) => ({
    misvisBox: {
        border: '5px double #000',
        width: '50%',
        padding: 50,
        margin: '70px auto',
        textAlign: 'center',
        background: '#fff'
    },
    memberBox: {
        width: '100%',
    },
    avatorBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    avator: {
        width: 150,
        height: 200,
        marginBottom: 20

    }

}))

const about = () => {
    const classes = useStyles();
    return (
        <div>
            <Banner title='About Page' img='url("./images/about.jpg")' />
            <Container className={classes.misvisBox}>
                <Typography variant='h5'>Our Mission </Typography>
                <Typography>
                    Developing reading comprehension skills is incredibly important for growing readers, starting as early as picture books. As children get older, it will help them understand textbooks, newspapers, and other more complex texts.
                </Typography>
                <Typography variant='h5'>Our Vision</Typography>
                <Typography>
                    Reading is good for you because it improves your focus, memory, empathy, and communication skills. It can reduce stress, improve your mental health, and help you live longer. Reading also allows you to learn new things to help you succeed in your work and relationships.
                </Typography>
            </Container>
            <div className={classes.memberBox}>
                <Grid container spacing={3}>
                    <Grid item lg={3}>
                        <Grid container>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Avatar variant='rounded' className={classes.avator} src='./images/dyna.jpg'/>
                            </Grid>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Typography noWrap style={{width: 200}}>
                                    Theang Dyna
                                </Typography>
                                <Typography variant='subtitle2' color='textSecondary' noWrap style={{width: 200}}>
                                    theangdyna365@gmail.com
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3}>
                        <Grid container>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Avatar variant='rounded' className={classes.avator} src='./images/danit.jpg' />
                            </Grid>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Typography noWrap style={{width: 200}}>
                                    Toan Danit
                                </Typography>
                                <Typography variant='subtitle2' color='textSecondary' noWrap style={{width: 200}}>
                                    toandanit@gmail.com
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3}>
                        <Grid container>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Avatar variant='rounded' className={classes.avator} src='./images/pina.jpg'/>
                            </Grid>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Typography noWrap style={{width: 200}}>
                                    Krem Pina
                                </Typography>
                                <Typography variant='subtitle2' color='textSecondary' noWrap style={{width: 200}}>
                                    krempina04@gmail.com
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3}>
                        <Grid container>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Avatar variant='rounded' className={classes.avator} src='./images/dath.jpg' />
                            </Grid>
                            <Grid item lg={12} className={classes.avatorBox}>
                                <Typography noWrap style={{width: 200}}>
                                    Chan SreyDath
                                </Typography>
                                <Typography variant='subtitle2' color='textSecondary' noWrap style={{width: 200}}>
                                    chansreydath@gmail.com
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default about;