import React from 'react';
import PropTypes from 'prop-types';
import styles from './Score.module.css';

export default function Score({ score }) {
  return (
    <div className={styles.score}>{score}</div>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
