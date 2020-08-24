import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Paper, Tabs, Tab } from "@material-ui/core";
import ScreamTab from "./Tab/ScreamTab";
import VideoTab from "./Tab/VideoTab";
import BookMarkTab from "./Tab/BookMarkTab";
import TagTab from "./Tab/TagTab";

import AppsIcon from '@material-ui/icons/Apps';
import TvIcon from '@material-ui/icons/Tv';
import TurnedInNotSharpIcon from '@material-ui/icons/TurnedInNotSharp';
import LoyaltySharpIcon from '@material-ui/icons/LoyaltySharp';

Activity.propTypes = {
  screams: PropTypes.array,
};

Activity.defaultProps = {
  screams: [],
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "9rem",
    "& .MuiTab-wrapper" : {
      height: "100%",
      width: "100%",
      display : 'flex',
      fontSize: '12px',
      flexDirection: "row",
      justifyContent : "center",
      alignItems : "center",
      "& .MuiSvgIcon-root" : {
        marginBottom: "0rem",
        marginRight: ".5rem",
      }
    }
  },
});

function Activity(props) {
  const screams = props;
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={10} className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        centered
      >
        <Tab label="SCREAMS" icon={<AppsIcon fontSize="small" />} {...a11yProps(0)} />
        <Tab label="SCTV" {...a11yProps(1)} icon={<TvIcon fontSize="small" />}/>
        <Tab label="SAVED" {...a11yProps(2)} icon={<TurnedInNotSharpIcon fontSize="small" />} />
        <Tab label="TAGGED" {...a11yProps(3)} icon={<LoyaltySharpIcon fontSize="small" />}/>
      </Tabs>

      <ScreamTab value={value} index={0}></ScreamTab>
      <VideoTab value={value} index={1}></VideoTab>
      <BookMarkTab value={value} index={2}></BookMarkTab>
      <TagTab value={value} index={3}></TagTab>
    </Paper>
  );
}

export default Activity;
