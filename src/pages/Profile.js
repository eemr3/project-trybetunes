import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import { getUser } from '../services/userAPI';

import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      dataUser: {},
    };
  }

  componentDidMount() {
    this.getDataUser();
  }

  getDataUser = async () => {
    this.setState({ isLoading: true }, async () => {
      const response = await getUser();
      this.setState({ dataUser: response, isLoading: false });
    });
  }

  render() {
    const { dataUser: { name, image, email, description }, isLoading } = this.state;
    return (
      <>
        <Header />
        {isLoading ? <Loading className="profile__loading" />
          : (
            <div data-testid="page-profile" className="containe-page-profile">
              <div>
                <img src={ image } alt="alo" data-testid="profile-image" />
                <div className="page-profile__name">
                  <h3>Nome</h3>
                  <p>{name}</p>
                </div>
                <div className="page-profile__email">
                  <h3>E-mail</h3>
                  <p>{email}</p>
                </div>
                <div className="page-profile__description">
                  <h3>Descrição</h3>
                  <p>{description}</p>
                </div>
              </div>
              <div className="page-profile__btn">
                <Link
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </div>
            </div>)}
      </>
    );
  }
}

export default Profile;
