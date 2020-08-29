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
    position: "absolute",
    height: "40px",
    [theme.breakpoints.down('sm')]: {
      "& button": {
        height: "20px",
        width: "20px",
      },
    },
    "& button": {
      height: "40px",
      width: "40px",
      [theme.breakpoints.down('sm')]: {
        width: "30px",
      },
    },
    "& button:hover": {
      backgroundColor: "#26262650",
    },
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
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.root}
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
  );
}

export default ActionDial;
