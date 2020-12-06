import React from 'react';
import useDebounce from '../../../Utils/Debounce';
import './SnackBar.css';

export default function SnackBar({ className, message }) {
  const { isTimeout } = useDebounce(2000);

  if (!isTimeout) {
    return (
      <div className={`snackbar ${className}`}>
        {message}
      </div>
    );
  }
}
