import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Main from "./pages/Main";
import NavBar from "components/NavBar";

NewFeed.propTypes = {};

function NewFeed(props) {
  const match = useRouteMatch();
  console.log("newfeed mount");
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(TURN_OFF_NOTI());
  //   }, 6000);

  // }, [])
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
