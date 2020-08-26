import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Container, Hidden } from "@material-ui/core";
import screamApi from "api/screamApi";
import SubNewFeed from "features/NewFeed/components/SubNewFeed";
import ScreamList from "features/NewFeed/components/ScreamList";
import { useSelector, useDispatch } from "react-redux";
import { FLETCH_SCREAMS } from "features/NewFeed/NewFeedSlice";

Main.propTypes = {};

function Main(props) {
  const screams = useSelector((state) => state.newFeed);
  const dispatch = useDispatch();
  const {likes} = useSelector(state => state.user);


  useEffect(() => {
    dispatch(FLETCH_SCREAMS());
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <ScreamList screams={screams} likes={likes}/>
        <Hidden smDown>
          <SubNewFeed />
        </Hidden>
      </Grid>
    </Container>
  );
}

export default Main;
