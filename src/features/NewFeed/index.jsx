import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Main from './pages/Main';
import Post from './pages/Post';

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
          component={Post}
        ></Route>

      </Switch>
  );
}

export default NewFeed;