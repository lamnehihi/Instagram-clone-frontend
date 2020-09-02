import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";

import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import { defaultTableTabProps, tableTabStyle } from "features/Profile/Style/tableTabStyle";
TagTab.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const defaultProps = defaultTableTabProps;

function TagTab(props) {
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
