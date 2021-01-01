import React from 'react';

export default function NumberedStart(props: IProps) {

  return (
    <div className="text-8xl text-white absolute top-1/2 left-1/2">{props.currentNumber}</div>
  );
}

interface IProps {
  currentNumber: number;
}

