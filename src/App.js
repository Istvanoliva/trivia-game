import './App.css';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Login from './page/Login';
import Jogo from './page/Jogo';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Jogo } />
      </Switch>
    );
  }
}

export default App;
