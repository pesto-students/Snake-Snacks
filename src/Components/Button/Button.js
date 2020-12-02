import React from 'react';
import PropTypes, { string } from 'prop-types';
import styles from './Button.module.css';

export default function Button({ title, classNames, type }) {
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={`${styles.btn} ${classNames.join(' ')}`}
    >
      {title}
    </button>
  );
}

Button.defaultProps = {
  type: false,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  classNames: PropTypes.arrayOf(string).isRequired,
  type: PropTypes.bool,
};
