import React, { useState } from 'react';
import {
    makeStyles,
    TextField,
    Grid,
    Typography,
    Divider,
    Card,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import emailjs from 'emailjs-com';
import Banner from './components/presentaions/Banner';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { CURRENTUSER } from '../state/mapState';
import { useRecoilValue } from 'recoil';
const useStyles = makeStyles((theme) => {
    return {
        contact__form: {
            width: `100%`,
        },
        contact__button: {
            display: 'block',
            margin: '0 auto'
        },
        contact__card: {
            padding: 20
        },
        body: {
            marginTop: theme.spacing(4)
        },
        divider: {
            marginTop: 10
        },
        send__button: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        iframeMap: {
            width: '100%',
            height: 500,
            border: 'none'
        },
        contact__imfor: {
            display: 'flex',
            alignItems: 'center',
        },
        contact__img: {
            backgroundImage: 'url(./images/sendmessage.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '50%',
            height: '80%',
        },
        contact__imgBox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }
    }
});

const contact = () => {
    const classes = useStyles();
    const cUser = useRecoilValue(CURRENTUSER);
    const [values, setValues] = useState({
        message: '',

    });
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ch9rm3e', 'template_qwyseme', e.target, 'user_l7BCSSY6Nm2A1oHVkeURW')
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.target.reset();
    }
    return (
        <div>
            <Banner title='Contact Page' img='url("./images/contact.jpg")' />
            <div style={{ marginTop: 50, marginBottom: 50 }}>
                <div>
                    <Grid container spacing={4}>
                        <Grid item lg={4} className={classes.contact__imfor}>
                            <div>
                                <Typography align='center' variant='h6'>
                                    You Can Contact us by:
                                </Typography>
                                <List style={{ paddingLeft: 20 }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PhoneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='(+885) 23 223 322' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='cfclibrary@gmail.com' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <TelegramIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='https://t.me/cfclibrary' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FacebookIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Caring for Cambodia' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            < LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Aranh, Siem Reap, Siem Reap' />
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item lg={8}>
                            <div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.675620102311!2d103.84787305064931!3d13.308192190589754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311019a3422af079%3A0xc3ec604987f983cb!2sAranh%20Sakor%20Cuthbert%20Primary%20and%20Junoir%20High%20School!5e0!3m2!1sen!2skh!4v1630332892578!5m2!1sen!2skh" loading='lazy' className={classes.iframeMap} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.contact__form}>
                <Card className={classes.contact__card}>
                    <Grid container spacing={4}>
                        <Grid item lg={6}>
                            <div className={classes.contact__imgBox}>
                                <div className={classes.contact__img} />
                            </div>
                        </Grid>
                        <Grid item lg={6}>
                            <form autoComplete='off' onSubmit={sendEmail} >
                                <div className={classes.head}>
                                    <Typography variant='h5'>
                                        Send Your Message
                                    </Typography>
                                    <Typography color='textSecondary'>
                                        Send your message to us by filling the form below.
                                    </Typography>
                                </div>
                                <Divider className={classes.divider} />
                                <div className={classes.body}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={12} md={12} lg={12}>
                                            <TextField
                                                variant='outlined'
                                                type='email'
                                                size='small'
                                                name='email'
                                                value={cUser.email}
                                                required
                                                label='Email'
                                                fullWidth
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} md={12} lg={12}>
                                            <TextField
                                                variant='outlined'
                                                type='text'
                                                size='small'
                                                name='message'
                                                multiline
                                                rows={10}
                                                onChange={handleChange('message')}
                                                required
                                                label='Message'
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12} className={classes.send__button}>
                                            <Button variant='contained' color='primary' type='submit'>
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>

    );
}

export default contact;