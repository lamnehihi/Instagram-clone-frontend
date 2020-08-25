import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Container, Hidden } from "@material-ui/core";
import screamApi from "api/screamApi";
import SubNewFeed from "features/NewFeed/components/SubNewFeed";
import ScreamList from "features/NewFeed/components/ScreamList";
import { useSelector, useDispatch } from "react-redux";
import { FLETCH } from "features/NewFeed/NewFeedSlice";

Main.propTypes = {};

function Main(props) {
  const screams = useSelector((state) => state.newFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    const fletchAllScream = async () => {
      try {
        const response = await screamApi.getAll();
        const action = FLETCH(response);
        dispatch(action);
      } catch (error) {
        console.log("fail to get screams");
      }
    };

    fletchAllScream();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <ScreamList screams={screams} />
        <Hidden smDown>
          <SubNewFeed />
        </Hidden>
      </Grid>
    </Container>
  );
}

export default Main;
