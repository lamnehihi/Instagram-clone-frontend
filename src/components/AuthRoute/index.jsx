import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

AuthRoute.propTypes = {};

function AuthRoute({ component: Component, authenticated, ...rest }) {
  return <Route 
    {...rest}
    render={(props) => 
      authenticated === true ? <Redirect to="/"/> : <Component {...props} />
    }

  />;
}

export default AuthRoute;
