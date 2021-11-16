import React, { Component } from 'react';
import Header from '../components/Header/Header';
import MusicCard from '../components/MusicCard/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
        {favoriteMusic.map((favMusic, index) => (
          <MusicCard
            key={ `${index}-${favMusic.trackId}` }
            previewUrl={ favMusic.previewUrl }
            musicName={ favMusic.trackName }
            trackId={ favMusic.trackId }
            music={ favMusic }
            changeChecked={ this.listFavoriteSongs }
          />

        ))}
      </div>
    );
  }
}

export default Favorites;
