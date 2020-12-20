/* eslint-disable react/prop-types */
import React from 'react';
import styles from './InputElement.module.css';

export default function InputElement({
  name,
  type,
  placeholder,
  handleOnChange,
}) {
  return (
    <>
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </>
  );
}
