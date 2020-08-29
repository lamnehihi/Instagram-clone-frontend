import React, { createRef } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { DELETE_SCREAMS } from "features/NewFeed/NewFeedSlice";
import { useHistory } from "react-router-dom";

ScreamDialog.propTypes = {
  authenticated: PropTypes.bool,
  isMyScream: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleGotoPost: PropTypes.func,
};

ScreamDialog.defaultProps = {
  authenticated: false,
  isMyScream: false,
  handleGotoPost: null,
};

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    "& .MuiList-root": {
      width: "400px",
      padding: "0rem",
    },
    "& .MuiListItem-root": {
      display: "flex",
      justifyContent: "center",
      height: "50px",
    },
  },
  report: {
    color: "#ed4956",
    fontWeight: 500,
  },
});

function ScreamDialog(props) {
  const classes = useStyles();
  const { authenticated, isMyScream, handleClick, open, handleDelete, handleGotoPost } = props;
  const history = useHistory();

  const handleClose = () => {
    handleClick();
  };

  const handleReport = () => {
    handleClick();
    if (!authenticated) {
      history.push("/login");
    }
  };

  const handleDeleteClick = () => {
    if (handleDelete) {
      handleDelete();
    }
  };

  const handleGotoPostClick = () => {
    if (handleGotoPost) {
      handleGotoPost();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.root}
    >
      <List>
        {isMyScream && (
          <ListItem button onClick={handleDelete}>
            <Typography className={classes.report}>Delete post</Typography>
            
          </ListItem>
        )}
        <Divider />
        <ListItem button onClick={handleReport}>
          <Typography className={classes.report}>
            Report Inappropriate
          </Typography>
        </ListItem>
        <Divider />

        <ListItem button onClick={handleGotoPostClick}>
          <Typography>Go to post</Typography>
        </ListItem>
        <Divider />

        <ListItem autoFocus button onClick={handleClose}>
          <Typography>Cancel</Typography>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default ScreamDialog;
