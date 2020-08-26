import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import Bio from "features/Profile/components/Bio";
import Activity from "features/Profile/components/Activity";
import Footer from "components/Footer";

About.propTypes = {};

function About(props) {
  const {
    authenticated,
    credentials,
    likes,
    notifications,
    screams,
  } = useSelector((state) => state.user);
  return (
    <Container maxWidth="md">
      <Bio user={credentials} screams={screams} />
      <Activity screams={screams} />
    </Container>
  );
}

export default About;
