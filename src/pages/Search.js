import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

import './Search.css';
import AlbumCard from '../components/AlbumCard/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: '',
      nameAlbum: '',
      isDisabled: true,
      albuns: [],
      notFound: false,
      isLoading: false,
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
    this.setState(({ isLoading: true }));
    const response = await searchAlbumsAPIs(nameArtist);
    const resultFilter = response
      .filter((album) => (album.artistName.includes(nameArtist)));
    this.setState(({
      albuns: resultFilter,
      notFound: resultFilter.length === 0,
      nameAlbum: nameArtist,
      isLoading: false,
    }));
  }

  handSearchClick(artist) {
    this.getSearchAlbumAndArtist(artist);
    this.setState(({ valueSearch: '' }));
  }

  render() {
    const {
      isDisabled,
      valueSearch,
      albuns,
      nameAlbum,
      notFound,
      isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form
          className="form-search"
          onSubmit={ (event) => {
            event.preventDefault();
            this.handSearchClick(valueSearch);
          } }
        >
          <Input
            id="search-input"
            type="text"
            dataTestid="search-artist-input"
            inputName="valueSearch"
            value={ valueSearch }
            handleChangeLogin={ this.handleChangeSearch }
            className="search-container__input"
            placeholder="Nome do artista"
          />
          <Button
            type="submit"
            dataTestid="search-artist-button"
            isDisabled={ isDisabled }
            className="sarch-container__btn"
          >
            Procurar
          </Button>
        </form>
        <div className="page-search-content-album">
          <h2>
            Resultado de álbuns de:
            {' '}
            {nameAlbum}
          </h2>
          {isLoading && <Loading className="search-container__loading" />}
          {notFound ? (<h3 className="not-found-album">Nenhum álbum foi encontrado</h3>)
            : (
              <AlbumCard
                albuns={ albuns }
                dataTestid="link-to-album-"
              />)}
        </div>
      </div>
    );
  }
}

export default Search;
