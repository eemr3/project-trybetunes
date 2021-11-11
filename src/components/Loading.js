import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div
        style={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' } }
      >
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
