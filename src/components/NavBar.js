import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav>
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
