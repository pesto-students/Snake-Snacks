/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { SinglePlayerContext } from '../../../Pages/Game/Game';
import GameBoundaries from '../../../Utils/GameBoundaries';
import IsFoodAndSnakeMeet from '../../../Utils/IsFoodAndSnakeMeet';

export default function Snake({ reference }) {
  const {
    snake,
    movement,
    setSnake,
    foodPosition,
    setFoodPosition,
    score,
    setScore,
  } = useContext(SinglePlayerContext);
  const [headPosition, setHeadPosition] = useState({ ...snake[0] });
  const isHitBoundary = GameBoundaries(headPosition);
  const isFoodConsumed = IsFoodAndSnakeMeet(headPosition, foodPosition);

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
      setHeadPosition({ x: tmpSnake[0].x + movement.x, y: tmpSnake[0].y + movement.y });
      const ele = tmpSnake.pop();
      if (isFoodConsumed) {
        setFoodPosition({
          x: Math.floor(Math.random() * 1000) + 1,
          y: Math.floor(Math.random() * 800) + 1,
        });
        setScore(score + 10);
        tmpSnake.push(ele);
      }
      setSnake(tmpSnake);
      drawSnake();
    }, 100);
  };

  useEffect(() => {
    if (reference && !isHitBoundary) {
      moveSnake();
    }

    if (isHitBoundary) {
      clearInterval(timerId);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [reference, movement, isHitBoundary]);

  return (<div>Hello</div>);
}
