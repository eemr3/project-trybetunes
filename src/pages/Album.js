import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async (id) => {
    const response = await getMusics(id);
    this.setState(({
      musics: response,
    }));
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {musics.map((music) => (
            <div key={ music.trackId }>
              <h3>{music.artistName}</h3>
              <ul>
                <li>
                  {music.trackName}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Album;
