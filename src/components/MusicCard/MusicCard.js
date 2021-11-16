import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const {
      musicName,
      previewUrl,
      trackId,
      onClick,
      checked,
      value,
      onChange,
    } = this.props;
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
            name="check-music"
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ onClick }
            onChange={ onChange }
            value={ value }
            checked={ checked }
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
  onClick: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

MusicCard.defaultProps = {
  musicName: '',
  previewUrl: '',
  trackId: '',
  onClick: () => {},
  onChange: () => {},
  value: false,
};
export default MusicCard;
