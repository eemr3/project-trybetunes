import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';

class NavBar extends Component {
  render() {
    // const { active } = this.props;
    return (
      <nav className="nav-bar">
        <NavLink
          className="nav-link"
          exact
          activeClassName="active"
          data-testid="link-to-search"
          to="/search"
        >
          Pesquisa
        </NavLink>
        <NavLink
          className="nav-link"
          activeClassName="active"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Músicas Favoritas
        </NavLink>
        <NavLink
          className="nav-link"
          activeClassName="active"
          data-testid="link-to-profile"
          to="/profile"
        >
          Perfil
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
