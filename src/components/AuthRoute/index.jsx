import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

AuthRoute.propTypes = {};

function AuthRoute({ component: Component, ...rest }) {
  const authenticated = useSelector(state => state.user.authenticated);
  return <Route 
    {...rest}
    render={(props) => 
      authenticated === true ? <Redirect to="/"/> : <Component {...props} />
    }

  />;
}

export default AuthRoute;
