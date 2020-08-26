import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography, Button } from "@material-ui/core";

import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import { defaultTableTabProps, tableTabStyle } from "features/Profile/Style/tableTabStyle";

BookMarkTab.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const defaultProps = defaultTableTabProps;

function BookMarkTab(props) {
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
            <BookmarkBorderRoundedIcon fontSize="" />
          </Box>
          <Typography variant="h3">Save</Typography>
          <Typography>
            Save photos and videos that you want to see again. No one is
            notified, and only you can see what you've saved.
          </Typography>
          <Button size="small">Explore Now</Button>
        </div>
      )}
    </div>
  );
}

export default BookMarkTab;
