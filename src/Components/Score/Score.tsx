import React from 'react';


export default function Score(props: { score: number }) {
  return (
    <div className="text-4xl md:text-xl text-center leading-normal">
      <span className="text-black">Your Score: </span>
      <span className="text-black">{props.score}</span>
    </div>
  );
}
