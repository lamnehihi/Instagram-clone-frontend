import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  Hidden,
  Grid,
  makeStyles,
  Box,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useRandomHottest from "hooks/useRandomHottest.js";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

SubNewFeed.propTypes = {
  credentials: PropTypes.object,
};

SubNewFeed.defaultProps = {
  credentials: {},
};

const useStyle = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    position: "sticky",
    padding: "1rem 1rem 3rem 3rem",
    width: "100%",
    top: "100px",
    "& a": {
      color: "#262626",
      textDecoration: "none",
    },
    "& .MuiAvatar-root": {
      marginRight: "1rem",
    },
    "& h4": {
      fontSize: "14px",
      fontWeight: 600,
      color: "#8e8e8e",
      marginBottom: "1rem",
    },
    "& h5": {
      fontSize: "14px",
      fontWeight: 600,
    },
    "& h6": {
      fontSize: "12px",
      fontWeight: 400,
      color: "#8e8e8e",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  footer: {
    listStyle: "none",
    padding: "0rem",
    margin: "0rem",
    "& li": {
      display: "inline-block",
      width: "fit-content",
      marginRight: ".25rem",
      textTransform: "capitalize",
      fontSize: "12px",
      color: "#c7c7c7",
      fontWeight: 400,
    },
    "& li:last-child": {
      marginTop: "1rem",
      color: "#c7c7c7",
    },
  },
  section: {
    marginBottom: "2rem",
  },
  relative: {
    position: "relative",
  },
  suggest: {
    "& .MuiButton-root": {
      color: "#0096F6",
      fontSize: "10px",
      fontWeight: 500,
      textTransform: "capitalize",
    },
  },
  userSuggest: {
    marginBottom: ".6rem",
  },
}));

function SubNewFeed(props) {
  const { credentials } = props;
  const hottest = useSelector(state => state.hottest);
  const classes = useStyle();
  const helpText = [
    "Suggested for you",
    "New to Instagram",
    "Followed by hottest",
  ];

  const { loadingNewFeed } = useSelector((state) => state.ui);

  return (
    <Grid item xs={4} className={classes.relative}>
      <Box className={classes.root}>
        {credentials.handle ? (
          <Link to={`/profile/${credentials.handle}`}>
            <Box
              className={`${classes.user} ${classes.section}`}
              display="flex"
            >
              <Avatar
                alt={credentials.handle}
                src={credentials.imageUrl}
                className={classes.large}
              />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="h5">{credentials.handle}</Typography>
                <Typography variant="h6">{credentials.email}</Typography>
              </Box>
            </Box>
          </Link>
        ) : (
          <Box className={`${classes.section}`}>
            <Link to="/signup" underline="none">
              Become one of us now?
            </Link>
          </Box>
        )}

        <Box
          className={`${classes.suggest} ${classes.section}`}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h4">Hottest people</Typography>

          {(loadingNewFeed
            ? Array.from(new Array(6))
            : hottest.slice(0, 6)
          ).map((people, index) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                className={`${classes.userSuggest}`}
                key={index}
              >
                <Box display="flex" alignItems="center" width="100%">
                  {people ? (
                    <Avatar
                      src={people.avatar}
                      alt={people.name}
                      className={classes.small}
                    />
                  ) : (
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={32}
                      height={32}
                    />
                  )}

                  {people ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                    <Link to={`/profile/${people.name}`}>
                      <Typography variant="h5">{people.name}</Typography>
                      </Link>
                      <Typography variant="h6">
                        {helpText[Math.trunc(Math.random() * 2)]}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      width="30%"
                      marginLeft=".5rem"
                    >
                      <Skeleton animation="wave" width="100%" height={18} />
                      <Skeleton animation="wave" width="60%" height={18} />
                    </Box>
                  )}
                </Box>
                {people && (
                  <Button href="#text-buttons" color="primary">
                    Follow
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>

        <ul className={`${classes.footer} ${classes.section}`}>
          <li>about ·</li>
          <li>help ·</li>
          <li>press ·</li>
          <li>api ·</li>
          <li>jobs ·</li>
          <li>privacy ·</li>
          <li>term ·</li>
          <li>locations ·</li>
          <li>top accounts ·</li>
          <li>hashtags ·</li>
          <li>language</li>
          <li sm={12}>© 2020 INSTAGRAM CLONE FROM LAMNEHIHI</li>
        </ul>
      </Box>
    </Grid>
  );
}

export default SubNewFeed;
