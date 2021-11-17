import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

import './MusicCard.css';
import Loading from '../Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getStorageMusicFavoriteSongs();
  }

    setFavoriteInAddSong = async ({ target: { checked } }) => {
      // Contribuição do Bruno Teixeira (Brunão T16-A)
      const { music, changeChecked } = this.props;
      this.setState({ isLoading: true }, async () => {
        if (checked) {
          await addSong(music);
          this.setState(({
            isChecked: true,
            isLoading: false,
          }));
        } else {
          await removeSong(music);
          await changeChecked();
          this.setState({ isChecked: false, isLoading: false });
        }
      });
    }

    getStorageMusicFavoriteSongs = async () => {
      const { trackId } = this.props;
      const response = await getFavoriteSongs();
      this.setState(({ isChecked: response.some((music) => music.trackId === trackId) }));
    };

    render() {
      const {
        musicName,
        previewUrl,
        trackId,
      } = this.props;
      const { isLoading, isChecked } = this.state;
      return (
        <div className="container-music-card">
          {isLoading ? <Loading />
            : (
              <>
                <span>{ musicName }</span>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ trackId }>
                  <input
                    name="check-music"
                    type="checkbox"
                    id={ trackId }
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.setFavoriteInAddSong }
                    checked={ isChecked }
                  />
                  Favorita
                </label>
              </>)}
        </div>
      );
    }
}

MusicCard.propTypes = {
  musicName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  music: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
  changeChecked: PropTypes.func,
};

MusicCard.defaultProps = {
  musicName: '',
  previewUrl: '',
  trackId: '',
  changeChecked: () => {},
};
export default MusicCard;
