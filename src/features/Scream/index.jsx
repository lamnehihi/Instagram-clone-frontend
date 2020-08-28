import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import NavBar from "components/NavBar";
import Main from "./pages/Main";

Scream.propTypes = {};

function Scream(props) {
  console.log("posts");
  return (
    <div>
      <NavBar />

      <Switch>
        <Route path='/posts/:screamId' component={Main}></Route>
      </Switch>
    </div>
  );
}

export default Scream;
