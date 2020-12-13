import React from 'react';
import PropTypes from 'prop-types';

export default function Score({ score }) {
  return (
    <p>{score}</p>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
