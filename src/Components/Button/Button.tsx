import React from 'react';

export default function Button(props: Props) {
  return (
    <button
      disabled={props.isDisabled}
      onClick={(event) => props.handleClick(event)}
      className="bg-flaxShade p-2 pr-4 pl-4 m-2 md:p-2 cursor-pointer z-20 text-3xl md:text-xl rounded-lg text-mojo"
      type={props.type ? 'submit' : 'button'}
    >
      {props.text}
    </button>
  );
}

interface Props {
  text: string;
  type?: boolean;
  handleClick: Function;
  isDisabled?: boolean;
}

Button.defaultProps = {
  type: false,
  isDisabled: false,
};
