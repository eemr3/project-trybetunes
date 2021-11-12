import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: '',
      nameAlbum: '',
      isDisabled: true,
      albuns: [],
      isEmpty: false,
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handSearchClick = this.handSearchClick.bind(this);
  }

  handleChangeSearch({ target }) {
    const inputLength = 2;
    const { value } = target;
    this.setState(({
      isDisabled: value.length < inputLength,
      valueSearch: value,
    }));
  }

  getSearchAlbumAndArtist = async (nameArtist) => {
    const response = await searchAlbumsAPIs(nameArtist);
    const resultFilter = response
      .filter((album) => (album.artistName.includes(nameArtist)));
    this.setState(({
      albuns: resultFilter,
      isEmpty: resultFilter.length === 0,
      nameAlbum: nameArtist }));
  }

  handSearchClick(artist) {
    this.getSearchAlbumAndArtist(artist);
    this.setState(({ valueSearch: '' }));
  }

  render() {
    const { isDisabled, valueSearch, albuns, nameAlbum, isEmpty } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form
          onSubmit={ (event) => {
            event.preventDefault();
            this.handSearchClick(valueSearch);
          } }
        >
          <label htmlFor="search-input">
            <input
              id="search-input"
              type="text"
              data-testid="search-artist-input"
              name="valueSearch"
              value={ valueSearch }
              onChange={ this.handleChangeSearch }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
        <h2>
          Resultado de álbuns de:
          {' '}
          {nameAlbum}
        </h2>
        {isEmpty ? (<h3>Nenhum álbum foi encontrado</h3>)
          : albuns.map((album) => (
            <div
              key={ album.collectionId }
            >
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
                <span>{album.collectionName}</span>

              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default Search;
