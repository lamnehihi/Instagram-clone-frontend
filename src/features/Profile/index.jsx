import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NavBar from "components/NavBar";
import Main from "./pages/Main";
import Footer from "components/Footer";
import Edit from "./pages/EditProfile";
import VisitUser from "./pages/VisitUser";
import { Container } from "@material-ui/core";

Profile.propTypes = {};

function Profile(props) {
  const match = useRouteMatch();
  console.log("profile mount", { match });
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path={`${match.url}`} component={Main}></Route>
        <Route exact path={`${match.url}/edit`} component={Edit}></Route>
        <Route
          exact
          path={`${match.url}/:handle`}
          component={VisitUser}
        ></Route>
      </Switch>
      <Container maxWidth="md">
        <Footer />
      </Container>
    </div>
  );
}

export default Profile;
