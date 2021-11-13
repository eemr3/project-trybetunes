import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      dataTestid,
      inputName,
      value,
      handleChangeLogin,
      placeholder,
      type,
      id,
      className,
    } = this.props;

    return (
      <input
        type={ type }
        name={ inputName }
        id={ id }
        data-testid={ dataTestid }
        onChange={ handleChangeLogin }
        value={ value }
        placeholder={ placeholder }
        className={ className }
      />

    );
  }
}

Input.propTypes = {
  inputName: PropTypes.string,
  dataTestid: PropTypes.string,
  handleChangeLogin: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  inputName: '',
  dataTestid: '',
  handleChangeLogin: () => {},
  value: '',
  placeholder: '',
  id: '',
  className: '',
};
export default Input;
