import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { GET_VISIT_USER } from "features/Profile/ProfileSlice";
import { useParams, useHistory } from "react-router-dom";
import VisitProfile from "features/Profile/components/VisitProfile";

VisitUser.propTypes = {};

function VisitUser(props) {
  const {handle} = useSelector(state => state.user.credentials);
  const history = useHistory();
  const { handle: handleId } = useParams();

  if(handleId === handle) {
    history.push('/profile');
  }
  const dispatch = useDispatch();
  dispatch(GET_VISIT_USER(handleId));

  return (
    <VisitProfile />
  );
}

export default VisitUser;
