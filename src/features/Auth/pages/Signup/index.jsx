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
import authApi from "api/authApi";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import styleSignup from "utils/styleSignup";
import { SET_AUTHENTICATED } from "features/Auth/UserSlice";
import { useSelector, useDispatch } from "react-redux";

const style = styleSignup;

function Signup(props) {
  const classes = style();
  const [user, setUser] = useState({
    email: "",
    handle: "",
    password: "",
    confirmPassword: "",
  });
  const loading = useSelector(state => state.ui.loading);
  const error = useSelector(state => state.ui.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit signup");

    const action = SET_AUTHENTICATED({user, history});
    dispatch(action);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const userSignUp = useSelector((state) => state.user);

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item sm />
        <Grid item sm>
          <Paper item sm className={classes.box} elevation={15}>
            <img
              src={appIcon}
              alt="instagram"
              width="175px"
              height="51px"
              className={classes.logo}
            />

            <Link
              href="#"
              color="secondary"
              display="block"
              className={classes.bold}
            >
              Sign up with google
            </Link>
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
        <Grid item sm />
      </Grid>
      <footer className={classes.footer}>
        <Typography>© 2020 INSTAGRAM CLONE FROM LAMNEHIHI</Typography>
      </footer>
    </div>
  );
}

export default withStyles(style)(Signup);
