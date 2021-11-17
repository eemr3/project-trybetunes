import React, { Component } from 'react';
import Header from '../components/Header/Header';
import MusicCard from '../components/MusicCard/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import './Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: [],
    };
  }

  componentDidMount() {
    this.listFavoriteSongs();
  }

  listFavoriteSongs = async () => {
    const response = await getFavoriteSongs();
    this.setState({ favoriteMusic: response });
  }

  render() {
    const { favoriteMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="container-favorite">
          <h2>Músicas favoritas:</h2>
          {favoriteMusic.map((favMusic, index) => (
            <MusicCard
              key={ `${index}-${favMusic.trackId}` }
              previewUrl={ favMusic.previewUrl }
              musicName={ favMusic.trackName }
              trackId={ favMusic.trackId }
              artWorkUrl={ favMusic.artworkUrl60 }
              music={ favMusic }
              changeChecked={ this.listFavoriteSongs }
              className="favorite__content-music-card"
              classNameCnt="favorite__container-music-card"
            />

          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
