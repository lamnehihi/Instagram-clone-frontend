import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography, Button } from "@material-ui/core";

import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
TagTab.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& h3": {
      fontSize: "28px",
      lineHeight: "32px",
      fontWeight: 300,
      marginTop: "2rem",
    },
    "& p": {
      width: "80%",
      textAlign: "center",
    },
    "& h3, p": {
      marginBottom: "1rem",
    },
  },
}));

const defaultProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  style: { width: "5rem", height: "5rem" },
};

function TagTab(props) {
  const { children, value, index, ...other } = props;

  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={classes.root}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
            {...defaultProps}
          >
            <LoyaltyOutlinedIcon fontSize="" />
          </Box>
          <Typography variant="h3">Photos of you</Typography>
          <Typography>
          When people tag you in photos, they'll appear here.
          </Typography>
        </div>
      )}
    </div>
  );
}

export default TagTab;
