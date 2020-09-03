import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import images from "Constants/image";

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
        width="10%"
        src={images.LAZY_SVG}
        alt="logo"
      ></img>
    </Box>
  );
}

export default LazyLoading;
