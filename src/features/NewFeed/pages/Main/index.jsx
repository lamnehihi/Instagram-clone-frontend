import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Container, Hidden } from "@material-ui/core";
import screamApi from "api/screamApi";
import SubNewFeed from "features/NewFeed/components/SubNewFeed";
import ScreamList from "features/NewFeed/components/ScreamList";
import { useSelector, useDispatch } from "react-redux";
import { FLETCH_SCREAMS } from "features/NewFeed/NewFeedSlice";
import { LOADING_NEW_FEED, LOADING_NEW_FEED_DONE } from "features/Auth/UiSlice";

Main.propTypes = {};

function Main(props) {
  const screams = useSelector((state) => state.newFeed);
  const dispatch = useDispatch();
  const {likes, credentials} = useSelector(state => state.user);

  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <ScreamList screams={screams} likes={likes}/>
        <Hidden smDown>
          <SubNewFeed credentials={credentials}/>
        </Hidden>
      </Grid>
    </Container>
  );
}

export default Main;
