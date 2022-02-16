import React, { useState } from 'react';
import DividerText from '../presentaions/DividerText'
import {
    Grid,
    Typography,
    IconButton,
    Link,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    buttonIcon: {
        color: '#fff',
        marginLeft: 5,
        marginRight: 5,
    },
    contact: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 300
    },
    text__link: {
        color: '#fff',
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <Grid container style={{ background: '#ff9900', marginTop: 50 }}>
            <Grid item lg={12}>
                <Grid container style={{marginTop: 20, textAlign: 'center' }}>
                    <Grid item lg={4}>
                        <Typography className={classes.text}>
                            CFC Library
                        </Typography>
                        <div>
                            <img src='/images/logo.png' alt='logo' width='100px' style={{ background: 'white', marginTop: 10}} />
                        </div>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography className={classes.text}>
                            Location
                        </Typography>
                        <Typography>
                            <Link target='_blank' href='https://www.google.com/maps/place/Aranh+Sakor+Cuthbert+Primary+and+Junoir+High+School/@13.3081922,103.8478731,17z/data=!3m1!4b1!4m5!3m4!1s0x311019a3422af079:0xc3ec604987f983cb!8m2!3d13.3081924!4d103.8500875' className={classes.text__link}>
                            Aranh Village, Siem Reap Commune,<br />
                            Siem Reap District, Siem Reap Province.</Link>
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography className={classes.text}>
                        Support
                        </Typography>
                        <Typography>
                            <Link target='_blank' href="https://docs.google.com/document/d/1UPDphGznVhzSpQkio0_rZ-rOIxCa1-auMnSx1ixhlNA/edit?usp=sharing" className={classes.text__link}>Policies Rule</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={12}>
                <DividerText spacing={1}>
                    <Typography className={classes.text}>
                        Contact Us
                    </Typography>
                </DividerText>
                <div className={classes.contact}>
                    <div>
                        <IconButton className={classes.buttonIcon}>
                            <PhoneIcon />
                        </IconButton>
                        <IconButton className={classes.buttonIcon}>
                            <EmailIcon />
                        </IconButton>
                        <IconButton className={classes.buttonIcon}>
                            <TelegramIcon />
                        </IconButton>
                        <IconButton className={classes.buttonIcon}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton className={classes.buttonIcon}>
                            <InstagramIcon />
                        </IconButton>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}