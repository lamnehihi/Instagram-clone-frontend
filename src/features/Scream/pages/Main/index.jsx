import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Divider, Box } from "@material-ui/core";
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
import RelativeScreams from "features/Scream/components/RelativeScreams";
import Footer from "components/Footer";
import NotFoundScream from "features/Scream/components/NotFoundScream";

Scream.propTypes = {};

function Scream(props) {
  console.log("sigle post mount");
  const { screamId } = useParams();
  const dispatch = useDispatch();

  const { likes, authenticated, credentials } = useSelector(
    (state) => state.user
  );
  const scream = useSelector((state) => state.scream);
  const screams = useSelector((state) => state.newFeed);

  useEffect(() => {
    dispatch(GET_SCREAM(screamId));
  }, [screamId]);
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

  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  const { errors } = useSelector((state) => state.ui);

  return errors.error === "scream not found" ? (
    <Container maxWidth="md">
      <NotFoundScream />
      <Footer />
    </Container>
  ) : (
    <Container maxWidth="md">
      <Grid container justify="center">
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <ScreamDetails
          handleCommentSubmit={handleCommentSubmit}
          scream={scream}
          handleLike={handleLike}
          isLike={checkLike(screamId)}
        />
         <Divider style={{width: "100%"}} variant="middle" />
        <RelativeScreams screams={screams} scream={scream}/>
        </Box>

        <Footer />
      </Grid>
    </Container>
  );
}

export default Scream;
