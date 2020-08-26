import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import ScreamCard from "../ScreamCard";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_LIKE_SCREAM, SET_UNLIKE_SCREAM } from "features/NewFeed/NewFeedSlice";
import { SET_LIKE_USER, SET_UNLIKE_USER } from "features/Auth/UserSlice";

ScreamList.propTypes = {
  screams: PropTypes.array,
  likes: PropTypes.array,
};

ScreamList.defaultProps = {
  screams: [],
  likes: [],
};

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",

  },
}));

function ScreamList(props) {
  const { screams, likes } = props;
  const classes = useStyle();
  const checkLike = (scream) => {
    const {screamId} = scream;
    const index = likes.findIndex(like => { 
      if(like.screamId === screamId) return like
    });
    if(index >= 0) return true;
    else return false
  }  

  const { authenticated, credentials } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLike = (screamId, isLike) => {
    if(authenticated) {
      console.log("like", screamId);
      if(!isLike) {
        const newLike = {
          screamId,
          userHandle : credentials.handle,
        }
        dispatch(SET_LIKE_SCREAM(newLike));
        dispatch(SET_LIKE_USER(newLike));
      }else{
        dispatch(SET_UNLIKE_SCREAM(screamId));
        dispatch(SET_UNLIKE_USER(screamId));
      }
    }
    else {
      history.push("/login")
    }
  }

  return (
    <Grid item className={`${classes.root}`} xs={7}>
      {screams.map((scream, index) => {
        return <ScreamCard key={index} scream={scream} isLike={checkLike(scream)} handleLike={handleLike}/>;
      })}
    </Grid>
  );
}

export default ScreamList;
