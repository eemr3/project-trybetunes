import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Loading.css';

class Loading extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={ className }>
        <h2>Carregando...</h2>
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: '',
};

export default Loading;
