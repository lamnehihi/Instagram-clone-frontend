import React from "react";
import { Container } from "@material-ui/core";
import VisitBio from "./VisitBio";
import VisitActivity from "./VisitActivity";

import { useSelector } from "react-redux";
import NotFoundProfile from "./NotFoundProfile";

VisitProfile.propTypes = {};

function VisitProfile(props) {
  const {
    website,
    email,
    imageUrl,
    handle,
    bio,
    location,
    userId,
    createdAt,
    screams,
  } = useSelector((state) => state.profile);
  const credentials = {
    website,
    email,
    imageUrl,
    handle,
    bio,
    location,
    userId,
    createdAt,
    screams,
  };
  const { errors } = useSelector((state) => state.ui);
  return errors.error === "user not found" ? (
    <Container maxWidth="md">
      <NotFoundProfile />
    </Container>
  ) : (
    <Container maxWidth="md">
      <VisitBio user={credentials} screams={screams} />
      <VisitActivity screams={screams} />
    </Container>
  );
}

export default VisitProfile;
