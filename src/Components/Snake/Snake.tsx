/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import useDrawSnake from '../../Utils/SnakeUtils';

export default function Snake(props: PropTypes) {
  const { startSnake, handleSnakeHitItself } = props;
  // hold the current container node
  const snakeNode = useRef<HTMLDivElement | null>();
  const timeRef = useRef<number>();
  const snakeAnimation = useRef<number>();
  const currentPosition = useRef<{
    x: number;
    y: number;
  }>();

  const handleCurrentPosition = () => {
    const position = document
      .getElementById('snake-head')
      ?.getBoundingClientRect();
    // what happens if position is undefined
    if (position) {
      //   console.log(position);
      const { x, y } = position;
      currentPosition.current = { x, y };
    }
  };

  const {
    drawSnake,
    moveUp,
    setHeadAngle,
    increaseSnakeLength,
    increaseSnakeSpeed,
  } = useDrawSnake(handleCurrentPosition, 30, 5, handleSnakeHitItself);

  const assignNode = (node: HTMLDivElement | null) => {
    snakeNode.current = node;
    drawSnake(snakeNode.current);
  };

  const runSnake = (timeStamp: number) => {
    if (timeRef.current) {
      moveUp();
      timeRef.current = timeStamp;
    }
    timeRef.current = timeStamp;
    props.handleSnakeHitFood(
      currentPosition.current?.x,
      currentPosition.current?.y,
      increaseSnakeLength,
      increaseSnakeSpeed,
    );
    props.handleHitBoundary(
      currentPosition.current?.x,
      currentPosition.current?.y,
    );
    if (startSnake) {
      snakeAnimation.current = requestAnimationFrame(runSnake);
    } else {
      cancelAnimationFrame(snakeAnimation.current as number);
    }
  };

  useEffect(() => {
    if (startSnake) {
      snakeAnimation.current = requestAnimationFrame(runSnake);
    } else {
      cancelAnimationFrame(snakeAnimation.current as number);
    }

    const changeDirection = (event: { key: string }) => {
      setHeadAngle(event.key);
    };

    // use this to attach event listener
    document.addEventListener('keydown', changeDirection);

    return () => {
      document.removeEventListener('keydown', changeDirection);
    };
  }, [startSnake]);

  return (
    <div
      data-testid="snake"
      ref={(node) => assignNode(node as HTMLDivElement)}
    />
  );
}

interface PropTypes {
  handleSnakeHitFood: Function;
  handleHitBoundary: Function;
  handleSnakeHitItself: Function;
  startSnake: boolean;
}
