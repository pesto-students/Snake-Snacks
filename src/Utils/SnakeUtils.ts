/* eslint-disable @typescript-eslint/no-unused-vars */
import { select } from 'd3';
import { useCallback, useRef } from 'react';

/**
 *
 * @param x start position from which points should be generated
 * @param y start position from which points should be generated
 * @param N Number of Points
 * @param L Length between points
 */
function createPoints(N: number, L: number, x: number = 40, y: number = 40) {
  const points: Array<ICoordinates> = [];

  let tmpY = y;

  for (let i = 0; i < N; i += 1) {
    points.push({ x, y: tmpY });
    tmpY += L;
  }

  return points;
}

// eslint-disable-next-line no-unused-vars
function satisfyLinkConstraint(points: Array<ICoordinates>, L: number) {
  // head is unchanged
  const newPoints = [points[0]];
  for (let i = 1; i < points.length; i += 1) {
    // satisfy distance constraint here
    const a = newPoints[i - 1];
    const b = points[i];
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.hypot(dx, dy);
    const vba = { x: dx / distance, y: dy / distance };
    const x = a.x - L * vba.x;
    const y = a.y - L * vba.y;
    newPoints.push({ x, y });
  }
  return newPoints;
}

export default function useDrawSnake(
  handleCurrentPosition: Function,
  N: number,
  L: number,
  handleSnakeHitItself: Function,
) {
  const points = useRef<Array<ICoordinates>>(createPoints(N, L));
  const numberOfPoints = useRef<number>(N);
  const headAngle = useRef(-Math.PI / 2);
  const delegation = useRef(2);
  const nodeRef = useRef();

  const checkSnakeHitItself = useCallback(() => {
    let snakeHitItself = false;
    // if duplicate x,y present in the points
    const [head, ...tail] = points.current;
    // eslint-disable-next-line max-len
    snakeHitItself = tail.some((point) => {
      const pointX = Math.round(point.x);
      const pointY = Math.round(point.y);
      const headX = Math.round(head.x);
      const headY = Math.round(head.y);
      const headInTheBoxX = pointX <= headX + 1 && pointX >= headX - 1;
      const headInTheBoxY = pointY <= headY + 1 && pointY >= headY - 1;

      return headInTheBoxX && headInTheBoxY;
    });
    if (snakeHitItself) {
      handleSnakeHitItself(true);
    }
  }, [handleSnakeHitItself]);

  const increaseSnakeLength = useCallback(() => {
    numberOfPoints.current += 1;
    const tmpPoints = createPoints(numberOfPoints.current, L);
    // eslint-disable-next-line no-unused-vars
    points.current.push(tmpPoints[tmpPoints.length - 1]);
  }, [L]);

  const increaseSnakeSpeed = useCallback(() => {
    delegation.current += 0.02;
  }, []);

  const drawSnake = useCallback((ref) => {
    nodeRef.current = ref;
    const node = select(ref);

    node.style('position', 'absolute');
    // TODO: take top as parameter
    node.style('top', '80vh');
    node.attr('id', 'snake');
    const updateSel = node
      .selectAll(':scope > div')
      .data(points.current) as any;
    const headWidth = 30;
    const tailWidth = 16;
    const noOfChunksForHead = 4;
    const width = (index: number) => {
      if (index < noOfChunksForHead) {
        const peakWidth = 30;
        const bigWidth = 35;
        const f = index / (noOfChunksForHead - 1);
        return peakWidth + f * (bigWidth - peakWidth);
      }
      const widthDiff = tailWidth - headWidth;
      const fraction = index / (numberOfPoints.current - 1);
      const additionalWidth = widthDiff * fraction;
      return headWidth + additionalWidth;
    };
    const sel = updateSel
      .enter()
      .append('div')
      .style('position', 'absolute')
      .style('background', 'green')
      .style('border-radius', '50%')
      .style('width', (d: ICoordinates, i: number) => `${width(i)}px`)
      .style('height', (d: ICoordinates, i: number) => `${width(i)}px`)
      .style(
        'box-shadow',
        '0px 2px 5px 0px rgba(0,0,0,0.14) , 0px 1px 10px 0px rgba(0,0,0,0.12) , 0px 2px 4px -1px rgba(0,0,0,0.2) ',
      )
      .style('z-index', '4')
      .merge(updateSel);
    sel
      .style('left', (d: ICoordinates, i: number) => `${d.x - width(i) / 2}px`)
      .style('top', (d: ICoordinates, i: number) => `${d.y - width(i) / 2}px`);

    // set id to head
    const head = node.select(':scope > div:first-child');
    head.attr('id', 'snake-head');

    const fp = points.current[0];
    sel.each((d: ICoordinates, i: number) => {
      if (i !== 2) return;
      const ang = Math.atan2(fp.y - d.y, fp.x - d.x) + Math.PI / 2;
      const nd = select('#snake > div:nth-child(2)');
      const w = 8;
      nd.style('z-index', 99);
      nd.html('');
      nd.style('transform', `rotateZ(${ang}rad)`);
      nd.style('box-shadow', 'none');

      nd.append('div')
        .style('position', 'absolute')
        .style('background', 'black')
        .style('border', '2px solid white')
        .style('border-radius', '50%')
        .style('left', '10%')
        .style('top', '20%')
        .style('width', `${w}px`)
        .style('height', `${w}px`);

      nd.append('div')
        .style('position', 'absolute')
        .style('background', 'black')
        .style('border', '2px solid white')
        .style('border-radius', '50%')
        .style('left', '60%')
        .style('top', '20%')
        .style('width', `${w}px`)
        .style('height', `${w}px`);
    });
  }, []);

  const setHeadAngle = useCallback((key) => {
    const hA = headAngle.current;
    if (key === 'ArrowLeft' && (hA === Math.PI / 2 || hA === -Math.PI / 2)) {
      headAngle.current = Math.PI;
    }
    if (key === 'ArrowRight' && (hA === Math.PI / 2 || hA === -Math.PI / 2)) {
      headAngle.current = 0;
    }
    if (key === 'ArrowUp' && (hA === 0 || hA === Math.PI)) {
      headAngle.current = -Math.PI / 2;
    }
    if (key === 'ArrowDown' && (hA === 0 || hA === Math.PI)) {
      headAngle.current = Math.PI / 2;
    }
  }, []);

  const updateHead = useCallback(
    (x, y) => {
      const [, ...tail] = points.current;
      points.current = [{ x, y }, ...tail];
      points.current = satisfyLinkConstraint(points.current, L);
      drawSnake(nodeRef.current);
      checkSnakeHitItself();
    },
    [L, drawSnake, checkSnakeHitItself],
  );

  const moveUp = useCallback(() => {
    // eslint-disable-next-line no-unused-vars
    const [head, ...tail] = points.current;
    const x = head.x + delegation.current * Math.cos(headAngle.current);
    const y = head.y + delegation.current * Math.sin(headAngle.current);
    updateHead(x, y);
    handleCurrentPosition();
  }, [updateHead, handleCurrentPosition]);

  return {
    drawSnake,
    moveUp,
    setHeadAngle,
    increaseSnakeLength,
    increaseSnakeSpeed,
  };
}

export interface ICoordinates {
  x: number;
  y: number;
}
