import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Grid,
  GridList,
  makeStyles,
  GridListTile,
} from "@material-ui/core";
import { useSelector } from "react-redux";

ScreamTab.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

ScreamTab.defaultProps = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    "& .MuiGridList-root" : {
      width: "100%",
      height: 'fit-content',

    },
  },
}));

function ScreamTab(props) {
  const { children, value, index, ...other } = props;
  const screams = useSelector((state) => state.user.screams);
  console.log("my scream", screams);

  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.root}
    >
      {value === index && (
        <GridList cellHeight={250} className={classes.gridList} cols={3}>
          {screams.map((scream) => {
            return (
              <GridListTile key={scream.imageUrl} cols={scream.cols || 1}>
                <img src={scream.imageUrl} alt={scream.body}/>
              </GridListTile>
            );
          })}
        </GridList>
      )}
    </div>
  );
}

export default ScreamTab;
