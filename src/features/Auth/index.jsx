import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JwtDecode from "jwt-decode";
import AuthRoute from "components/AuthRoute";
import { useSelector } from "react-redux";
import SignupWithGoogle from "./pages/SignupWithGoogle";

Auth.propTypes = {};

function Auth(props) {
  return (
    <Switch>
      <AuthRoute exact path="/login" component={Login} />

      <AuthRoute exact path="/signup" component={Signup} />

      <AuthRoute exact path="/signupwithgoogle" component={SignupWithGoogle} />
    </Switch>
  );
}

export default Auth;
