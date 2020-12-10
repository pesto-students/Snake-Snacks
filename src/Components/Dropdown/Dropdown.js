import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.func,
};

Dropdown.defaultProps = {
  children: () => 'Hello',
};
