import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid  } from "@material-ui/core";
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
    <Grid container spacing={10}>
      <ScreamList screams={screams} />
      <SubNewFeed />
    </Grid>
  );
}

export default Main;
