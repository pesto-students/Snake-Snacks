/* eslint-disable import/no-cycle */
import React, { useEffect, useRef, useState } from 'react';
import Frog from '../../Components/Presenters/Food/Frog/Frog';
import Snake from '../../Components/Presenters/Snake/Snake';
import KeyEvents from '../../Utils/KeyEvents';
import styles from './Game.module.css';

const defaultSnake = [
  { x: 200, y: 150 },
  { x: 190, y: 150 },
  { x: 180, y: 150 },
  { x: 170, y: 150 },
  { x: 160, y: 150 },
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 100, y: 150 },
  { x: 90, y: 150 },
  { x: 80, y: 150 },
  { x: 70, y: 150 },
  { x: 60, y: 150 },
  { x: 50, y: 150 },
  { x: 40, y: 150 },
  { x: 30, y: 150 },
  { x: 20, y: 150 },
];

export const SinglePlayerContext = React.createContext({});

export default function Game() {
  const [ctx, setCtx] = useState();
  const [snake, setSnake] = useState(defaultSnake);
  const [movement, setMovement] = useState({ x: 10, y: 0 });
  const [foodPosition, setFoodPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);
  const direction = KeyEvents();
  const canvasRef = useRef();

  const setHeight = () => {
    const height = document.getElementsByTagName('body')[0].clientHeight;
    if (canvasRef) {
      canvasRef.current.setAttribute('height', height);
    }
  };

  const setWidth = () => {
    const width = document.getElementsByTagName('body')[0].clientWidth;
    if (canvasRef) {
      canvasRef.current.setAttribute('width', width);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const clearCanvas = () => {
    ctx.fillStyle = '#9fd0b0';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = '#EED688';
    ctx.lineWidth = 15;
    ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    setHeight();
    setWidth();
    context.strokeStyle = '#EED688';
    context.lineWidth = 15;
    context.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCtx(context);
    if (direction) {
      if (direction === 'up') {
        setMovement({ ...movement, x: 0, y: -10 });
      } else if (direction === 'down') {
        setMovement({ ...movement, x: 0, y: 10 });
      } else if (direction === 'left') {
        setMovement({ ...movement, x: -10, y: 0 });
      } else if (direction === 'right') {
        setMovement({ ...movement, x: 10, y: 0 });
      }
    }
  }, [direction]);

  return (
    <SinglePlayerContext.Provider
      value={
          {
            snake,
            setSnake,
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
        <canvas id="gameSnake" ref={canvasRef} width="1000" height="800">
          <Snake
            reference={ctx}
          />
          <Frog ctx={ctx} />
        </canvas>
      </div>
    </SinglePlayerContext.Provider>
  );
}
