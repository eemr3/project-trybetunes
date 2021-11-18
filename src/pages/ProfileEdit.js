import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header/Header';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading/Loading';

import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      isDisabled: true,
      isLoading: false,
      isDone: false,
    };
  }

  componentDidMount() {
    this.getDataUser();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.teste();
    });
  }

  getDataUser = async () => {
    this.setState({ isLoading: true }, async () => {
      const response = await getUser();
      this.setState({
        isLoading: false,
        name: response.name,
        image: response.image,
        description: response.description,
        email: response.email,
      }, () => {
        this.teste();
      });
    });
  }

  teste = () => {
    const { name, image, email, description } = this.state;
    if (name !== '' && email !== '' && description !== '' && image !== '') {
      this.setState({ isDisabled: false });
    }
  }

  setDataUpdateUser = async () => {
    const { name, image, email, description } = this.state;
    await updateUser({ name, image, email, description });
  }

  handleSubmit = () => {
    this.setDataUpdateUser();
    this.setState({ isDone: true });
  }

  render() {
    const {
      name,
      image,
      description,
      email,
      isDisabled,
      isLoading,
      isDone,
    } = this.state;
    return (
      <>
        <Header />
        {isLoading ? <Loading className="profile-edit__loading" />
          : (
            <div data-testid="page-profile-edit" className="container-profile-edit">
              <div className="profile-edit__content-image">
                <img src={ image } alt="avatar" className="profile-edit__image" />
                <Input
                  type="text"
                  inputName="image"
                  id="input-image"
                  dataTestid="edit-input-image"
                  handleChangeLogin={ this.handleChange }
                  value={ image }
                  placeholder="Insira um link"
                  className="profile-edit__input-image"
                />
              </div>
              <div className="profile-edit__data">
                <Input
                  type="text"
                  inputName="name"
                  id="input-user-name"
                  dataTestid="edit-input-name"
                  handleChangeLogin={ this.handleChange }
                  value={ name }
                  placeholder="Nome"
                  className="profile-edit__user-name"
                />
                <Input
                  type="email"
                  inputName="email"
                  id="input-email"
                  dataTestid="edit-input-email"
                  handleChangeLogin={ this.handleChange }
                  value={ email }
                  placeholder="E-mail"
                  className="profile-edit__email"
                />
                <textarea
                  data-testid="edit-input-description"
                  className="profile-edit__descripton"
                  id="description"
                  name="description"
                  rows="5"
                  cols="33"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <Button
                  button="button"
                  dataTestid="edit-button-save"
                  isDisabled={ isDisabled }
                  className="profile-edit__btn"
                  handleClick={ this.handleSubmit }
                >
                  Salvar
                </Button>
              </div>
            </div>)}
        {isDone && <Redirect to="/profile" />}
      </>
    );
  }
}

export default ProfileEdit;
