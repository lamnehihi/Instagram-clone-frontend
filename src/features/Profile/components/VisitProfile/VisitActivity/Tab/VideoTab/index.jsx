import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography, Button } from '@material-ui/core';

import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded';
import { defaultTableTabProps, tableTabStyle } from 'features/Profile/Style/tableTabStyle';

VideoTab.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const defaultProps = defaultTableTabProps;

function VideoTab(props) {
  const { children, value, index, ...other } = props;

  const classes = tableTabStyle();
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