import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Link,
  Hidden,
  IconButton,
  Grid,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";

import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { useHistory } from "react-router-dom";
import EditAvatar from "../EditAvatar";
import { bioStyle } from "features/Profile/Style/bioStyle";

Bio.propTypes = {
  user: PropTypes.object.isRequired,
  screams: PropTypes.array.isRequired,
};

function Bio(props) {
  const { user, screams } = props;
  const classes = bioStyle();
  const history = useHistory();
  const handleOnClick = () => {
    history.push("/profile/edit");
  };

  const handleImageClick = () => {
    const input = document.getElementById("imageInput");
    input.click();
  };
  return (
    <Box className={classes.root} position="relative">
      <Grid xs={4} item className="avatar">
        <Tooltip title="Edit Avatar" placement="top">
          <ButtonBase disableRipple onClick={handleImageClick}>
            <Avatar
              alt={user.handle}
              src={user.imageUrl}
              className={classes.large}
              variant="circle"
            />
          </ButtonBase>
        </Tooltip>
        <EditAvatar />
      </Grid>
      <Grid xs={8} item>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          className={`${classes.section} header`}
          position="relative"
        >
          <Typography variant="h2" style={{display: "contents"}}>{user.handle}</Typography>
          <Grid xs={12} md={3} item>
            <Button variant="outlined" onClick={handleOnClick}>
              Edit Profile
            </Button>
          </Grid>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>

        <Hidden smDown>
          <Typography className={`${classes.section} ${classes.post}`}>
            <span>{`${screams.length}`}</span>posts
          </Typography>
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

export default Bio;
