import {
    makeStyles,
    Grid,
    Typography,
    TextField,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    user__data: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiInputBase-root.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.87)'
          }
    },
    italic: {
        fontStyle: 'italic'
    }
}));
const ImformationBox = ({ lable, value }) => {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={3} className={classes.user__data}>
                <Grid item lg={3}>
                    <Typography>
                       {lable}
                    </Typography>
                </Grid>
                <Grid item lg={9}>
                    <TextField
                        value={value == '' ?  'none' : value}
                        className={value == '' ? classes.italic : null}
                        size='small'
                        disabled
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default ImformationBox;