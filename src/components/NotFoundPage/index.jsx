import React from "react";
import PropTypes from "prop-types";
import NavBar from "components/NavBar";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import Footer from "components/Footer";
import images from "Constants/image";
import { NavLink } from "react-router-dom";

NotFoundPage.propTypes = {};

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

function NotFoundPage(props) {
  const classes = useStyle();
  return (
    <div>
      <NavBar />

      <Container maxWidth="md">
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
            src={images.NOT_FOUND}
            className={classes.img}
          />
          <Typography className={`${classes.typo} ${classes.top}`}>
            Oops, something went wrong...
          </Typography>
          <NavLink
            to="/signup"
            className={`${classes.typo} ${classes.bottom}`}
          ></NavLink>
        </Box>
        <Footer />
      </Container>
    </div>
  );
}

export default NotFoundPage;
