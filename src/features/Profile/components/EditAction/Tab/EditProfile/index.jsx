import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import EditAvatar from "features/Profile/components/EditAvatar";
import { EDIT_PROFILE } from "features/Profile/ProfileSlice";
import { LOADING_UI } from "features/Auth/UiSlice";

EditProfile.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  credentials: PropTypes.object.isRequired,
};

const useStyle = makeStyles((theme) => ({
  main: {
    width: "80%",
  },
  root: {
    width: "100%",
    boxSizing: "border-box",
    "& h1": {
      fontSize: "20px",
      lineHeight: "22px",
      marginBottom: "2px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontWeight: "400",
    },
    "& .MuiGrid-container": {
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
    },
    "& label": {
      fontWeight: 600,
    },
    "& form": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  avatar: {
    "& button": {
      padding: "0rem !important",
      color: "#0095f6",
      fontSize: "14px",
      textTransform: "none !important",
    },
  },
  aside: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "2rem",
    boxSizing: "border-box",
  },
  submit: {
    backgroundColor: "#42A6F7",
    color: "#fff",
    fontWeight: "bold",
    position: "relative",
    marginBottom: "2rem",
  },
  loading: {
    color: "#000",
    position: "absolute",
    top: "100%",
  },
}));

function EditProfile(props) {
  const { children, value, index, ...other } = props;
  const { credentials } = props;
  const classes = useStyle();

  const error = useSelector((state) => state.ui.errors);
  const [pure, setPure] = useState(true);
  const dispatch = useDispatch();

  const [user, setUser] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit edit", user);
    dispatch(LOADING_UI());
    dispatch(EDIT_PROFILE(user));
  };

  const handleChange = (event) => {
    setPure(false);

    setUser({
      ...user,
      [event.target.name] : event.target.value,
    })
  };

  const handleChangeAvatar = () => {
    const input = document.getElementById("imageInput");
    input.click();
  };
  useEffect(() => {
    if(credentials.handle) {
      console.log("set user");
      setUser({
        ...credentials
      })
    }
    return () => {
    }
  }, [credentials])

  const loading = useSelector(state => state.ui.loading);
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className={classes.main}
    >
      {value === index && (
        <Box className={classes.root} padding="3rem" width="100%">
          {/* Change Avatar */}
          <Grid container className={classes.avatar}>
            <Grid sm={3} className={classes.aside}>
              <Avatar alt={user.handle} src={user.imageUrl} />
              <EditAvatar />
            </Grid>
            <Grid sm={9}>
              <Box>
                <Typography variant="h1">{user.handle}</Typography>
                <Button onClick={handleChangeAvatar}>Change Avatar</Button>
              </Box>
            </Grid>
          </Grid>

          <form noValidate onSubmit={handleSubmit}>
            {/* Change handle */}
            <Grid container>
              <Grid sm={3} className={classes.aside}>
                <label for="handle">Handle</label>
              </Grid>
              <Grid sm={9}>
                <TextField
                  name="handle"
                  id="handle"
                  type="text"
                  value={user.handle}
                  onChange={handleChange}
                  helperText="In most cases, you'll be able to change your username back to thanhlam_41 for another 14 days. Learn More
New usernames for accounts that reach a lot of people might need to be reviewed."
                  error={error.handle ? true : false}
                />
              </Grid>
            </Grid>

            {/* Website */}
            <Grid container>
              <Grid sm={3} className={classes.aside}>
                <label for="website">Website</label>
              </Grid>
              <Grid sm={9}>
                <TextField
                  name="website"
                  id="website"
                  type="text"
                  value={user.website ? user.website : ""}
                  onChange={handleChange}
                  error={error.website ? true : false}
                />
              </Grid>
            </Grid>

            {/* Bio */}
            <Grid container>
              <Grid sm={3} className={classes.aside}>
                <label for="bio">Bio</label>
              </Grid>
              <Grid sm={9}>
                <TextField
                  name="bio"
                  id="bio"
                  type="text"
                  value={user.bio ? user.bio : ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* Location */}
            <Grid container>
              <Grid sm={3} className={classes.aside}>
                <label for="location">Location</label>
              </Grid>
              <Grid sm={9}>
                <TextField
                  name="location"
                  id="location"
                  type="text"
                  value={user.location ? user.location : ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* Email */}
            <Grid container>
              <Grid sm={3} className={classes.aside}>
                <label for="email">Email</label>
              </Grid>
              <Grid sm={9}>
                <TextField
                  name="email"
                  id="email"
                  type="text"
                  value={user.email ? user.email : ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </Grid>
            </Grid>

            <Button
              color="secondary"
              type="submit"
              variant="contained"
              className={classes.submit}
              disabled={pure}
            >
              Submit
              {loading && (
                <CircularProgress size="2rem" className={classes.loading} />
              )}
            </Button>
            
          </form>
        </Box>
      )}
    </div>
  );
}

export default EditProfile;
