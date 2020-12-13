/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from 'react';
import { SinglePlayerContext } from '../../../../Pages/Game/Game';
import frog from './frog.png';

export default function Frog() {
  const frogRef = useRef();
  const { movement, foodPosition } = useContext(SinglePlayerContext);

  const drawFood = () => {
    frogRef.current.style.position = 'absolute';
    frogRef.current.style.top = `${foodPosition.y}px`;
    frogRef.current.style.left = `${foodPosition.x}px`;
  };

  useEffect(() => {
    drawFood();
  }, [foodPosition, movement]);

  return (
    <img src={frog} width="20" height="20" ref={frogRef} alt="normal food" />
  );
}
