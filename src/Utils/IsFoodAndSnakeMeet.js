import { useEffect, useState } from 'react';

export default function IsFoodAndSnakeMeet(position, targetPosition) {
  const [isHit, setIsHit] = useState(false);

  useEffect(() => {
    if ((position.x === targetPosition.x)) {
      setIsHit(true);
    } else {
      setIsHit(false);
    }
  }, [position, targetPosition]);

  return isHit;
}
