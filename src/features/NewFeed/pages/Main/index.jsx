import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Grid, Hidden } from '@material-ui/core';
import screamApi from 'api/screamApi';

Main.propTypes = {
  
};

function Main(props) {
  const [scream, setScream] = useState([]);

  useEffect(() => {
    const fletchAllScream = async () => {
      try {
        const response = await screamApi.getAll();
        console.log("response:", response);
        setScream(response);
        console.log("scream:", scream);

      } catch (error) {
        console.log("fail to get screams");
      }
    }

    fletchAllScream();
  }, [])
  return (
    <Grid container spacing={10}>
      <Grid item xs={12} lg={8} >
        post
      </Grid>
      <Hidden mdDown>
        <Grid item lg={4}>
          ad
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default Main;