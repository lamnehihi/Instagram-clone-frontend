import { makeStyles } from "@material-ui/core";

const styleSignup = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    "& .MuiInputBase-input": {
      height: "15px",
    },
  },
  logo: {
    marginBottom: ".5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  box: {
    maxWidth: "350px",
    boxSizing: 'border-box',
    border: "1px solid #ddd",
    padding: "3rem 3rem 1rem 3rem",
    margin: "auto",
    "& a": {
      margin: "1.5rem",
    },
  },
  boxSignup: {
    maxWidth: "350px",
    boxSizing: 'border-box',
    border: "1px solid #ddd",
    padding: "1rem",
    margin: "auto",
    marginTop: "1.5rem",
    "& a": {
      margin: ".3rem",
    },
  },
  textField: {
    marginBottom: ".5rem",
    height: "55px",
  },
  button: {
    backgroundColor: "#C0DFFD",
    color: "#fff",
    fontWeight: "bold",
    position: "relative",
    marginBottom: "2rem",
  },
  loading: {
    color: "#000",
    position: "absolute",
    top: "100%",
  },
  error: {
    color: "#F44335",
    fontSize: "10.5px",
    position: "absolute",
    bottom: "100%",
  },
  divider: {
    width: "110px",
    margin: "0rem",
    color: "#8E8E8E",
    marginBottom: "1.5rem",
  },
  subdDivider: {
    color: "#8E8E8E",
    fontSize: "13px",
    marginBottom: "1.5rem",
  },
  bold: {
    fontWeight: "bold",
  },
  smaller: {
    fontSize: "12px",
    marginBottom: "0rem !important",
  },
  footer: {
    height: "80px",
    textAlign: "center",
    margin: 'auto',
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "#969696"
  }
}));

export default styleSignup
