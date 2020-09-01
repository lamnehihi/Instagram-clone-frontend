import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles, Box } from "@material-ui/core";
import ScreamCard from "../ScreamCard";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  SET_LIKE_SCREAM,
  SET_UNLIKE_SCREAM,
  POST_SCREAM,
} from "features/NewFeed/NewFeedSlice";
import { SET_LIKE_USER, SET_UNLIKE_USER } from "features/Auth/UserSlice";
import ScreamPost from "../ScreamPost";
import { POST_COMMENT } from "features/Scream/ScreamSlice";

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
    const { screamId } = scream;
    const index = likes.findIndex((like) => {
      if (like.screamId === screamId) return like;
    });
    if (index >= 0) return true;
    else return false;
  };

  const { authenticated, credentials } = useSelector((state) => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLike = (screamId, isLike) => {
    if (authenticated) {
      console.log("like", screamId);
      if (!isLike) {
        const newLike = {
          screamId,
          userHandle: credentials.handle,
        };
        dispatch(SET_LIKE_SCREAM(newLike));
        dispatch(SET_LIKE_USER(newLike));
      } else {
        dispatch(SET_UNLIKE_SCREAM(screamId));
        dispatch(SET_UNLIKE_USER(screamId));
      }
    } else {
      history.push("/login");
    }
  };

  const formData = new FormData();

  const handlePost = (body) => {
    formData.set("body", body);

    //clone new form
    const newForm = new FormData();
    newForm.set("body", body);
    if (formData.get("image")) {
      newForm.set("image", formData.get("image"), formData.get("image").name);
    }
    dispatch(POST_SCREAM(newForm));

    //set form to null
    formData.delete("body");
    formData.delete("image");
  };

  const handleImageChange = (image) => {
    formData.delete("image");
    formData.set("image", image, image.name);
  };

  const handleCommentSubmit = (body, screamId) => {
    if (authenticated) {
      console.log("comment", body);
      dispatch(POST_COMMENT({ body, screamId }));
    } else {
      history.push("/login");
    }
  };

  return (
    <Grid item className={`${classes.root}`} xs={10} md={8}>
      <ScreamPost
        handleImageChange={handleImageChange}
        handlePost={handlePost}
        authenticated={authenticated}
        credentials={credentials}
      />
      {screams.map((scream, index) => {
        return (
          <ScreamCard
            handleCommentSubmit={handleCommentSubmit}
            key={index}
            scream={scream}
            isLike={checkLike(scream)}
            handleLike={handleLike}
          />
        );
      })}
    </Grid>
  );
}

export default ScreamList;
