import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

import './Album.css';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      name: '',
      nameAlbum: '',
      imageAlbum: '',
      favorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getMusics(id);
  }

  // setFavorite = ({ target: { checked, type, id, name } }) => {
  //   const value = type === 'checkbox' && checked;
  //   // const { musics, idFavorite, musicsFavorite } = this.state;
  //   this.setState(({ favorite: value, }));
  // }

  setFavoriteInAddSong = async ({ target: { checked, id } }) => {
    const value = checked;
    this.setState(({ isLoading: true }));
    const { musics } = this.state;
    await addSong(musics.find((music) => music.trackId === Number(id)));
    this.setState(({
      isLoading: false,
      favorite: value,
    }));
  }

  getMusics = async (id) => {
    const response = await getMusics(id);
    this.setState(({
      musics: response.filter((music, index) => index !== 0 && music),
      name: response[0].artistName,
      nameAlbum: response[0].collectionName,
      imageAlbum: response[0].artworkUrl100,
    }));
  }

  render() {
    const {
      musics,
      name,
      isLoading,
      nameAlbum,
      imageAlbum,
      favorite,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="container-page-album">
          <div className="content-album-info">
            <img src={ imageAlbum } alt={ name } />
            <h2 data-testid="album-name">{ nameAlbum }</h2>
            <p data-testid="artist-name">{ name }</p>
          </div>
          <div>
            { isLoading && <Loading />}
            { musics.map((music, index) => (
              <MusicCard
                key={ `${index}-${music.trackId}` }
                previewUrl={ music.previewUrl }
                musicName={ music.trackName }
                trackId={ music.trackId }
                onClick={ this.setFavoriteInAddSong }
                id={ music.trackId }
                htmlFor={ music.trackId }
                value={ favorite }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
