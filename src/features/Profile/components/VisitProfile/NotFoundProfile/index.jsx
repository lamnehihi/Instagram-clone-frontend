import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, makeStyles } from "@material-ui/core";
import images from "Constants/image";
import { NavLink } from "react-router-dom";

NotFoundProfile.propTypes = {};

const useStyle = makeStyles((theme) => ({
  typo: {
    color: "#6B63FF",
    fontWeight: 300,
    textDecoration: "none",
  },
  top: {
    fontSize: "30px",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  bottom: {
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  img: {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
}));

function NotFoundProfile(props) {
  const classes = useStyle();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="65vh"
    >
      <img
        style={{ marginBottom: "2rem" }}
        alt="user in duty"
        src={images.ASTRONAUT}
        className={classes.img}
      />
      <Typography className={`${classes.typo} ${classes.top}`}>
        This user was in duty in the future
      </Typography>
      <NavLink to="/signup" className={`${classes.typo} ${classes.bottom}`}>
        Wanna join our duty? Sign up here
      </NavLink>
    </Box>
  );
}

export default NotFoundProfile;
