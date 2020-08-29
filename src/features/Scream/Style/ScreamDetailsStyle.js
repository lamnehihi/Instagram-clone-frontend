import { makeStyles } from "@material-ui/core";

export const ScreamDetailsStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "90%",
    marginBottom: "3rem",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "80%",
    },
    "& a": {
      color: "#262626",
      textDecoration: "none",
      lineHeight: 1.5,
    },
    "& a:active": {
      color: "#26262690",
    },
    "& ul": {
      listStyle: "none",
      padding: "0rem",
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "rgba(0, 0, 0,0)",
    },
    "& .MuiIconButton-root": {
      padding: "0rem .85rem 0rem .85rem",
    },
    "& .MuiCardActions-root": {
      padding: ".85rem .65rem .3rem .65rem",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "330px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }
  },
  content: {
    flex: "1 0 auto",
    height: "300px",
    overflowY: "scroll",
    [theme.breakpoints.down("sm")]: {
      height: "150px",
      maxHeight: "250px",
    }
  },
  cover: {
    width: "65%",
    "& .MuiCardMedia-root": {
      paddingTop: "100%",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "100%",
    },
  },
  noImage: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "0%",
    },
    "& span": {
      position: "absolute",
      top: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      backgroundColor: "#00000050",
      "& .MuiTypography-root": {
        width: "80%",
        maxHeight: "90%",
        fontSize: "28px",
        wordWrap: "break-word",
        color: "#fff",
        textShadow: "#000000 1px 1px 20px",
        textAlign: "center",
        overflow: "hidden !important",
        textOverflow: "ellipsis",
      },
      [theme.breakpoints.down("xs")]: {
        "& .MuiTypography-root": {
          fontSize: "18px",
          wordWrap: "break-word",
        },
      },
      [theme.breakpoints.down("sm")]: {
        "& .MuiTypography-root": {
          fontSize: "22px",
          wordWrap: "break-word",
        },
      },
    },
  },
  bold: {
    color: "#262626",
    fontWeight: "bold",
    marginRight: ".5rem",
  },
  boldIcon: {
    color: "#262626",
    fontWeight: "bold",
  },
  author: {
    marginBottom: "1rem",
    "& .MuiAvatar-root": {
      marginRight: "1rem",
    },
    "& span": {
      wordWrap: "break-word",
    },
    "& .author__body": {
      width: "80%",
    },
  },
  iconLeft: {
    marginLeft: "auto",
  },
  moveUp: {
    padding: "0rem 1.5rem .85rem 1.5rem",
  },
  grey: {
    color: "#8e8e8e",
  },
  time: {
    display: "block",
    fontSize: "10px",
    lineHeight: 1.8,
  },
  form: {
    height: "56px",
    padding: "0rem .5rem 0rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiInputBase-root": {
      height: "100%",
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
  },
}));