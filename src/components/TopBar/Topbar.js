import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, IconButton, Typography, InputBase,Menu,Avatar } from '@material-ui/core/'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {connect} from 'react-redux'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Menus from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  headerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function mapStateToProps(state){
  return {
      currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
      setUser: (userObject) => {
          dispatch({type: "SET_USER", payload: userObject})
      }
  }
}

export function TopBar(props) {
  const classes = useStyles();
  const [anchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });
  const [logout, setlogout] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen} >
    </Menu>
  );

  const handleClick = (event) => {
    setlogout(event.currentTarget);
  };

  const handleClose = () => {
    setlogout(null);
  };

  const dologout = () => {
    localStorage.clear();
    setlogout(null);
    props.history.push("/login")
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {['Rien', 'Rien2', 'Rien3', 'Rien4'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Toujours Rien', 'Encore Rien', 'Rien'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor: "#282828"}}>
        <Toolbar color>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
            >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)} >
            {list("left")}
          </SwipeableDrawer>
          <a className={classes.headerLink} href="/me">
            <Typography className={classes.title} variant="h6" noWrap>
              MySpotify
            </Typography>
          </a>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.handleChange}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop} onClick={handleClick}>
            <Avatar alt={props.props.display_name} src={props.props.images[0].url} />
          </div>
          <div className={classes.sectionMobile}>
            <Avatar alt={props.props.display_name} src={props.props.images[0].url} />
          </div>
        </Toolbar>
        <Menus
        id="simple-menu"
        anchorEl={logout}
        keepMounted
        open={Boolean(logout)}
        onClose={handleClose}>
        <MenuItem onClick={dologout}>Logout</MenuItem>
      </Menus>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar))