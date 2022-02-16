import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Divider,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import ViewHeadlineRoundedIcon from '@material-ui/icons/ViewHeadlineRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import { fireAuth } from "../../../services/firebase";
import { USERED } from '../../../state/mapState';
import { useRecoilValue } from "recoil";

const menuItems = [
  {
    text: 'Home',
    icon: <HomeRoundedIcon style={{ fontSize: 30 }} />,
    path: '/home',
    sublist: 0
  },
  {
    text: 'Library',
    icon: <LibraryBooksRoundedIcon style={{ fontSize: 25 }} />,
    path: '/library',
    sublist: 0
  },
  {
    text: 'Profile',
    icon: <AccountCircleRoundedIcon style={{ fontSize: 25 }} />,
    sublist: 1,
    subListMenu: [
      {
        text: 'History',
        icon: <HistoryRoundedIcon style={{ fontSize: 20 }} />,
        path: '/history',
      },
      {
        text: 'Wish List',
        icon: <BookmarkRoundedIcon style={{ fontSize: 20 }} />,
        path: '/wishlist',
      },
      {
        text: 'Account',
        icon: <SettingsRoundedIcon style={{ fontSize: 20 }} />,
        path: '/account',
      }
    ],
    subListAdmin: [
      {
        text: 'Manage Books',
        icon: <MenuBookRoundedIcon style={{ fontSize: 20 }} />,
        path: '/manageBook',
      },
      {
        text: 'Book List',
        icon: < ViewHeadlineRoundedIcon style={{ fontSize: 20 }} />,
        path: '/bookList',
      },
      {
        text: 'Manage Student',
        icon: <GroupAddRoundedIcon style={{ fontSize: 20 }} />,
        path: '/manageUser',
      },
      {
        text: 'Student List',
        icon: <GroupRoundedIcon style={{ fontSize: 20 }} />,
        path: '/userList',
      },
      {
        text: 'Account',
        icon: <SettingsRoundedIcon style={{ fontSize: 20 }} />,
        path: '/account',
      }
    ]
  },
  {
    text: 'Report',
    icon: <AssessmentRoundedIcon style={{ fontSize: 25 }} />,
    path: '/report',
    sublist: 0
  },
  {
    text: 'About',
    icon: <InfoRoundedIcon style={{ fontSize: 25 }} />,
    path: '/about',
    sublist: 0
  },
  {
    text: 'Contact',
    icon: <ForumRoundedIcon style={{ fontSize: 25 }} />,
    path: '/contact',
    sublist: 0
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    pading: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  active: {
    color: '#ff9900',
  },
  active__icon: {
    color: '#ff9900',
  },
  sublist: {
    background: '#f2f2f2',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10
  },
}));


const drawerWidth = 240;
const Navbar = () => {
  const usered = useRecoilValue(USERED);
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleClickSublist = () => {
    setOpen(!open);

  };

  const handleSignOut = (e)=>{
    e.preventDefault();
    fireAuth.signOut()
    .then(()=>{
      router.push('/')
    })
  }
  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CFC Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item) => (
            item.sublist == 0 ? (
              <ListItem
                button
                key={item.text}
                onClick={() => { router.push(item.path) }}
                className={router.pathname == item.path ? classes.active : null}
              >
                <ListItemIcon className={router.pathname == item.path ? classes.active__icon : null}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>

            ) : (
              <div key={item.text}>
                <ListItem
                  button
                  onClick={handleClickSublist}
                  className={
                    router.pathname == '/history' ? classes.active
                      : router.pathname == '/wishlist' ? classes.active
                        : router.pathname == '/account' ? classes.active
                          : router.pathname == '/manageBook' ? classes.active
                            : router.pathname == '/bookList' ? classes.active
                              : router.pathname == '/userList' ? classes.active
                                : router.pathname == '/manageUser' ? classes.active
                                  : null}
                >
                  <ListItemIcon className={
                    router.pathname == '/history' ? classes.active__icon
                      : router.pathname == '/wishlist' ? classes.active__icon
                        : router.pathname == '/account' ? classes.active__icon
                          : router.pathname == '/manageBook' ? classes.active__icon
                            : router.pathname == '/bookList' ? classes.active__icon
                              : router.pathname == '/userList' ? classes.active__icon
                                : router.pathname == '/manageUser' ? classes.active__icon
                                  : null}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding={true} className={classes.sublist}>
                    {
                      usered ? (
                        item.subListMenu.map((subItem) => (
                          <ListItem
                            button key={subItem.text}
                            onClick={() => { router.push(subItem.path) }}
                            className={router.pathname == subItem.path ? classes.active : null}
                          >
                            <ListItemIcon
                              className={router.pathname == subItem.path ? classes.active__icon : null}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography style={{fontSize: 15}}>
                                  {subItem.text}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))
                      ) : (
                        item.subListAdmin.map((subItem) => (
                          <ListItem
                            button key={subItem.text}
                            onClick={() => { router.push(subItem.path) }}
                            className={router.pathname == subItem.path ? classes.active : null}
                          >
                            <ListItemIcon
                              className={router.pathname == subItem.path ? classes.active__icon : null}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography style={{fontSize: 15}}>
                                  {subItem.text}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))
                      )
                    }
                  </List>
                </Collapse>
              </div>
            )
          ))}
          <ListItem
            button
            onClick={handleSignOut}
          >
            <ListItemIcon>
              <BackspaceRoundedIcon style={{ fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText primary='Sign Out' />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;