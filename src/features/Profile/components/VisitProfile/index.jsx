import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import VisitBio from './VisitBio';
import VisitActivity from './VisitActivity';

import { useSelector } from 'react-redux';

VisitProfile.propTypes = {
};

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
  return (
    <Container maxWidth="md">
      <VisitBio user={credentials} screams={screams}/>
      <VisitActivity screams={screams} />
    </Container>
  );
}

export default VisitProfile;