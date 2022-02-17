import { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardMedia,
    CardContent,
    Typography,
    makeStyles,
    Grid,
    Dialog,
    CircularProgress
} from "@material-ui/core";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { CURRENTUSER, CLEDU, FETCHUSER } from "../state/mapState";
import EditProfile from './components/containers/EditProfile'

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        height: 'calc(100vh - 120px)',
    },
    cover: {
        width: '100%',
        height: '50%',
        backgroundImage: 'url("../images/userList.jpg")',
    },
    profile: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        border: '3px solid white',
        position: 'relative',
        top: '73%',
        left: '12%',
    },
    content: {
        width: '100%',
        height: '60%',
        padding: 0,
        margin: 0,
    },
    left: {
        paddingTop: 90,
        textAlign: 'right',
        paddingRight: 50
    },
    right: {
        paddingTop: 10
    },
    loading: {
        margin: '100px auto 0px auto',
        width: 50
    },
    btn: {
        float: 'right',
        margin: '25px 50px 0px 0px'
    }

}));

const account = () => {
    const classes = useStyles();
    const cUser = useRecoilValue(CURRENTUSER);
    const [clEdU, setClEdU] = useRecoilState(CLEDU);
    const [loading, setLoading] = useState(true);
    const setFetUser = useSetRecoilState(FETCHUSER);
    console.log(cUser.profileURL);
    useEffect(() => {
        if (cUser) {
            setLoading(false);
        } else {
            setLoading(true)
        }

    },[cUser]);

    const fetchUser = () =>{
        setClEdU(true);
        setFetUser(cUser);
    }
    return (
        <div>
            {/* <Banner title='Account Page' img='url("../images/account.jpg")' /> */}
            <Card
                className={classes.card}
            >
                { !loading ?
                    <div className={classes.card}>
                        <CardMedia
                            className={classes.cover}
                        >
                            <Avatar
                                className={classes.profile}
                                src={cUser.profileURL}
                            />
                        </CardMedia>
                        <CardContent
                            className={classes.content}
                        >
                            <Grid container>
                                <Grid item sm={6} md={6} lg={3} >
                                    <div className={classes.left}>
                                    <Typography>
                                            GENDER: {cUser.gender.toUpperCase()}
                                        </Typography>
                                        <Typography>
                                            WAS BORN IN: {cUser.birthDate}
                                        </Typography>
                                        <Typography>
                                            STUDY IN GRADE: {cUser.grade}
                                        </Typography>
                                    </div>
                                    
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={classes.btn}
                                    onClick={() => fetchUser()}
                                >
                                    Edit Your Profile
                                </Button>
                                </Grid>
                                <Grid item sm={6} md={6} lg={9}>
                                    <div className={classes.right}>
                                        <Typography variant='h5'>
                                            {cUser.fname + ' ' + cUser?.lname}
                                        </Typography>
                                        <Typography variant='h6'>
                                            {cUser.email}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                    :
                    <div className={classes.loading}>
                        <CircularProgress size={50} />
                    </div>
                }
            </Card>
            <Dialog open={clEdU}>
               <EditProfile />
            </Dialog>


        </div>
    );
}

export default account;