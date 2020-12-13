/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Frog from '../../Components/Presenters/Food/Frog/Frog';
import Score from '../../Components/Score/Score';
import Snake from '../../Components/Snake/Snake';
import styles from './Game.module.css';

export const SinglePlayerContext = React.createContext({});

export default function Game() {
  const [movement, setMovement] = useState({ x: 20, y: 0 });
  const [foodPosition, setFoodPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);

  const handleScore = (value) => {
    setScore(value + score);
  };

  return (
    <SinglePlayerContext.Provider
      value={
          {
            movement,
            setMovement,
            foodPosition,
            setFoodPosition,
            score,
            setScore,
          }
}
    >
      <div className={styles.game}>
        <Score score={score} />
        <Snake
          handleScore={handleScore}
          foodPosition={foodPosition}
          setFoodPosition={setFoodPosition}
        />
        <Frog />
      </div>
    </SinglePlayerContext.Provider>
  );
}
