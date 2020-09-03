const { makeStyles } = require("@material-ui/core");

export const bioStyle = makeStyles((theme) => ({
  root: {
    fontSize: "1.2rem",
    paddingTop: "2rem",
    display: "flex",
    "& h2": {
      fontSize: "30px",
      fontWeight: "300",
      maxWidth: "60%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: "3rem"
    },
    "& p": {
      fontSize: "1.2rem",
      lineHeight: "1.8rem",
    },
    "& .MuiTypography-h1, a": {
      fontSize: "1.2rem",
      fontWeight: 600,
      lineHeight: "1.8rem",
    },
    "& button": {
      backgroundColor: "#fff",
    },
    "& a": {
      color: "rgba(0,55,107,1)",
      textDecoration: "none",
    },
    "& .avatar": {
      display: "flex",
      width: "300px",
      height: "200px",
      justifyContent: "center",
    },
    "& .MuiButton-root": {
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      "& .avatar": {
        display: "flex",
        width: "fit-content !important",
        height: "fit-content",
        justifyContent: "center",
        marginRight: "1rem",
      },
      "& h2": {
        width: "100%",
        position: 'absolute',
        left: "1%",
        top: '5%'
      },
      "& .MuiIconButton-root": {
        position: 'absolute',
        right: "0%",
        top: '-30.8%'
      },
      "& .header" : {
        height : "150px",
      },
      "& .bio" : {
        position: "absolute",
        height : "150px",
        left: "5.5%"
      },
      "& p, a": {
        fontSize: "14px",
        lineHeight: "1.5rem",
      },
      "& .MuiTypography-h1, a": {
        fontSize: "14px",
        fontWeight: 600,
      },
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
  post : {
    "& span": {
    fontSize: "1.2rem",
    fontWeight: "500",
    marginRight: ".5rem",
    lineHeight: "3rem"
    }
  },

  section: {
    marginBottom: "1rem",
  },
  editButton: {
    marginLeft: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0rem",
    },
  }
}));