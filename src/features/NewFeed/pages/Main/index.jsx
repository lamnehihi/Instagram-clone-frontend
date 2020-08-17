import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

Main.propTypes = {
  
};

function Main(props) {
  return (
    <div>
      NewFeed
      <Button variant="contained" color="primary">
      Hello World
    </Button>
    </div>
  );
}

export default Main;