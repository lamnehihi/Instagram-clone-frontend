import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Main from './pages/Main';
import Scream from './pages/Scream';

NewFeed.propTypes = {
  
};

function NewFeed(props) {
  const match = useRouteMatch();

  return (
    <Switch>
        <Route exact path={match.url} component={Main}></Route>

        <Route
          exact
          path={`${match.url}/:postId`}
          component={Scream}
        ></Route>

      </Switch>
  );
}

export default NewFeed;