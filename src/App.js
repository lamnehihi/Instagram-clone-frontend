import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import NewFeed from 'features/NewFeed';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Auth from 'features/Auth';
import JwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOGOUT, SET_LOGIN, SET_AUTHENTICATED_LOGIN } from 'features/Auth/UserSlice';
import Axios from 'axios';
import Profile from 'features/Profile';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      backgroundBody: '#FAFAFA',
      dark: '#262626',
      contrastText: '#262626',
    },
    secondary: {
      main: '#1C1D22',
      backgroundBody: '#202020',
      light: '#B5B5B5',
      contrastText: '#B5B5B5',
    },
    hover: {
      main: '#262626',
      
    },
  },
})



function App() {
  const token = localStorage.getItem("FBIdToken");
  let decodedToken;
  const dispatch = useDispatch();
  
  if (token) {
    console.log("check token");
    console.log(token.split(' ')[1]);
    decodedToken = JwtDecode(token.split(' ')[1]);
    if (decodedToken.exp *1000 < Date.now()) {
      window.location.href = "/login";
      dispatch(SET_LOGOUT());
    } else {
      Axios.defaults.headers.common['Authorization'] = token;
      dispatch(SET_LOGIN());
    }
  }
  return (
    <div className="social-app">
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>

      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path='/' component={NewFeed}></Route>
            <Route path='/profile' component={Profile}></Route>
            <Route path='/signup' component={Auth}></Route>
            <Route path='/login' component={Auth}></Route>
          </Switch>
        </div>
        </BrowserRouter>
      </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
