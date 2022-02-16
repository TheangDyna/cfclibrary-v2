import React from "react";
import {
    Typography,
    makeStyles
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    banner: {
        marginBottom: theme.spacing(3)
    },
    banner__title: {
        width: '100%',
        minHeight: 100,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}))
const Banner = ( {title, img}) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.banner}>
                <div
                    className={classes.banner__title}
                    style={{
                        backgroundImage: img,
                        minHeight: 100,
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        position: 'relative'
                    }}
                >
                    <div>
                        <Typography variant='h4'>
                            {title}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;