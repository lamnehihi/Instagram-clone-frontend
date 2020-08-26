import React from "react";
import PropTypes from "prop-types";
import { Container, makeStyles, Tabs, Tab, Paper } from "@material-ui/core";
import EditProfile from "./Tab/EditProfile";

EditAction.propTypes = {
  credentials: PropTypes.object.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 650,
    "& span": {
      alignItems: "end",
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function EditAction(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const {credentials} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={15}>
      <Container maxWidth="md" className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          <Tab label="App and Website" {...a11yProps(2)} />
          <Tab label="Email and SMS" {...a11yProps(3)} />
          <Tab label="Push Notification" {...a11yProps(4)} />
          <Tab label="Manage Contacts" {...a11yProps(5)} />
          <Tab label="Login Activity" {...a11yProps(6)} />
        </Tabs>

        <EditProfile value={value} index={0} credentials={credentials}/>
      </Container>
    </Paper>
  );
}

export default EditAction;
