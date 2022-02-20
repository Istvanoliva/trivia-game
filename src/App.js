import './App.css';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './page/Login';
import Jogo from './page/Jogo';
import Settings from './page/Settings';
import Feedback from './page/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Jogo } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
