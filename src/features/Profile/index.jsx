import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import NavBar from "components/NavBar";
import Main from "./pages/Main";

Profile.propTypes = {};

function Profile(props) {
  const match = useRouteMatch();
  console.log("profile mount");
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path={match.url} component={Main}></Route>
      </Switch>
    </div>
  );
}

export default Profile;
