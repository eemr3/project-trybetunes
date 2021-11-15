import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const { musicName, previewUrl, trackId, onClick, value, isChecked } = this.props;
    return (
      <div className="container-music-card">
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
            type="checkbox"
            name={ trackId }
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ onClick }
            value={ value }
            name={ trackId }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  value: PropTypes.bool,
  onClick: PropTypes.func,
};

MusicCard.defaultProps = {
  musicName: '',
  previewUrl: '',
  trackId: '',
  value: false,
  onClick: () => {},
};
export default MusicCard;
