import React, { Component } from 'react';
import Food from '../../../Components/Food/Food';
import JoyStick from '../../../Components/JoyStick/JoyStick';
import PlayPause from '../../../Components/PlayPause/PlayPause';
import ScoreBoard from '../../../Components/ScoreBoard/ScoreBoard';
import Snake from '../../../Components/Snake/Snake';
import { Title } from '../../../Components/Title/Title';
import isPointsInBound from '../../../Utils/usePointsInBoundedRect';

function getNewPosition(x1: number, y1: number, x2: number, y2: number) {
  const x = Math.floor(Math.random() * (x2 - x1 + 1) + x1);
  const y = Math.floor(Math.random() * (y2 - y1 + 1) + y1);

  return { x, y };
}

interface IProps {}

interface ICoordinates {
  x: number;
  y: number;
}

interface IState {
  foodPosition: ICoordinates;
  snakeStatus: boolean;
  scoreDiff: number;
  score: number;
  gameOver: boolean;
}

export default class Board extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      foodPosition: {
        x: 100,
        y: 100,
      },
      snakeStatus: true,
      scoreDiff: 5,
      gameOver: false,
      score: 0,
    };
    this.handleSnakeHitFood = this.handleSnakeHitFood.bind(this);
    this.handleHitBoundary = this.handleHitBoundary.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleSnakeHitItself = this.handleSnakeHitItself.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handlePlay() {
    this.setState((prevState) => ({
      ...prevState,
      snakeStatus: true,
    }));
  }

  handlePause() {
    this.setState((prevState) => ({
      ...prevState,
      snakeStatus: false,
    }));
  }

  handleRestart() {
    this.setState((prevState) => ({
      ...prevState,
      gameOver: false,
    }));
  }

  handleScore(diff: number) {
    const boardRef = document.getElementById('board');
    if (boardRef) {
      const { x, y, width, height } = boardRef.getBoundingClientRect();
      const position = getNewPosition(
        x + 10,
        y + 10,
        width + x - 30,
        height + y - 30,
      );
      this.setState((prevState) => ({
        ...prevState,
        foodPosition: position,
        score: prevState.score + diff,
      }));
    }
  }

  handleSnakeHitFood(
    snakeX: number,
    snakeY: number,
    fn?: Function,
    cb2?: Function,
  ) {
    // snakeX and snakeY are current position of snake head
    if (snakeX && snakeY && this.state) {
      const { foodPosition } = this.state;
      const isSnakeAteFood = isPointsInBound(
        { x: snakeX, y: snakeY },
        {
          x1: foodPosition.x - 15,
          y1: foodPosition.y - 15,
          x2: foodPosition.x + 15,
          y2: foodPosition.y + 15,
        },
      );
      if (isSnakeAteFood) {
        this.handleScore(5);
        if (fn) {
          fn();
        }
        if (cb2) {
          cb2();
        }
      }
    }
  }

  handleSnakeHitItself(status: boolean) {
    this.setState((prevState) => ({
      ...prevState,
      snakeStatus: !status,
    }));
  }

  handleHitBoundary(snakeX: number, snakeY: number) {
    // snakeX and snakeY are current position of snake head
    const boardRef = document.getElementById('board');
    if (boardRef) {
      const { x, y, width, height } = boardRef?.getBoundingClientRect();
      const isSnakeHitBoundary = isPointsInBound(
        { x: snakeX, y: snakeY },
        { x1: x, y1: y, x2: x - 30 + width, y2: y - 30 + height },
      );
      if (!isSnakeHitBoundary) {
        this.setState((prevState) => ({
          ...prevState,
          snakeStatus: false,
        }));
      }
    }
  }

  render() {
    const { foodPosition, snakeStatus, score } = this.state;
    return (
      <div className="h-screen w-screen box-border c-linear-gradient rounded-xl c-box-shadow overflow-hidden">
        <div className="h-full  w-4/5 md:w-full md:h-4/5 sm:w-full sm:h-4/5 align-top inline-block">
          <div className="h-full w-full border-xl md:border-8 sm:border-8 border-black bg-springRain60 rounded-md box-border">
            <div className="c-reflector" />
            <div className="h-full w-full" id="board">
              <Snake
                handleSnakeHitFood={this.handleSnakeHitFood}
                handleHitBoundary={this.handleHitBoundary}
                handleSnakeHitItself={this.handleSnakeHitItself}
                startSnake={snakeStatus}
              />
              <Food x={foodPosition.x} y={foodPosition.y} />
            </div>
          </div>
        </div>
        <div className="h-full w-1/5 md:w-full md:h-1/5 sm:w-full sm:h-1/5 inline-block box-border bg-bermudaGray c-box-shadow overflow-hidden">
          <div className="h-full flex flex-col flex-wrap justify-between pb-8 pt-8 box-border">
            <div className="md:hidden">
              <Title />
            </div>
            <ScoreBoard score={score} />
            <div className="flex-grow" />
            <div className="relative justify-self-end z-10">
              <PlayPause 
                handlePause={this.handlePause} 
                handlePlay={this.handlePlay} 
                handleRestart={this.handleRestart}
              />
              <JoyStick />
            </div>
          </div>
        </div>
      </div>
    );
  }
}