import React, { useState, useEffect } from "react";
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
import styleSignup from "features/Auth/Style/styleSignup";
import { SET_AUTHENTICATED_SIGNUP, setAuthorizationHeader } from "features/Auth/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import Axios from "axios";

SignupWithGoogle.propTypes = {
};

const style = styleSignup;


function SignupWithGoogle(props) {
  const classes = style();
  const [user, setUser] = useState({
    email: '',
    handle: '',
    password: "",
    confirmPassword: "",
  });
  const loading = useSelector(state => state.ui.loading);
  const error = useSelector(state => state.ui.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit signup google");

    const action = SET_AUTHENTICATED_SIGNUP({user, history});
    dispatch(action);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  console.log("sign up with google");

  //hadle auth firebase state change
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (userGmail) => {
        if (!userGmail) {
          //userGmail logout, handle something here
          console.log("logout");
          return;
        }
        console.log("login with google", { ...userGmail });
        const gmailhandle = userGmail.displayName;
        const gmail = userGmail.email;
        setUser({
          ...user,
          handle: gmailhandle,
          email: gmail,
        })
        // Check handle of this Gmail.
        //.if it already have this handle -> set token and login.
        //.if not, -> update more data and create user for login.
        try {
          Axios.defaults.baseURL =
            "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
          const res = await Axios.get(`user/${gmailhandle}`);
          const token = await userGmail.getIdToken();

          setAuthorizationHeader(token);
        } catch (error) {
          console.log("handle update more data");
          //history.push("/");
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item sm>
          <Paper item sm className={classes.box} elevation={15}>
            <img
              src={appIcon}
              alt="instagram"
              width="175px"
              height="51px"
              className={classes.logo}
            />

            <Typography
              color="secondary"
              display="block"
              className={classes.bold}
            >
              Please filled out to continues
            </Typography>
            <Box
            marginTop=".5rem"
              display="flex"
              position="relative"
              justifyContent="space-between"
              alignItems="center"
            >
            </Box>
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
                size="small"
                disabled={true}
              />
              <TextField
                name="handle"
                id="handle"
                label="Username"
                color="secondary"
                type="text"
                className={classes.textField}
                value={user.handle}
                onChange={handleChange}
                variant="outlined"
                helperText={error.handle}
                error={error.handle ? true : false}
                size="small"
                disabled={true}
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
                size="small"
              />
              <TextField
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                color="secondary"
                type="password"
                className={classes.textField}
                value={user.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                helperText={error.password}
                error={error.password ? true : false}
                size="small"
              />
              
              <Button
                disabled={loading}
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Sign up
                {error.general ? (
                  <Typography className={classes.error}>
                    wrong emai or password
                  </Typography>
                ) : (
                  <Typography className={classes.error}></Typography>
                )}
                {loading && (
                  <CircularProgress size="2rem" className={classes.loading} />
                )}
              </Button>
            </form>
          </Paper>
          <Paper item sm className={classes.boxSignup} elevation={15}>
            Have an account?
            <Link href="/login" color="secondary">
              Log in
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <footer className={classes.footer}>
        <Typography>© 2020 INSTAGRAM CLONE FROM LAMNEHIHI</Typography>
      </footer>
    </div>
  );
}

export default withStyles(style)(SignupWithGoogle);
