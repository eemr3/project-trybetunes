import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      isLoading: false,
      musicsFavorite: [],
      valueCheck: false,

      favorite: {},
      // checked: false,

    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getMusics(id);
    this.getStorageMusicFavoriteSongs();
  }

  componentDidUpdate() {
    const { musicsFavorite, musics } = this.state;
    this.checkedFavorite(musicsFavorite, musics);
  }

  handleFilterFavorite = async ({ target }) => {
    const { musics } = this.state;
    this.setState(({
      favorite: await musics
        .find((music) => music.trackId === Number(target.id)
        && target.checked === true),

    }));

    this.setFavoriteInAddSong();
  }

  setFavoriteInAddSong = async () => {
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(({ isLoading: true }));
    const { favorite } = this.state;
    await addSong(favorite);
    this.setState(({
      isLoading: false,
      // valueCheck: value,
    }));
  }

  getStorageMusicFavoriteSongs = async () => {
    const response = await getFavoriteSongs();
    this.setState(({
      musicsFavorite: response }));
  };

  getMusics = async (id) => {
    const response = await getMusics(id);
    this.setState(({
      musics: response.filter((music, index) => index !== 0 && music),
      name: response[0].artistName,
      nameAlbum: response[0].collectionName,
      imageAlbum: response[0].artworkUrl100,
    }));
  }

  checkedFavorite = (arr, valueMucis) => {
    const result = arr
      .some((favMusic) => favMusic.trackId === valueMucis.trackId);
    return result;
  }

  render() {
    const {
      musics,
      name,
      isLoading,
      nameAlbum,
      imageAlbum,
      musicsFavorite,
      valueCheck,
      // favorite,
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
            { musics.map((music, index) => {
              const checkedI = this.checkedFavorite(musicsFavorite, music);
              // musicsFavorite
              //   .some((favMusic) => favMusic.trackId === music.trackId);

              return (
                <MusicCard
                  key={ `${index}-${music.trackId}` }
                  previewUrl={ music.previewUrl }
                  musicName={ music.trackName }
                  trackId={ music.trackId }
                  // onChange={ (e) => e.target.value }
                  onClick={ this.handleFilterFavorite }
                  id={ music.trackId }
                  htmlFor={ music.trackId }
                  checked={ checkedI }
                  value={ valueCheck }
                />
              );
            })}
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
