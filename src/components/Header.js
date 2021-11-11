import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './NavBar';

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
    return (
      isLoading === true ? (<Loading />)
        : (
          <div>
            <header data-testid="header-component">
              <NavBar />
              <div data-testid="header-user-name">
                <span>{user}</span>
              </div>
            </header>
          </div>
        )
    );
  }
}

export default Header;
