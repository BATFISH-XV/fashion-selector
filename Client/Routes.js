import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import LoginStatus from './Auth/LoginStatus';
import StyleImageSearchPage from './components/StyleImageSearchPage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import MyAccount from './Pages/MyAccount';
import ForYouFeed from './Pages/ForYouFeed';
import ArtPromptTester from './art-components/ArtPrompTester';


const Routes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <ResponsiveAppBar />
      <div className="main-content">
        <LoginStatus />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/search" render={(props) => <StyleImageSearchPage {...props} userId={user?.id} />} />
          <Route path="/about" component={About} />
          <Route path="/myAccount" component={MyAccount} />
          <Route path="/feed" component={ForYouFeed} />
          <Route path="/art-tester" render={(props) => <ArtPromptTester {...props} userId={user?.id} />} />

        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
