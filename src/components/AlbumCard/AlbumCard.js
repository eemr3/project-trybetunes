import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';

import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { albuns, dataTestid } = this.props;
    return (
      <div className="container-card-album">
        {albuns.map((album) => (
          <div
            className="content-card-album"
            key={ album.collectionId }
          >
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `${dataTestid}${album.collectionId}` }
            >
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
              <p>{album.collectionName}</p>

            </Link>
          </div>
        ))}
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albuns: PropTypes.arrayOf(shape({
    collectionId: PropTypes.number,
    artworkUrl: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
  })).isRequired,
  dataTestid: PropTypes.string,
};

AlbumCard.defaultProps = {
  dataTestid: '',
};
export default AlbumCard;
