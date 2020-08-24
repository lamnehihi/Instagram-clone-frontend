import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography, Button } from '@material-ui/core';

import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';

VideoTab.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



const useStyles = makeStyles((theme) => ({
  root: {
    height: "400px",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    "& h3" : {
    fontSize: "28px",
    lineHeight: "32px",
    fontWeight : 300,
    marginTop: "2rem",
    },
    "& button" : {
      backgroundColor : '#0096F6',
      color: "#fff",
    },
    "& button:hover" : {
      backgroundColor : '#0096F6',
      color: "#fff",
    },
    "& h3, p, button" : {
      marginBottom: "1rem",
    }
  }
}));

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};

function VideoTab(props) {
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
        <Box  display="flex" justifyContent="center" alignItems="center" borderRadius="50%" {...defaultProps}>
        <LiveTvRoundedIcon fontSize="" />
        </Box>
        <Typography variant="h3">
        Upload a Video
        </Typography>
        <Typography>
        Videos must be between 1 and 60 minutes long.
        </Typography>
        <Button size="small">Upload</Button>
        </div>
      )}
    </div>
  );
}

export default VideoTab;