import React from 'react';
import Score from '../Score/Score';
import './ScoreBoard.css';

export default function ScoreBoard(props: IProps) {
  return (
    <div className="score-board-container mt-4 m-auto">
      <div className="score-board-inner-container w-full h-full text-mojo">
        <div className="text-xl text-mojo text-center" style={{ borderBottom: '2px solid #27292d' }}>
          Score Board
        </div>
        <div className="m-2">
          <Score score={props.score ? props.score : '__'} />
        </div>
      </div>
    </div>
  );
}


interface IProps {
  score?: number;
}

ScoreBoard.defaultProps = {
  score: '__',
};
