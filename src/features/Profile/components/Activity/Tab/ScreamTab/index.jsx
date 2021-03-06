import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  GridList,
  makeStyles,
  GridListTile,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  tableTabStyle,
  defaultTableTabProps,
} from "features/Profile/Style/tableTabStyle";

import AppsIcon from "@material-ui/icons/Apps";
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
      
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiGridListTile-root": {
        
      },
    },
  },
}));

function ScreamTab(props) {
  const { children, value, index, ...other } = props;
  const screams = useSelector((state) => state.user.screams);
  console.log("my scream", screams);

  const classess = useStyles();
  const classes = tableTabStyle();

  const defaultProps = defaultTableTabProps;
  const { indexPic } = useRandomImage();

  return screams.length > 0 ? (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classess.root}
    >
      {value === index && (
        <GridList cellHeight="auto" className={classess.gridList} cols={3}>
          {screams.map((scream, index) => {
            return (
              <GridListTile key={index} cols={scream.cols || 1}>
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
  ) : (
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
            <AppsIcon />
          </Box>
          <Typography variant="h3">Upload a Post</Typography>
          <Typography>Post show your energy for a new day.</Typography>
          <Button size="small">Upload</Button>
        </div>
      )}
    </div>
  );
}

export default ScreamTab;
