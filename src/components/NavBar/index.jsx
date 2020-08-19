import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { TextField, Grid, Box, Avatar, Hidden } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

import "./NavBar.scss";
import { Link } from "react-router-dom";

NavBar.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
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
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar elevation={5} className="navbar" id="navbar" position="fixed" >
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Box className="navbar__logo" component={Link} to='/'>
              <img
                alt="logo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                width="103px"
                height="29px"
              />
            </Box>

            <Hidden xsDown>
              <form className="navbar__searchBar" noValidate autoComplete="off">
                <TextField
                  id="filled-basic"
                  placeholder="search"
                  variant="outlined"
                  size="small"
                />
              </form>
            </Hidden>

              <Box className="navbar__menu" display="flex">
                <Box className="navbar__menu__item" component={Link} to='/'>
                  <HomeOutlinedIcon fontSize="large"/>
                </Box>
                <Box className="navbar__menu__item" component={Link} to='/'>
                  <ExploreOutlinedIcon fontSize="large"/>
                </Box>
                <Box className="navbar__menu__item" component={Link} to='/'>
                  <FavoriteBorderOutlinedIcon fontSize="large"/>
                </Box>
                <Box className="navbar__menu__item" id="avatar" component={Link} to='/'>
                  <Avatar alt="avatar" src="/static/images/avatar/1.jpg" className={classes.small}/>
                </Box>
              </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
