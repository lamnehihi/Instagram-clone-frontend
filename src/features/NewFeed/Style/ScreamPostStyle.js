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
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
      borderBottom: 'none'
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: 'none'
    },
    "& .MuiInput-underline:after": {
      borderBottom: 'none'
    },
    "& .MuiInput-underline:before": {
      borderBottom: 'none'
    }
  },
  body: {
    width: "100%",
    height: "100%",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));