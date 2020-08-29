import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

RelativeScreams.propTypes = {
  
};

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: "700px",
    marginTop: "3rem",
  }
}))

function RelativeScreams(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      Haha
    </div>
  );
}

export default RelativeScreams;