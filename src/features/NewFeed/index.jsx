import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Scream from "../Scream/pages/Main";
import NavBar from "components/NavBar";

NewFeed.propTypes = {};

function NewFeed(props) {
  const match = useRouteMatch();
  console.log("newfeed mount");
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
