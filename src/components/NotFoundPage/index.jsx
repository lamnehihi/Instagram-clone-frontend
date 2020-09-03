import React from "react";
import PropTypes from "prop-types";
import NavBar from "components/NavBar";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Footer from "components/Footer";
import images from "Constants/image";

NotFoundPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  typo: {
    fontSize: "30px",
    color: "#6B63FF",
    fontWeight: 500,
    marginBottom: "3rem",
    [theme.breakpoints.down('sm')]: {
      fontSize: "18px",
    fontWeight: 400,

    }
  },
}));

function NotFoundPage(props) {
  const classes = useStyle();
  return (
    <div>
      <NavBar />

      <Container maxWidth="md">
        <Grid container justify="center">
          <img src={images.NOT_FOUND} width="60%" />
          <Typography className={classes.typo}>
            Oops, something went wrong...
          </Typography>
          <Footer />
        </Grid>
      </Container>
    </div>
  );
}

export default NotFoundPage;
