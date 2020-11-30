import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ name, className }) {
  return (
    <div className={className.join(' ')}>
      {name}
    </div>
  );
}

Title.defaultProps = {
  className: ['title-4', 'white'],
};

Title.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.arrayOf(PropTypes.string),
};
