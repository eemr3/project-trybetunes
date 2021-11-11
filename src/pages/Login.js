import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../images/logo.svg';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      name: '',
      responseApi: false,
      isLoading: false,
    };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeLogin({ target }) {
    const lengthInputName = 3;
    const { value } = target;
    this.setState(({
      name: value,
      isDisabled: value.length < lengthInputName,
    }));
  }

  handleClick(event) {
    event.preventDefault();
    this.redirectSearch();
  }

  redirectSearch = async () => {
    const { name } = this.state;
    this.setState(({ isLoading: true }));
    const response = await createUser({ name });
    if (response === 'OK') {
      return this.setState(({
        responseApi: true, isLoading: false }));
    }
  }

  render() {
    const { userName, isDisabled, responseApi, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <img src={ Logo } alt="Logo Trybe Tunes" />
        <form onSubmit={ this.handleClick }>
          <label htmlFor="user-name">
            Nome
            <input
              type="text"
              name="name"
              id="user-name"
              data-testid="login-name-input"
              onChange={ this.handleChangeLogin }
              value={ userName }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Enrar
            </button>
          </label>
          {isLoading && <Loading />}
          {responseApi && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

// Login.propTypes = {
//   history: PropTypes.objectOf(),
// };

// Login.defaultProps = {
//   history: null,
// };
export default Login;
