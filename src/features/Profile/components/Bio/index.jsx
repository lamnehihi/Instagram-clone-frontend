import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Link,
  Hidden,
  IconButton,
  Grid,
} from "@material-ui/core";

import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

Bio.propTypes = {
  user: PropTypes.object.isRequired,
};

const useStyle = makeStyles((theme) => ({
  root: {
    fontSize: "1.2rem",
    paddingTop: "2rem",
    display: "flex",
    "& h2": {
      fontSize: "32px",
      lineHeight: "32px",
      fontWeight: "300",
      marginRight: "1rem",
    },
    "& p, a": {
      fontSize: "1.2rem",
      lineHeight: "2.5rem",
    },
    "& .MuiTypography-h1, a": {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
    "& button": {
      backgroundColor: "#fff",
    },
    "& a": {
      color: "rgba(0,55,107,1)",
      textDecoration: "none",
    },
    "& .avatar": {
      display: "flex",
      width: "300px",
      height: "200px",
      justifyContent: "center",
    },
    "& .MuiButton-root": {
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      "& .avatar": {
        display: "flex",
        width: "fit-content !important",
        height: "fit-content",
        justifyContent: "center",
        marginRight: "1rem",
      },
      "& h2": {
        position: 'absolute',
        left: "1%",
        top: '5%'
      },
      "& .MuiIconButton-root": {
        position: 'absolute',
        right: "0%",
        top: '2.8%'
      },
      "& .header" : {
        height : "150px",
      },
      "& .bio" : {
        position: "absolute",
        height : "150px",
        left: "5.5%"
      },
      "& p, a": {
        fontSize: "14px",
        lineHeight: "1.5rem",
      },
      "& .MuiTypography-h1, a": {
        fontSize: "14px",
        fontWeight: 600,
      },
    },
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },

  section: {
    marginBottom: "1rem",
  },
}));

function Bio(props) {
  const { user } = props;
  const classes = useStyle();
  return (
    <Box className={classes.root} position="relative">
      <Grid xs={4} className="avatar">
        <Avatar
          alt={user.handle}
          src={user.imageUrl}
          className={classes.large}
          variant="circle"
        />
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
            <Button variant="outlined">Edit Profile</Button>
          </Grid>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>

        <Hidden smDown>
          <Typography className={classes.section}>{`posts`}</Typography>
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
