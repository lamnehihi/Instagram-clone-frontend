import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import NavBar from "components/NavBar";
import Main from "./pages/Main";
import Footer from "components/Footer";
import Edit from "./pages/EditProfile";
import VisitUser from "./pages/VisitUser";

Profile.propTypes = {};;

function Profile(props) {
  const match = useRouteMatch();
  console.log("profile mount");
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path={match.url} component={Main}></Route>
        <Route exact path={`${match.url}/edit`} component={Edit}></Route>
        <Route exact path={`${match.url}/:handle`} component={VisitUser}></Route>
      </Switch>
      <Footer />

    </div>
  );
}

export default Profile;
