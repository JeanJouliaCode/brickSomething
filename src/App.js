import React, { Component } from 'react';
import './App.css';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Messages from './pages/Messages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="menu">
              <div className="tab"> <Link to="/">Home</Link> </div>
              <div className="tab"> <Link to="/messages">Messages</Link> </div>
              <div className="tab"> <Link to="/about">About</Link> </div>
        </div>
        <div className="App-intro">
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route path="/messages" component={Messages} />
            <Route path="/about" component={About} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
