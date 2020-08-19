import React from 'react';
import PropTypes from 'prop-types';
import { Hidden, Grid } from '@material-ui/core';

SubNewFeed.propTypes = {
};


function SubNewFeed(props) {
  return (
    <Hidden mdDown>
        <Grid item lg={4}>
          suggest
        </Grid>
      </Hidden>
  );
}

export default SubNewFeed;