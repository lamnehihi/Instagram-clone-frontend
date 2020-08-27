import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { MemoryRouter as Router, useHistory } from "react-router";
import { Link as RouterLink, BrowserRouter } from "react-router-dom";

import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_LOGOUT } from "features/Auth/UserSlice";

NavBar.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  submenu: {
    top: "40px !important",

    "& .MuiMenuItem-root": {
      width: "170px",
    },
    "& .MuiSvgIcon-root": {
      marginRight: ".7rem",
    },
    "& .MuiMenu-list": {
      padding: "0rem",
    },
    "& a": {
      color: "#262626",
      textDecoration: "none",
    },
  },
  relative: {
    display: "relative",
  },
  black: {
    color: "#262626 !important",
    "& svg": {
      color: "#262626 !important",
    },
    "& .MuiButtonBase-root": {
      margin: "0rem .7rem",
    },
  },
}));

function NavBar(props) {
  useEffect(() => {
    console.log("navbar mount");
    return console.log("navbar unmount");
  }, []);

  const classes = useStyles();
  const user = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  //0-post 1-home 2-explore 3-noti 4-profile
  const [clickAt, setClickAt] = useState(1);

  const handleMenuItemClick = (number) => {
    switch (number) {
      case 1:
        setClickAt(1)
        break;
      case 2:
        setClickAt(2)
        break;
      case 3:
        setClickAt(3)
        break;
      default:
        setClickAt(1)
        break;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setClickAt(4)
    console.log("object");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("object aaa");
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    // window.location.href = "/login";
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
  };

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
              maxWidth="sm"
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
                <ButtonBase
                  disableRipple
                  onClick={() => handleMenuItemClick(3)}
                >
                  <Box className="navbar__menu__item" component={Link} to="/">
                    {clickAt === 3 ? (
                      <FavoriteIcon fontSize="large" />
                    ) : (
                      <FavoriteBorderOutlinedIcon fontSize="large" />
                    )}
                  </Box>
                </ButtonBase>
                {user.imageUrl ? (
                  <Box
                    className="navbar__menu__item"
                    id="avatar"
                    component={Link}
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
