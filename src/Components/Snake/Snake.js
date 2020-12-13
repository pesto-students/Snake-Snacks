/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable func-names */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3';
import SaveScore from '../../Utils/SaveScore';

function createPoints(N, L) {
  const x = 40;
  let y = 0;
  const points = [];
  for (let i = 0; i < N; i += 1) {
    points.push({ x, y });
    y += L;
  }
  return points;
}

const satisfyLinkConstraints = (points, L) => {
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
};

class Snake extends Component {
  componentDidMount() {
    this.N = 30;
    this.L = 5;
    this.del = 2;
    this.points = createPoints(this.N, this.L);
    this.draw();
    this.headAngle = -Math.PI / 2;
    this.timeIntervalId = setInterval(
      () => {
        const setIsHit = this.checkIsBoundaryHit();
        const snakeHitItself = this.checkIsSnakeHitItself();
        this.checkIfSnakeEatsFrog();
        if (setIsHit || snakeHitItself) {
          clearInterval(this.timeIntervalId);
        }
        this.moveUp();
      },
      10,
    );
    document.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowLeft' && (this.headAngle === Math.PI / 2 || this.headAngle === -Math.PI / 2)) {
        this.headAngle = Math.PI;
      }
      if (k === 'ArrowRight' && (this.headAngle === Math.PI / 2 || this.headAngle === -Math.PI / 2)) {
        this.headAngle = 0;
      }
      if (k === 'ArrowUp' && (this.headAngle === 0 || this.headAngle === Math.PI)) {
        this.headAngle = -Math.PI / 2;
      }
      if (k === 'ArrowDown' && (this.headAngle === 0 || this.headAngle === Math.PI)) {
        this.headAngle = Math.PI / 2;
      }
    });
  }

  checkIsBoundaryHit() {
    const width = document.getElementsByTagName('body')[0].clientWidth;
    const height = document.getElementsByTagName('body')[0].clientHeight;
    const headPosition = document.getElementById('snake');
    if (!headPosition) {
      return false;
    }
    const headTip = headPosition.getElementsByTagName('div')[0].getBoundingClientRect();

    let setIsHit = false;
    if (headTip.x < 0 || headTip.x >= width) {
      setIsHit = true;
    }
    if (headTip.y < 0 || headTip.y >= height) {
      setIsHit = true;
    }

    if (setIsHit && this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
    }

    return setIsHit;
  }

  checkIsSnakeHitItself() {
    let snakeHitItself = false;
    // if duplicate x,y present in the points
    const [head, ...tail] = this.points;
    // eslint-disable-next-line max-len
    snakeHitItself = tail.find((point) => {
      const pointX = Math.round(point.x);
      const pointY = Math.round(point.y);
      const headX = Math.round(head.x);
      const headY = Math.round(head.y);
      const headInTheBoxX = pointX <= (headX + 1) && pointX >= (headX - 1);
      const headInTheBoxY = pointY <= (headY + 1) && pointY >= (headY - 1);

      return headInTheBoxX && headInTheBoxY;
    });

    if (this.timeIntervalId && snakeHitItself) {
      clearInterval(this.timeIntervalId);
    }
    return snakeHitItself;
  }

  checkIfSnakeEatsFrog() {
    const headPosition = document.getElementById('snake');
    const headTip = headPosition.getElementsByTagName('div')[0].getBoundingClientRect();

    let snakeEatsFrog = false;

    const {
      foodPosition, setFoodPosition, score, handleScore,
    } = this.props;

    if (!foodPosition) {
      return;
    }

    const { x, y } = foodPosition;
    const headX = Math.round(headTip.x);
    const headY = Math.round(headTip.y);

    const isInHorizontalInline = (headX <= x + 15 && headX > (x - 25));
    const isInVerticalInline = (headY <= y + 15 && headY > (y - 25));

    if (isInHorizontalInline && isInVerticalInline) {
      snakeEatsFrog = true;
    }

    if (snakeEatsFrog) {
      const randomNumber = Math.floor(Math.random() * (600 - 100 + 1) + 100);
      setFoodPosition({ x: randomNumber, y: randomNumber });
      this.N += 1;
      this.del += 0.02;
      this.saveScoreToServer(score + 5);
      if (localStorage.getItem('access_token')) {
        handleScore(5);
      }
      this.increaseSnakeLength(headTip);
    }
  }

  saveScoreToServer(score) {
    if (this.scoreTimer) {
      clearTimeout(this.scoreTimer);
    }
    this.scoreTimer = setTimeout(() => {
      SaveScore()({ score, mode: 'single' }).then((res) => {
        console.log(res);
      });
    }, 100);
  }

  moveUp() {
    const [head, ...tail] = this.points;
    const x = head.x + this.del * Math.cos(this.headAngle);
    const y = head.y + this.del * Math.sin(this.headAngle);
    this.updateHead(x, y);
  }

  updateHead(x, y) {
    const [, ...tail] = this.points;
    this.points = [{ x, y }, ...tail];
    this.points = satisfyLinkConstraints(this.points, this.L);
    this.draw();
  }

  increaseSnakeLength(headTip) {
    const newPoints = createPoints(this.N, this.L);
    this.points.push(newPoints[0]);
    const node = select(this.node);
    // select immediate divs inside node
    const updateSel = node.selectAll(':scope > div').data(this.points);
    const headWidth = 30;
    const tailWidth = 16;
    const noOfChunksForHead = 4;
    const width = (index) => {
      if (index < noOfChunksForHead) {
        const peakWidth = 30;
        const bigWidth = 35;
        const f = index / (noOfChunksForHead - 1);
        return peakWidth + f * (bigWidth - peakWidth);
      }
      return tailWidth - index / (this.N);
    };
    const sel = updateSel.enter()
      .append('div')
      .style('position', 'absolute')
      .style('background', 'green')
      .style('border-radius', '50%')
      .style('width', (d, i) => `${width(i)}px`)
      .style('height', (d, i) => `${width(i)}px`)
      .style('box-shadow', '0px 2px 5px 0px rgba(0,0,0,0.14) , 0px 1px 10px 0px rgba(0,0,0,0.12) , 0px 2px 4px -1px rgba(0,0,0,0.2) ')
      .style('z-index', '4')
      .merge(updateSel);
    sel
      .style('left', (d, i) => `${d.x - width(i) / 2}px`)
      .style('top', (d, i) => `${d.y - width(i) / 2}px`);
  }

  draw() {
    const node = select(this.node);
    node.style('position', 'absolute');
    node.style('top', '80vh');
    node.style('left', '0px');
    node.attr('id', () => 'snake');
    // select immediate divs inside node
    const updateSel = node.selectAll(':scope > div').data(this.points);
    const headWidth = 30;
    const tailWidth = 16;
    const noOfChunksForHead = 4;
    const width = (index) => {
      if (index < noOfChunksForHead) {
        const peakWidth = 30;
        const bigWidth = 35;
        const f = index / (noOfChunksForHead - 1);
        return peakWidth + f * (bigWidth - peakWidth);
      }
      return headWidth + (tailWidth - headWidth) * (index / (this.N - 1));
    };
    const sel = updateSel.enter()
      .append('div')
      .style('position', 'absolute')
      .style('background', 'green')
      .style('border-radius', '50%')
      .style('width', (d, i) => `${width(i)}px`)
      .style('height', (d, i) => `${width(i)}px`)
      .style('box-shadow', '0px 2px 5px 0px rgba(0,0,0,0.14) , 0px 1px 10px 0px rgba(0,0,0,0.12) , 0px 2px 4px -1px rgba(0,0,0,0.2) ')
      .style('z-index', '4')
      .merge(updateSel);
    sel
      .style('left', (d, i) => `${d.x - width(i) / 2}px`)
      .style('top', (d, i) => `${d.y - width(i) / 2}px`);

    const fp = this.points[0];
    sel.each(function (d, i) {
      if (i !== 2) return;
      const ang = Math.atan2(fp.y - d.y, fp.x - d.x) + Math.PI / 2;
      const nd = select(this);
      const w = 4;
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
        .style('top', '15%')
        .style('width', `${w}px`)
        .style('height', `${w}px`);

      nd.append('div')
        .style('position', 'absolute')
        .style('background', 'black')
        .style('border', '2px solid white')
        .style('border-radius', '50%')
        .style('left', '60%')
        .style('top', '15%')
        .style('width', `${w}px`)
        .style('height', `${w}px`);
    });
  }

  render() {
    return (
      <div ref={(node) => this.node = node} />
    );
  }
}

// Snake.propTypes = {
//   foodPosition: PropTypes.object({
//     x: PropTypes.number.isRequired,
//     y: PropTypes.number.isRequired,
//   }).isRequired,
//   setFoodPosition: PropTypes.func.isRequired,
// };

export default Snake;
