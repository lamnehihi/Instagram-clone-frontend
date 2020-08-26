const { makeStyles } = require("@material-ui/core");

export const tableTabStyle = makeStyles((theme) => ({
  root: {
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& h3": {
      fontSize: "28px",
      lineHeight: "32px",
      fontWeight: 300,
      marginTop: "2rem",
    },
    "& p": {
      width: "80%",
      textAlign: "center",
    },
    "& button": {
      backgroundColor: "#0096F6",
      color: "#fff",
    },
    "& button:hover": {
      backgroundColor: "#0096F6",
      color: "#fff",
    },
    "& h3, p, button": {
      marginBottom: "1rem",
    },
  },
}));

export const defaultTableTabProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};