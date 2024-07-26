import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import LoginStatus from './Auth/LoginStatus';
import ImageSearch from './components/ImageSearch';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import AboutPage from './components/About';

const Routes = () => {
  return (
    <Router>
      <ResponsiveAppBar />
      <LoginStatus />
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={ImageSearch} />
      </Switch>
    </Router>
  );
};

export default Routes;
