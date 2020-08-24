import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Bio from 'features/Profile/components/Bio';

About.propTypes = {
};

function About(props) {
  const { authenticated, credentials, likes, notification } = useSelector(state => state.user);
  return (
    <Container maxWidth="md">
      <Bio user={credentials} />
    </Container>
  );
}

export default About;