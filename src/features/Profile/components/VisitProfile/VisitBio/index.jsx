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
import Skeleton from "@material-ui/lab/Skeleton";

VisitBio.propTypes = {
  user: PropTypes.object,
  screams: PropTypes.array,
};

VisitBio.defaultProps = {
  user: {},
  scream: [],
};

function VisitBio(props) {
  const { user, screams } = props;
  const classes = bioStyle();
  const history = useHistory();

  return (
    <Box className={classes.root} position="relative">
      <Grid item xs={4} className="avatar">
        <Tooltip title="Avatar" placement="top">
          <ButtonBase disableRipple>
            {user.imageUrl ? (
              <Avatar
                alt={user.handle}
                src={user.imageUrl}
                className={classes.large}
                variant="circle"
              />
            ) : (
              <Skeleton variant="circle" width={160} height={160} />
            )}
          </ButtonBase>
        </Tooltip>
      </Grid>
      <Grid item xs={8}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          className={`${classes.section} header`}
          position="relative"
        >
          <Typography variant="h2">
            {user.handle ? user.handle : <Skeleton width={260} />}
          </Typography>
          <Grid item xs={12} md={3}></Grid>
        </Box>

        <Hidden smDown>
          {user.handle ? (
            <Typography className={`${classes.section} ${classes.post}`}>
              <span>{`${screams.length}`}</span>posts
            </Typography>
          ) : (
            <Typography>
            <Skeleton width={160} />
            </Typography>
          )}
        </Hidden>
        {user.handle ? (
          <Box className={`${classes.section} bio`}>
            <Typography variant="h1">{user.email}</Typography>
            {user.location ? <Typography>{user.location}</Typography> : ""}
            {user.bio ? <Typography>{user.bio}</Typography> : ""}
            {user.website ? (
              <Link href={user.website}>{user.website}</Link>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <Box className={`${classes.section} bio`}>
            <Typography><Skeleton width={160} /></Typography>
            <Typography><Skeleton width={160} /></Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}

export default VisitBio;
