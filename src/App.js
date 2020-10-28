import React, { Component } from 'react';
import './App.css';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Messages from './pages/Messages/Messages';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import PasswordReset from './pages/passwordReset/passwordReset';
import UserInfo from './components/userInfo/userInfo';

import UserProvider from "./providers/UserProvider";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserProvider>
        <header className="App-header">
        </header>
        <div className="menu">
              <div className="tab"> <Link to="/">Home</Link> </div>
              <div className="tab"> <Link to="/messages">Messages</Link> </div>
              <div className="tab"> <Link to="/about">About</Link> </div>
              <div className="tab"> <Link to="/signIn">sign in</Link> </div>
              <div className="tab"> <Link to="/signUp">sign up</Link> </div>
              <div className="tab"> <Link to="/passwordReset">password reset</Link> </div>
              <div className="tab"> <Link to="/userInfo">user info</Link> </div>
        </div>
        <div className="App-intro">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/passwordReset">
              <PasswordReset />
            </Route>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/userInfo">
              <UserInfo />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        </UserProvider>
      </div>
    );
  }
}

export default App;
