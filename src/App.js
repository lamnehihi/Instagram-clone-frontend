import React, { Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Auth from "features/Auth";
import JwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  SET_LOGOUT,
  SET_LOGIN,
} from "features/Auth/UserSlice";
import Axios from "axios";
import { FLETCH_SCREAMS } from "features/NewFeed/NewFeedSlice";
import { LOADING_NEW_FEED } from "features/Auth/UiSlice";
import LazyLoading from "components/LazyLoading";

import firebase from "firebase";
// Configure Firebase.
const config = {
  apiKey: "AIzaSyAfygoN_d6s6nq_3ITWL8gp6D-e1K5JJuA",
  authDomain: "socialape-fb7db.firebaseapp.com",
  // ...
};
firebase.initializeApp(config);
// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  signInSuccessUrl: "/signupwithgoogle",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

//Lazy loading - code splitting
const NewFeed = React.lazy(() => import("./features/NewFeed"));
const Scream = React.lazy(() => import("./features/Scream"));
const Profile = React.lazy(() => import("./features/Profile"));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
      backgroundBody: "#FAFAFA",
      dark: "#262626",
      contrastText: "#262626",
    },
    secondary: {
      main: "#1C1D22",
      backgroundBody: "#202020",
      light: "#B5B5B5",
      contrastText: "#B5B5B5",
    },
    hover: {
      main: "#262626",
    },
  },
});

function App() {
  const token = localStorage.getItem("FBIdToken");
  let decodedToken;
  const dispatch = useDispatch();

  if (token) {
    console.log("check token");
    console.log(token.split(" ")[1]);
    decodedToken = JwtDecode(token.split(" ")[1]);
    if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = "/login";
      dispatch(SET_LOGOUT());
    } else {
      Axios.defaults.headers.common["Authorization"] = token;
      dispatch(SET_LOGIN());
    }
  }

  useEffect(() => {
    dispatch(LOADING_NEW_FEED());
    dispatch(FLETCH_SCREAMS());
  }, []);
  const history = useHistory();

  //hadle auth firebase state change
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          //user logout, handle something here
          console.log("logout");
          return;
        }
        console.log("login with google", { ...user });
        //const handle = user.displayName;
        // Check handle of this Gmail.
        //.if it already have this handle -> set token and login.
        //.if not, -> update more data and create user for login.
        // try {
        //   Axios.defaults.baseURL =
        //     "https://asia-east2-socialape-fb7db.cloudfunctions.net/api";
        //   const res = await Axios.get(`user/${handle}`);
        //   console.log("visit user", res.data);
        //   const token = await user.getIdToken();

        //   setAuthorizationHeader(token);
        // } catch (error) {
        //   console.log("handle update more data");
        //   //history.push("/");
        // }
      });
    return () => unregisterAuthObserver();
  }, []);
  return (
    <div className="social-app">
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LazyLoading />}>
          <BrowserRouter>
            <div className="container">
              <Switch>
                <Route exact path="/" component={NewFeed}></Route>
                <Route exact path="/posts/:screamId" component={Scream}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route exact path="/signup" component={Auth}></Route>
                <Route exact path="/login" component={Auth}></Route>
                <Route exact path="/signupwithgoogle" component={Auth}></Route>
              </Switch>
            </div>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
