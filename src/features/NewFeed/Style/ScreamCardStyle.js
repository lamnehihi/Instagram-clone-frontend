import { makeStyles } from "@material-ui/core";

export const ScreamCardStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    marginBottom: "1.5rem",
    paddingBottom: ".3rem",
    "& a": {
      textDecoration: "none",
      lineHeight: 1.5,
    },
    "& span": {
      lineHeight: 1.5,
    },
    "& a:active": {
      color: "#26262690"
    },
    "& .MuiCardContent-root" : {
      padding: "1rem",
      paddingBottom: ".5rem",
    }
  },
  media: {
    height: 100,
    paddingTop: "56.25%",
  },
  iconLeft: {
    marginLeft: "auto",
  },
  bold: {
    color: "#262626",
    fontWeight: "bold",
  },
  text: {
    paddingLeft: ".5rem",
    wordWrap: "break-word",
  },
  moveUp: {
    marginTop: "-2rem",
  },
  grey: {
    color: "#8e8e8e",
  },
  time: {
    display: "block",
    fontSize: "10px",
    lineHeight: 1.8,
  },
  noImage: {
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
}));