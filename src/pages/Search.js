import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      valueSearch: '',
      isDisabled: true,
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSearch({ target }) {
    const inputLength = 2;
    const { value } = target;
    this.setState(({
      isDisabled: value.length < inputLength,
      valueSearch: value,
    }));
  }

  render() {
    const { isDisabled, valueSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
