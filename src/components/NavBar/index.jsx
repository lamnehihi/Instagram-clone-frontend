import React, { useEffect, useState, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  TextField,
  Grid,
  Box,
  Avatar,
  Hidden,
  Container,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Grow,
  Paper,
  Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { MemoryRouter as Router, useHistory } from "react-router";
import { Link as RouterLink, BrowserRouter } from "react-router-dom";

import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_LOGOUT, MARK_NOTI_READ } from "features/Auth/UserSlice";
import { NavBarStyle } from "./NavBarStyle";
import dayjs from "dayjs";
import { add3Dots } from "publicFunction";

NavBar.propTypes = {};

function NavBar(props) {
  useEffect(() => {
    console.log("navbar mount");
    return console.log("navbar unmount");
  }, []);

  const classes = NavBarStyle();

  const { credentials: user, notifications, authenticated} = useSelector((state) => state.user);

  const showNoti = useSelector((state) => state.user.showNoti);
  let unRead = 0;
  let notiLike = 0;
  let notiComment = 0;
  notifications.map((noti) => {
    if (noti.read === false) {
      ++unRead;
    }
    if (noti.type === "like") ++notiLike;
    if (noti.type === "comments") ++notiComment;
  });

  const dispatch = useDispatch();
  let checked = false;
  if (user.handle) {
    checked = true;
  }

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);

  //0-post 1-home 2-explore 3-noti 4-profile
  const [clickAt, setClickAt] = useState(1);
  const clickPrevious = useRef(-1);

  const handleMenuItemClick = (number) => {
    switch (number) {
      case 1:
        setClickAt(1);
        break;
      case 2:
        setClickAt(2);
        break;
      default:
        setClickAt(1);
        break;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    clickPrevious.current = clickAt;
    setClickAt(4);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("click pre:", clickPrevious.current);
    setAnchorEl(null);
    setClickAt(clickPrevious.current);
  };

  const handleClickNotification = (event) => {
    if(authenticated){
    event.preventDefault();
    clickPrevious.current = clickAt;
    setClickAt(3);
    setAnchorElNotification(event.currentTarget);
    const markNotiIds = notifications.filter(noti => !noti.read).map(noti => noti.id);
    console.log("markNotiIds", markNotiIds);
    dispatch(MARK_NOTI_READ(markNotiIds));
    } else {
    history.push("/login");
    }
  };

  const handleCloseNotification = () => {
    console.log("click pre:", clickPrevious.current);
    setAnchorElNotification(null);
    setClickAt(clickPrevious.current);
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    dispatch(SET_LOGOUT());
    window.location.href = "/login";
  };

  const handleProfile = () => {
    history.push("/profile");
    setAnchorEl(null);
  };

  const handleSetting = () => {
    setAnchorEl(null);
    setClickAt(clickPrevious.current);
  };

  var relativeTime = require("dayjs/plugin/relativeTime");
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "just now",
      m: "%dmin",
      mm: "%dmin",
      h: "%dh",
      hh: "%dh",
      d: "%dd",
      dd: "%dd",
      M: "%dm",
      MM: "%dm",
      y: "%dy",
      yy: "%dy",
    },
  });

  return (
    <div>
      <AppBar elevation={10} className="navbar" id="navbar" position="fixed">
        <Toolbar>
          <Container maxWidth="md">
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              maxwidth="sm"
            >
              <Box className="navbar__logo" component={Link} to="/">
                <img
                  alt="logo"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                  width="103px"
                  height="29px"
                />
              </Box>

              <Hidden xsDown>
                <form
                  className="navbar__searchBar"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="filled-basic"
                    placeholder="search"
                    variant="outlined"
                    size="small"
                  />
                </form>
              </Hidden>

              <Box className={`${classes.black} navbar__menu`} display="flex">
                <ButtonBase
                  disableRipple
                  onClick={() => handleMenuItemClick(1)}
                >
                  <Box className="navbar__menu__item" component={Link} to="/">
                    {clickAt === 1 ? (
                      <HomeIcon fontSize="large" />
                    ) : (
                      <HomeOutlinedIcon fontSize="large" />
                    )}
                  </Box>
                </ButtonBase>
                <ButtonBase
                  disableRipple
                  onClick={() => handleMenuItemClick(2)}
                >
                  <Box className="navbar__menu__item" component={Link} to="/">
                    {clickAt === 2 ? (
                      <ExploreIcon fontSize="large" />
                    ) : (
                      <ExploreOutlinedIcon fontSize="large" />
                    )}
                  </Box>
                </ButtonBase>

                {/* ANCHOR: Handle click notification */}
                <ButtonBase disableRipple onClick={handleClickNotification}>
                  <Box
                    className={`navbar__menu__item ${
                      unRead > 0 && "notification"
                    }`}
                    component={Link}
                    to="#"
                  >
                    {clickAt === 3 ? (
                      <FavoriteIcon fontSize="large" />
                    ) : (
                      <FavoriteBorderOutlinedIcon fontSize="large" />
                    )}
                  </Box>
                  {unRead > 0 && (
                    <Grow
                      in={checked && showNoti}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(checked ? { timeout: 2000 } : {})}
                    >
                      <Paper elevation={10} className="popup">
                        {notiLike > 0 && (
                          <Box
                            display="flex"
                            alignItems="center"
                            style={{ marginRight: ".5rem" }}
                          >
                            <FavoriteIcon
                              style={{ fontSize: 25, color: "#ffffff" }}
                            />
                            <span style={{ fontSize: 18, fontWeight: 500 }}>
                              {notiLike}
                            </span>
                          </Box>
                        )}

                        {notiComment > 0 && (
                          <Box display="flex" alignItems="center">
                            <ChatBubbleRoundedIcon
                              style={{ fontSize: 23, color: "#ffffff" }}
                            />
                            <span style={{ fontSize: 18, fontWeight: 500 }}>
                              {notiComment}
                            </span>
                          </Box>
                        )}
                      </Paper>
                    </Grow>
                  )}
                </ButtonBase>
                {notifications.length > 0 ? (
                  <Menu
                    id="simple-menu2"
                    anchorEl={anchorElNotification}
                    keepMounted
                    open={Boolean(anchorElNotification)}
                    onClose={handleCloseNotification}
                    className={classes.submenuNotification}
                  >
                    {notifications.map((noti, index) => {
                      return (
                        <Link to={`/posts/${noti.screamId}`}>
                        <MenuItem key={index} onClick={handleCloseNotification}>
                          <Box width="100%" boxSizing="border-box">
                            <Box
                              width="100%"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              padding=".8rem 1rem"
                              boxSizing="border-box"
                            >
                              <Box display="flex" alignItems="center">
                                <Avatar
                                  src={noti.senderImage}
                                  alt={noti.sender}
                                />
                                <Typography variant="h5">
                                  {noti.sender}
                                  </Typography>
                                  <Typography>
                                  {noti.type === "like"
                                    ? " liked your post."
                                    : ` commented: ${add3Dots(noti.body, 50)}.`}
                                </Typography>
                              </Box>
                              <Typography style={{color: "#8e8e8e"}}>
                                {dayjs(noti.createAt).fromNow()}
                              </Typography>
                            </Box>
                            <Divider variant="fullWidth"/>
                          </Box>
                        </MenuItem>
                        </Link>
                      );
                    })}
                  </Menu>
                ) : (
                  <Menu
                    id="simple-menu2"
                    anchorEl={anchorElNotification}
                    keepMounted
                    open={Boolean(anchorElNotification)}
                    onClose={handleCloseNotification}
                    className={classes.submenuNotification}
                  >
                    <Box>No noti</Box>
                  </Menu>
                )}

                {/* ANCHOR: Handle click avatar */}
                {user.imageUrl ? (
                  <Box
                    className="navbar__menu__item"
                    id="avatar"
                    component={Link}
                    to="#"
                  >
                    <IconButton
                      className={`${classes.small} ${classes.avatar}`}
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <Avatar
                        alt="avatar"
                        src={user.imageUrl ? user.imageUrl : ""}
                        className={classes.small}
                      />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      className={classes.submenu}
                    >
                      <MenuItem onClick={handleProfile} name="profile">
                        <AccountCircleOutlinedIcon />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleSetting} name="setting">
                        <SettingsOutlinedIcon />
                        Setting
                      </MenuItem>
                      <Divider />
                      <MenuItem name="logout" onClick={handleCloseLogout}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <div className="navbar__menu__item" id="avatar">
                    <Box>
                      <IconButton
                        className={`${classes.small} ${classes.avatar} `}
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleLoginClick}
                      >
                        <Avatar
                          alt="avatar"
                          src={user.imageUrl ? user.imageUrl : ""}
                          className={classes.small}
                        />
                      </IconButton>
                    </Box>
                  </div>
                )}
              </Box>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
