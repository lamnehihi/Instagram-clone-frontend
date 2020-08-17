import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from 'components/NavBar';
import NewFeed from 'features/NewFeed';
import Signup from 'features/Auth/pages/Signup';
import Login from 'features/Auth/pages/Login';

function App() {
  return (
    <div className="social-app">
      <Suspense fallback={<div>Loading...</div>}>

      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={NewFeed}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/login' component={Login}></Route>
          </Switch>
        </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
