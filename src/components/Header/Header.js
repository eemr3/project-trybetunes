import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import NavBar from '../NavBar/NavBar';
import Logo from '../../images/logo-header.png';
import UserAvatar from '../../images/default.png';

import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  componentDidMount() {
    this.handleGetUser();
  }

  async handleGetUser() {
    this.setState(({ isLoading: true }));
    const { name } = await getUser();
    this.setState(({ user: name, isLoading: false }));
  }

  render() {
    const { user, isLoading } = this.state;
    // const { active } = this.props;
    return (
      <header data-testid="header-component" className="header-container">
        {isLoading === true ? (<Loading className="header-container__loading" />)
          : (
            <>
              <div className="content-header">
                <Link to="/">
                  <img src={ Logo } alt="logo" className="content-header__img" />
                </Link>
                <div data-testid="header-user-name" className="header-user">
                  <img src={ UserAvatar } alt="Avatar user" />
                  {user}
                </div>
              </div>
              <NavBar />
            </>
          )}
      </header>
    );
  }
}

export default Header;
