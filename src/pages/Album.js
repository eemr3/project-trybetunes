import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      name: '',
      nameAlbum: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getMusics(id);
  }

  getMusics = async (id) => {
    const response = await getMusics(id);
    this.setState(({
      musics: response.filter((music, index) => index !== 0 && music),
      name: response[0].artistName,
      nameAlbum: response[0].collectionName,
    }));
  }

  render() {
    const { musics, name, nameAlbum } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ name }</h2>
          <p data-testid="album-name">{ nameAlbum }</p>
          {musics.map((music, index) => (
            <MusicCard
              key={ `${index}-${music.trackId}` }
              previewUrl={ music.previewUrl }
              musicName={ music.trackName }
            />
          ))}
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
