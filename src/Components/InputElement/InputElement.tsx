import React from 'react';
import './InputElement.css';

export default function InputElement(props: Props) {
  const { type, name, placeholder, handleOnChange } = props;
  return (
    <>
      <input
        type={type}
        name={name}
        className="input z-20"
        placeholder={placeholder}
        onChange={(event) => handleOnChange(event)}
      />
    </>
  );
}


interface Props {
  type: string;
  name: string;
  placeholder: string;
  handleOnChange: Function
}
