import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from 'components/NavBar';
import NewFeed from 'features/NewFeed';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Auth from 'features/Auth';

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
  return (
    <div className="social-app">
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>

      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path='/' component={NewFeed}></Route>
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
