import React from 'react';
import PropTypes, { string } from 'prop-types';
import styles from './Button.module.css';

export default function Button({
  title, isDisabled, classNames, type, handleClick,
}) {
  return (
    <button
      type={type ? 'submit' : 'button'}
      disabled={isDisabled}
      onClick={handleClick}
      className={`${styles.btn} ${classNames.join(' ')}`}
    >
      {title}
    </button>
  );
}

Button.defaultProps = {
  type: false,
  isDisabled: false,
  handleClick: () => '',
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  classNames: PropTypes.arrayOf(string).isRequired,
  type: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClick: PropTypes.func,
};
