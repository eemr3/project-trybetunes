import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
        {isLoading ? <Loading />
          : (
            <>
              <div data-testid="page-profile">

                <div>
                  <img src={ image } alt="alo" data-testid="profile-image" />
                  <h3>{name}</h3>
                  <p>{email}</p>
                  <p>{description}</p>
                </div>
              </div>
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            </>)}
      </>
    );
  }
}

export default Profile;
