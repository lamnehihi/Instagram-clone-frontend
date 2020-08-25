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
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    
  },
}));

function ScreamList(props) {
  const { screams } = props;
  const classes = useStyle();
  return (
    <Grid item className={`${classes.root}`} xs={7}>
      {screams.map((scream, index) => {
        return <ScreamCard key={index} scream={scream} />;
      })}
    </Grid>
  );
}

export default ScreamList;
