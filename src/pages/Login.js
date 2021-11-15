import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Logo from '../images/logo.svg';

import './Login.css';

class Login extends Component {
  _isMonted = false;

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
    this.setUserNameInCreateUser();
  }

  setUserNameInCreateUser = async () => {
    const { name } = this.state;
    this.setState(({ isLoading: true }));
    const response = await createUser({ name });
    if (response === 'OK') {
      return this.setState(({
        responseApi: true, isLoading: false }));
    }
  }

  render() {
    const { name, isDisabled, responseApi, isLoading } = this.state;
    return (
      isLoading ? (<Loading className="loading-container-login" />)
        : (
          <div data-testid="page-login" className="login-container">
            <img src={ Logo } alt="Logo Trybe Tunes" />
            <form onSubmit={ this.handleClick } className="form-login">
              <Input
                type="text"
                inputName="name"
                id="user-name"
                dataTestid="login-name-input"
                handleChangeLogin={ this.handleChangeLogin }
                value={ name }
                placeholder="Nome"
                className="login-container__input"
              />
              <Button
                className="login-container__btn"
                button="button"
                dataTestid="login-submit-button"
                isDisabled={ isDisabled }
                handleClick={ this.handleClick }
              >
                Entrar
              </Button>
              {responseApi && <Redirect to="/search" />}
            </form>
          </div>
        )
    );
  }
}

export default Login;
