import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

LazyLoading.propTypes = {};

function LazyLoading(props) {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img
        width="206px"
        height="58px"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
        alt="logo"
      ></img>
    </Box>
  );
}

export default LazyLoading;
