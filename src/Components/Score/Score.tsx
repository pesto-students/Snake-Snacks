import React from 'react';


export default function Score(props: IProps) {
  return (
    <div className="text-xl flex items-center justify-between leading-normal">
      <span className="text-mojo">{props.text}: </span>
      <span className="text-mojo">{props.score}</span>
    </div>
  );
}


interface IProps {
  score: number | string;
  text?: string;
}

Score.defaultProps = {
  text: 'Your Score',
};
