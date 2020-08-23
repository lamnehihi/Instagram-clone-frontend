import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JwtDecode from "jwt-decode";
import AuthRoute from "components/AuthRoute";

Auth.propTypes = {};

const token = localStorage.getItem("FBIdToken");
let decodedToken;

if (token) {
  decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
  } else {
  }
}

function Auth(props) {
  console.log("auth mount");

  return (
    <Switch>
      <AuthRoute
        exact
        path="/login"
        component={Login}
      />

      <AuthRoute
        exact
        path="/signup"
        component={Signup}
      />
    </Switch>
  );
}

export default Auth;
