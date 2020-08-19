import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

Auth.propTypes = {
  
};


function Auth(props) {
  
  return (
    <Switch>
        <Route exact path='/login' component={Login}></Route>

        <Route
          exact
          path='/signup'
          component={Signup}
        ></Route>

      </Switch>
  );
}

export default Auth;