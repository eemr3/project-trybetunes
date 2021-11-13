import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      dataTestid,
      children,
      className,
      isDisabled,
      handleClick,
      button } = this.props;
    return (
      <button
        type={ button ? 'button' : 'submit' }
        data-testid={ dataTestid }
        disabled={ isDisabled }
        onClick={ handleClick }
        className={ className }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  dataTestid: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleClick: PropTypes.func,
  button: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  dataTestid: '',
  isDisabled: false,
  handleClick: () => {},
  button: '',
  className: '',
};
export default Button;
