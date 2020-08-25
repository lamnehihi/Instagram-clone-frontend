import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

Footer.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100px",
    justifyContent: "center",
    alignItems: "center",
    listStyle: "none",
    padding: "1rem",
    flexWrap: "wrap",
    "& li": {
      width: "fit-content",
      marginRight: ".7rem",
      textTransform: "uppercase",
      fontSize: "12px",
      color: "#00376B",
      fontWeight: 600,
    },
    "& li:last-child": {
      marginLeft: "2rem",
      color: "#8e8e8e"
    },
  },
}));

function Footer(props) {
  const classes = useStyle();
  return (
    <ul className={classes.root}>
      <li>about</li>
      <li>help</li>
      <li>press</li>
      <li>api</li>
      <li>jobs</li>
      <li>privacy</li>
      <li>term</li>
      <li>locations</li>
      <li>top accounts</li>
      <li>hashtags</li>
      <li>language</li>
      <li sm={12}>© 2020 INSTAGRAM CLONE FROM LAMNEHIHI</li>
    </ul>
  );
}

export default Footer;
