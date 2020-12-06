import { useEffect, useState } from 'react';

export default function KeyEvents() {
  const [direction, setDirection] = useState('right');

  const isGoingHorizontal = () => (direction === 'left' || direction === 'right');

  const isGoingVertical = () => (direction === 'up' || direction === 'down');

  useEffect(() => {
    function handleKeyPress(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

      if (event.keyCode === LEFT_KEY && !isGoingHorizontal()) {
        setDirection('left');
      }

      if (event.keyCode === RIGHT_KEY && !isGoingHorizontal()) {
        setDirection('right');
      }

      if (event.keyCode === UP_KEY && !isGoingVertical()) {
        setDirection('up');
      }

      if (event.keyCode === DOWN_KEY && !isGoingVertical()) {
        setDirection('down');
      }
    }
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return direction;
}
