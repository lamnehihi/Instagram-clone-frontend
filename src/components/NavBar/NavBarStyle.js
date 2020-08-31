const { makeStyles } = require("@material-ui/core");

export const NavBarStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    "& #notification::after": {
      background: "#ed4956",
      borderRadius: "2px",
      bottom: "-10px",
      content: "",
      height: "4px",
      left: 0,
      margin: "0 auto",
      position: "absolute",
      right: 0,
      transition: "bottom .2s ease-in-out",
      width: "4px",
    },
    "& #notification": {
      background: "#ed4956",
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  submenu: {
    top: "40px !important",
    "& .MuiMenuItem-root": {
      width: "170px",
    },
    "& .MuiSvgIcon-root": {
      marginRight: ".7rem",
    },
    "& .MuiMenu-list": {
      padding: "0rem",
    },
    "& a": {
      color: "#262626",
      textDecoration: "none",
    },
  },
  submenuNotification: {
    top: "40px !important",
    "& .MuiTypography-h5": {
      fontSize: "14px",
      fontWeight: 600,
      marginRight: ".3rem",
    },
    "& li": {
      padding: "0rem",  
    },
    "& .MuiPaper-root": {
      width: "550px",
      boxSizing: "border-box",
    },
    "& .MuiMenuItem-root": {
      width: "100%",
    },
    "& .MuiSvgIcon-root": {
      marginRight: ".7rem",
    },
    "& .MuiMenu-list": {
      padding: "0rem",
    },
    "& a": {
      color: "#262626",
      textDecoration: "none",
    },
    "& .MuiAvatar-root": {
      marginRight: ".5rem",
    },
    "& hr": {
      marginLeft: "4.3rem",
      boxSizing: "border-box"
    }
  },
  relative: {
    display: "relative",
  },
  black: {
    color: "#262626 !important",
    "& svg": {
      color: "#262626",
    },
    "& .MuiButtonBase-root": {
      margin: "0rem .7rem",
    },
  },
}));