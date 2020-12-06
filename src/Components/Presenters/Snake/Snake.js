/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { SinglePlayerContext } from '../../../Pages/Game/Game';

export default function Snake({ reference }) {
  const {
    snake,
    movement,
    setSnake,
  } = useContext(SinglePlayerContext);

  let timerId;

  const clearSnake = (prevSnake) => {
    prevSnake.forEach((snakePart) => reference.clearRect(snakePart.x, snakePart.y, 20, 20));
  };

  const drawSnake = () => {
    reference.fillStyle = '#000000';
    snake.forEach((snakePart) => reference.fillRect(snakePart.x, snakePart.y, 20, 20));
  };

  const moveSnake = () => {
    drawSnake();

    if (timerId) {
      clearInterval(timerId);
    }

    timerId = setInterval(() => {
      clearSnake(snake);
      const tmpSnake = snake;

      tmpSnake.unshift({ x: tmpSnake[0].x + movement.x, y: tmpSnake[0].y + movement.y });
      tmpSnake.pop();
      setSnake(tmpSnake);
      drawSnake();
    }, 100);
  };

  useEffect(() => {
    if (reference) {
      moveSnake();
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [reference, movement]);

  return (<div>Hello</div>);
}
