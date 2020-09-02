import { makeStyles } from "@material-ui/core";

export const ScreamPostStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "2rem",
    "& button": {
      borderRadius: "25px",
      textTransform: "none",
    },
    "& .MuiCardHeader-root": {
      height: "10px",
      position: "relative",
      "& span": {
        fontSize: "14px",
        fontWeight: 600,
      },
      "& .MuiButtonBase-root": {
        position: "absolute",
        top: 0,
        right: 0,
      },
    },
    "& .MuiCardActions-root": {
      display: "flex",
      justifyContent: "space-between",
      "& button": {
        backgroundColor: "#fff",
        color: "#000",
        height: "36px !important",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      },
    },
  },
  form: {
    marginLeft: ".5rem",
    width: "100%",
    minHeight: "60px",
    "& #image": {
      display: "none !important",
      width: "0px",
    },
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
  body: {
    width: "100%",
    height: "100%",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  imageName: {
    width: "100%",
    textAlign: "end",
  }
}));
