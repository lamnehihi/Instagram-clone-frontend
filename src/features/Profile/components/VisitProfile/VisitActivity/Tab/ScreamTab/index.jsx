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
import useRandomImage from "hooks/useRandomImage.js";
import ScreamBox from "components/ScreamBox";

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
    "& .MuiGridList-root": {
      width: "100%",
      height: "fit-content",
    },
    "& .MuiGridListTile-root": {
      height: "300px !important",
      "& img": {
        objectFit: "cover",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiGridListTile-root": {
        height: "150px !important",
        "& img": {
          objectFit: "cover",
        },
      },
    },
  },
}));

function ScreamTab(props) {
  const { children, value, index, ...other } = props;
  const screams = useSelector((state) => state.profile.screams);
  console.log("my scream", screams);

  const classes = useStyles();
  const {indexPic} = useRandomImage();

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
        <GridList cellHeight="auto" className={classes.gridList} cols={3}>
          {screams.map((scream) => {
            return (
              <GridListTile key={scream.imageUrl} cols={scream.cols || 1}>
                <ScreamBox
                    likeCount={scream.likeCount}
                    commentCount={scream.commentCount}
                    imageUrl={scream.imageUrl}
                    body={scream.body}
                    screamId={scream.id}
                  />               
              </GridListTile>
            );
          })}
        </GridList>
      )}
    </div>
  );
}

export default ScreamTab;
