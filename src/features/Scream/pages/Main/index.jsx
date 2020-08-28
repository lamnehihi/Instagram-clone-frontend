import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import screamApi from "api/screamApi";
import { Container, Grid } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GET_SCREAM, LIKE, UNLIKE, POST_COMMENT } from "features/Scream/ScreamSlice";
import ScreamDetails from "features/Scream/components/ScreamDetails";
import { useSelector } from "react-redux";
import {
  SET_LIKE_SCREAM,
  SET_UNLIKE_SCREAM,
} from "features/NewFeed/NewFeedSlice";
import { SET_LIKE_USER, SET_UNLIKE_USER } from "features/Auth/UserSlice";

Scream.propTypes = {};

function Scream(props) {
  console.log("sigle post mount");
  const { screamId } = useParams();
  const dispatch = useDispatch();

  const { likes, authenticated, credentials } = useSelector(
    (state) => state.user
  );
  const scream = useSelector((state) => state.scream);

  useEffect(() => {
    dispatch(GET_SCREAM(screamId));
  }, []);
  const checkLike = (screamId) => {
    const index = likes.findIndex((like) => {
      if (like.screamId === screamId) return like;
    });
    if (index >= 0) return true;
    else return false;
  };

  const history = useHistory();

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
        dispatch(LIKE());
      } else {
        dispatch(SET_UNLIKE_SCREAM(screamId));
        dispatch(SET_UNLIKE_USER(screamId));
        dispatch(UNLIKE());
      }
    } else {
      history.push("/login");
    }
  };

  const handleCommentSubmit = (body, screamId) => {
    if (authenticated) {
      console.log("comment", body);
      dispatch(POST_COMMENT({body, screamId}));
    } else {
      history.push("/login");
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <ScreamDetails
          handleCommentSubmit={handleCommentSubmit}
          scream={scream}
          handleLike={handleLike}
          isLike={checkLike(screamId)}
        />
      </Grid>
    </Container>
  );
}

export default Scream;
