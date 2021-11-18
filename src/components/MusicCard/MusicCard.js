import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

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
        artWorkUrl,
        className,
        classNameCnt,
      } = this.props;
      const { isLoading, isChecked } = this.state;
      return (
        <div className={ classNameCnt }>
          {isLoading ? <Loading />
            : (
              <div className={ className }>
                <img src={ artWorkUrl } alt={ musicName } />
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
              </div>
            )}
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
  className: PropTypes.string,
  classNameCnt: PropTypes.string,
  artWorkUrl: PropTypes.string,
};

MusicCard.defaultProps = {
  musicName: '',
  previewUrl: '',
  trackId: '',
  className: '',
  classNameCnt: '',
  artWorkUrl: '',
  changeChecked: () => {},
};
export default MusicCard;
