/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from 'react';
import { select } from 'd3';
import { SinglePlayerContext } from '../../../../Pages/Game/Game';

export default function Frog() {
  const frogRef = useRef();
  const { movement, foodPosition } = useContext(SinglePlayerContext);

  const drawFood = () => {
    const node = select(frogRef.current);
    node.selectChildren().remove();
    node.style('position', 'absolute');
    node.style('top', `${foodPosition.x}px`);
    node.style('left', `${foodPosition.y}px`);
    node.attr('id', () => 'frogFood');
    node.append('div')
      .style('position', 'absolute')
      .style('width', '30px')
      .style('height', '40px')
      .style('background', '#E7E2E2')
      .style('z-index', '100')
      .style('box-shadow', '1px 1px 2px 1px #888888')
      .style('border-radius', '50% 50% 50% 50% / 60% 60% 40% 40%');
  };

  useEffect(() => {
    drawFood();
  }, [foodPosition, movement]);

  return (
    <div ref={frogRef} />
  );
}
