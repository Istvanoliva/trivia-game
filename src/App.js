import './App.css';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './page/Login';
import Jogo from './page/Jogo';
import Settings from './page/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Jogo } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
