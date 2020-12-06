/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from 'react';
import { SinglePlayerContext } from '../../../../Pages/Game/Game';
import frog from './frog.png';

export default function Frog({ ctx }) {
  const frogRef = useRef();
  const { movement, foodPosition } = useContext(SinglePlayerContext);

  const drawFood = () => {
    if (ctx) {
      ctx.drawImage(frogRef.current, foodPosition.x, foodPosition.y);
    }
  };

  useEffect(() => {
    drawFood();
  }, [ctx, foodPosition, movement]);

  return (
    <img src={frog} ref={frogRef} alt="normal food" />
  );
}
