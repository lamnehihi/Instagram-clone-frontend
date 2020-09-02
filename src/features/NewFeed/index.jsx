import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Main from "./pages/Main";
import NavBar from "components/NavBar";
import { useDispatch } from "react-redux";
import {  LOADING_NEW_FEED_DONE } from "features/Auth/UiSlice";

NewFeed.propTypes = {};

function NewFeed(props) {
  const match = useRouteMatch();
  console.log("newfeed mount");
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(LOADING_NEW_FEED_DONE());
    }, 1000);
  }, [])

  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path={match.url} component={Main}></Route>
      </Switch>
    </div>
  );
}

export default NewFeed;
