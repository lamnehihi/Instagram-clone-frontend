import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";

import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ImageIcon from "@material-ui/icons/Image";
import RoomIcon from "@material-ui/icons/Room";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
    marginBottom: ".3rem",
    "& .makeStyles-speedDial-114": {
      position: "relative",
      bottom: 0,
      left: 5,
      height: "40px",
      "& button": {
        width: "40px",
        height: "40px",
      },
      "& .MuiFab-primary:hover": {
        backgroundColor: "#26262650",
      },
    },
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

ActionDial.propTypes = {
  handleAddImage: PropTypes.func,
};

ActionDial.defaultProps = {
  handleAddImage: null,
};

const actions = [
  { icon: <LoyaltyIcon />, name: "Tag" },
  { icon: <ImageIcon />, name: "Image" },
  { icon: <RoomIcon />, name: "Check in" },
  { icon: <EmojiEmotionsIcon />, name: "Emoji" },
  { icon: <ShareIcon />, name: "Share" },
];

function ActionDial(props) {
  const { handleAddImage } = props;
  const handleAddImageOnClick = () => {
    if (handleAddImage) {
      handleAddImage();
    }
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={false}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={
              action.name === "Image" ? handleAddImageOnClick : handleClose
            }
            tooltipPlacement="bottom-start"
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default ActionDial;
