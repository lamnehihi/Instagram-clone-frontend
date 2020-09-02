import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  makeStyles,
  GridList,
  GridListTile,
  Typography,
} from "@material-ui/core";
import ScreamBox from "components/ScreamBox";
import { Link } from "react-router-dom";

RelativeScreams.propTypes = {
  screams: PropTypes.array,
  scream: PropTypes.object,
};

RelativeScreams.defaultProps = {
  screams: [],
  scream: {},
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "2.5rem",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    "& .MuiGridList-root": {
      width: "100%",
      height: "fit-content",
    },
    "& .MuiGridListTile-root": {},
    [theme.breakpoints.down("sm")]: {
      "& .MuiGridListTile-root": {},
    },
  },
  text: {
    width: "100%",
    textAlign: "left",
    fontSize: "14px",
    color: "#8e8e8e",
    fontWeight: 600,
    marginBottom: "2.5rem",
    "& a": {
      marginLeft: ".3rem",
      textDecoration: "none",
      fontSize: "14px",
      color: "#8e8e8e",
      fontWeight: 600,
    },
  },
}));

function RelativeScreams(props) {
  const { screams, scream: ownerScream } = props;
  const classes = useStyle();
  const screamOwner = screams.filter(
    (scream) => scream.userHandle === ownerScream.userHandle
  );
  return (
    <Grid item className={`${classes.root}`} xs={12} md={12}>
      <Typography className={classes.text}>
        More post from
        <Link to={`/profile/${ownerScream.userHandle}`}>
          {ownerScream.userHandle}
        </Link>
      </Typography>
      {
        <GridList cellHeight="auto" className={classes.gridList} cols={3}>
          {screamOwner.slice(0, 6).map((scream, index) => {
            return (
              <GridListTile key={index} cols={scream.cols || 1}>
                <ScreamBox
                  likeCount={scream.likeCount}
                  commentCount={scream.commentCount}
                  imageUrl={scream.imageUrl}
                  body={scream.body}
                  screamId={scream.screamId}
                />
              </GridListTile>
            );
          })}
        </GridList>
      }
    </Grid>
  );
}

export default RelativeScreams;
