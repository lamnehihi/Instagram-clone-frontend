import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import ScreamCard from "../ScreamCard";

ScreamList.propTypes = {
  screams: PropTypes.array,
};

ScreamList.defaultProps = {
  screams: [],
};

const useStyle = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    width: "100%",
  },
}))

function ScreamList(props) {
  const { screams } = props;
  const classes = useStyle();
  return (
    <Grid item xs={12} lg={8} className={`${classes.root}`}>
      {
        screams.map((scream, index) => {
          return <ScreamCard key={index} scream={scream} /> 
        })
      }
    </Grid>
  );
}

export default ScreamList;
