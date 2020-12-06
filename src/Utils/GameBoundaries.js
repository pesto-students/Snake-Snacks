/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react';

export default function GameBoundaries(position) {
  const [isHit, setIsHit] = useState(false);
  const width = document.getElementsByTagName('body')[0].clientWidth;
  const height = document.getElementsByTagName('body')[0].clientHeight;

  useEffect(() => {
    if (position.x <= 0 || position.x >= width) {
      setIsHit(true);
    }
    if (position.y <= 0 || position.y >= height) {
      setIsHit(true);
    }
  }, [position]);

  return isHit;
}
