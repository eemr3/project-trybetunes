import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Músicas Favoritas
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </nav>
    );
  }
}

export default NavBar;
