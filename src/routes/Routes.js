import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/album/:id" component={ Album } />
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/favorites" component={ Favorites } />
      </Switch>
    );
  }
}

export default Routes;
