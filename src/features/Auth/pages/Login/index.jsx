import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  withStyles,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Divider,
  Box,
  Link,
  Paper,
} from "@material-ui/core";
import appIcon from "assets/images/logo.png";
import { useHistory } from "react-router-dom";
import styleLogin from "features/Auth/Style/styleLogin";
import { SET_AUTHENTICATED_LOGIN } from "features/Auth/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from "App";

const style = styleLogin;

function Login(props) {
  const classes = style();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loading = useSelector(state => state.ui.loading);
  const error = useSelector(state => state.ui.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit login");

    const action = SET_AUTHENTICATED_LOGIN({user, history});
    dispatch(action);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const userLogin = useSelector((state) => state.user);
  console.log("login");


  return (
    <div>
    <Grid container className={classes.root}>
      <Grid item sm>
        <Paper className={classes.box} elevation={15}>
          <img
            src={appIcon}
            alt="instagram"
            width="175px"
            height="51px"
            className={classes.logo}
          />
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <TextField
              name="email"
              id="email"
              label="Email"
              color="secondary"
              type="email"
              className={classes.textField}
              value={user.email}
              onChange={handleChange}
              variant="outlined"
              helperText={error.email}
              error={error.email ? true : false}
            />
            <TextField
              name="password"
              id="password"
              label="Password"
              color="secondary"
              type="password"
              className={classes.textField}
              value={user.password}
              onChange={handleChange}
              variant="outlined"
              helperText={error.password}
              error={error.password ? true : false}
            />

            <Button
              disabled={loading}
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Log In
              {error.general && (
                <Typography className={classes.error}>
                  wrong emai or password
                </Typography>
              )}
              
              {loading && (
                <CircularProgress size="2rem" className={classes.loading} />
              )}
            </Button>
          </form>
          <Box
            display="flex"
            position="relative"
            justifyContent="space-between"
            alignItems="center"
          >
            <Divider className={classes.divider} variant="middle" />
            <Typography className={classes.subdDivider}>OR</Typography>
            <Divider className={classes.divider} variant="middle" />
          </Box>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          <Link
            href="#"
            color="secondary"
            display="block"
            className={classes.smaller}
          >
            Forgot password?
          </Link>
        </Paper>
        <Paper className={classes.boxSignup} elevation={15}>
          Don't have an account? 
          <Link href="/signup" color="secondary">
          Sign up
          </Link>
        </Paper>
      </Grid>
    </Grid>
    <footer className={classes.footer}>
    <Typography>
    © 2020 INSTAGRAM CLONE FROM LAMNEHIHI
    </Typography>
    </footer>
    </div>
  );
}

export default withStyles(style)(Login);
