import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  Typography,
  Link,
  Hidden,
  Grid,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { bioStyle } from "features/Profile/Style/bioStyle";



VisitBio.propTypes = {
  user: PropTypes.object.isRequired,
  screams: PropTypes.array.isRequired,
};

function VisitBio(props) {
  const { user, screams } = props;
  const classes = bioStyle();
  const history = useHistory();


  return (
    <Box className={classes.root} position="relative">
      <Grid xs={4} className="avatar">
      <Tooltip title="Avatar" placement="top">
      <ButtonBase disableRipple >
        <Avatar
          alt={user.handle}
          src={user.imageUrl}
          className={classes.large}
          variant="circle"
        />
        </ButtonBase>
        </Tooltip>
      </Grid>
      <Grid xs={8}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          className={`${classes.section} header`}
          position="relative"
        >
          <Typography variant="h2">{user.handle}</Typography>
          <Grid xs={12} md={3}>
          </Grid>
        </Box>

        <Hidden smDown>
        <Typography className={`${classes.section} ${classes.post}`}><span>{`${screams.length}`}</span>posts</Typography>
        </Hidden>
        <Box className={`${classes.section} bio`}>
          <Typography variant="h1">{user.email}</Typography>
          {user.location ? <Typography>{user.location}</Typography> : ""}
          {user.bio ? <Typography>{user.bio}</Typography> : ""}
          {user.website ? <Link href={user.website}>{user.website}</Link> : ""}
        </Box>
      </Grid>
    </Box>
  );
}

export default VisitBio;
