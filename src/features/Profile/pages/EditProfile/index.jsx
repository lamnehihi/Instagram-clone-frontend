import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import EditAction from "features/Profile/components/EditAction";
import { useSelector } from "react-redux";

Edit.propTypes = {};

function Edit(props) {
  const {
    authenticated,
    credentials,
    likes,
    notifications,
    screams,
  } = useSelector((state) => state.user);
  return (
    <Container maxWidth="md">
      <EditAction credentials={credentials} />
    </Container>
  );
}

export default Edit;
