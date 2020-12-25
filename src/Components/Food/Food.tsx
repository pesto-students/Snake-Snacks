import { select } from 'd3';
import React, { useEffect, useRef } from 'react';

export default function Food(foodPosition: IFoodPosition) {
  const frogRef = useRef<HTMLDivElement | null>();
  
  
  useEffect(() => {
    const drawFood = () => {
      const node = select(frogRef.current as any);
      node.selectChildren().remove();
      node.style('position', 'absolute');
      node.style('top', `${foodPosition.y}px`);
      node.style('left', `${foodPosition.x}px`);
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
    drawFood();
  }, [foodPosition]);

  return (
    <div ref={(node) => { frogRef.current = node; }} />
  );
}


interface IFoodPosition {
  x: number;
  y: number;
}
