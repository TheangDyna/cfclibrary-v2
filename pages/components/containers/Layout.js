import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core';
import Footer from './Footer';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        page: {
            flexGrow: 1,
            background: '#F9F9F9',
            margin: 20
        },
        toolbar: theme.mixins.toolbar,
    }
})

const Layout = ({children}) => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <Navbar />
            <div className={classes.page}>
                <div className={classes.toolbar} />
                {children}
            <Footer />
            </div>
        </div>
     );
}
 
export default Layout;