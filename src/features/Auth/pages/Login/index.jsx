import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Grid, withStyles, makeStyles, TextField, Button, Typography, CircularProgress } from "@material-ui/core";
import appIcon from "assets/images/logo.png";
import authApi from "api/authApi";
import Axios from "axios";

const style = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  box: {
    maxWidth: "350px",
    border: "1px solid #ddd",
    padding: "2rem",
  },
  textField: {
    marginBottom: ".5rem",
    height: "70px"
  },
  button: {
    backgroundColor: "#C0DFFD",
    color: "#fff",
    fontWeight: "bold",
    position: "relative",
  },
  loading: {
    color: "#000",
    position: "absolute",
    top: "100%",
  },
  error: {
    color: '#F44335',
    minHeight: "30px"
  }
}));

function Login(props) {
  const classes = style();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

const handleSubmit =  (event) => {
  event.preventDefault();
  setLoading(true);
  console.log("submit login");
    
  setTimeout( async()=> {
    console.log("user", user);
    try {
      const res = await Axios.post("auth/login", user);
      console.log("res",res.data);
    } catch (error) {
      console.log("error", error.response.data);
      setError(error.response.data);
    }
    setLoading(false);
  }, 500)
};

const handleChange = (event) => {
  setUser({
    ...user,
    [event.target.name] : event.target.value
  })
}

  return (
    <Grid container className={classes.root}>
      <Grid item sm />
      <Grid item sm className={classes.box}>
        <img src={appIcon} alt="instagram" width="175px" height="51px" />
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
        {
          error.general ? 
          (
            <Typography className={classes.error}>wrong emai or password</Typography>
          ) : (
            <Typography className={classes.error}></Typography>
            )
        }
        <Button disabled={loading} type="submit" color="primary" variant="contained" className={classes.button}>Log In
        {
          loading && <CircularProgress size="2rem" className={classes.loading} />
        }
        </Button>
        </form>
        
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default withStyles(style)(Login);
