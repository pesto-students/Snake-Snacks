function calculateAreaOfTriangle(
  x1: number,
  x2: number,
  x3: number,
  y1: number,
  y2: number,
  y3: number,
) {
  return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
}

export default function isPointsInBound(
  point: ICoordinates,
  boundingPoint: IBoundingPoints,
) {
  let isInBound = true;
  if (point && point.x && point.y) {
    if (!Number.isSafeInteger(boundingPoint.x3) 
      || !Number.isSafeInteger(boundingPoint.x4)) {
      const { x, y } = point;
      const { x1, x2, y1, y2 } = boundingPoint;
      const inXRange = x >= x1 && x <= x2;
      const inYRange = y >= y1 && y <= y2;
      if (inXRange && inYRange) {
        isInBound = true;
      } else {
        isInBound = false;
      }
    } else {
      // A point P is inside a rectangle ABCD
      // if area ABC + area CDA = area ABP + area BCP + area CDP + area DAP
      const { x1, x2, x3, x4, y1, y2, y3, y4  } = boundingPoint;
      const ABC = calculateAreaOfTriangle(x1, x2, 
        x3 as number, y1, y2, y3 as number);
      const BCD = calculateAreaOfTriangle(x2, x3 as number, 
        x4 as number, y2, y3 as number, y4 as number);

      const ABP = calculateAreaOfTriangle(x1, x2, point.x, y1, y2, point.y);
      const BCP = calculateAreaOfTriangle(x2, x3 as number, 
        point.x, y2, y3 as number, point.y);
      const CDP = calculateAreaOfTriangle(x3 as number, x4 as number, 
        point.x, y3 as number, y4 as number, point.y);
      const DAP = calculateAreaOfTriangle(x4 as number, x1, 
        point.x, y4 as number, y1, point.y);
    
      if ((ABC + BCD) === (ABP + BCP + CDP + DAP)) {
        isInBound = true;
      } else {
        isInBound = false;
      }
    }

  }

  return isInBound;
}

interface ICoordinates {
  x: number;
  y: number;
}

interface IBoundingPoints {
  x1: number;
  x2: number;
  x3?: number;
  x4?: number;
  y1: number;
  y2: number;
  y3?: number;
  y4?: number;
}
