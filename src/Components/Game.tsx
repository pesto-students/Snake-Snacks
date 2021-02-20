/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import generateRandoNumberBetweenNumber from '../Utils/random';
import Egg from './Egg';
import GameOVer from './GameOver';
import { IKey, IPosition, IState } from './interfaces';
import ScoresBoard from './ScoresBoard';
import Snake from './Snake';
import Universe from './Universe';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tile = require('./tiles.png');

type RenderType = JSX.Element | null;

type ElementType = Snake | Egg;

export default class Game extends Component<{ name: string }, IState> {
    canvasRef: HTMLCanvasElement | null;

    playerPosition: IPosition;

    ctx: CanvasRenderingContext2D | null | undefined;

    offSet: IPosition = {
        x: 0,
        y: 0,
    };

    snakes: Array<Snake> = [];

    universe: Array<Universe> = [];

    eggs: Array<Egg> = [];

    imageData: HTMLImageElement | undefined;

    key: IKey = {
        left: false,
        down: false,
        right: false,
        up: false,
    };

    handleKeysUp: any;

    handleKeysDown: any;

    ratio: number;

    animationFrame: any;

    constructor(props: { name: string }) {
        super(props);
        this.canvasRef = null;
        this.state = {
            name: props.name,
            context: null,
            position: {
                x: 0,
                y: 0,
            },
            scores: [],
            gameOver: false,
            overAt: 0,
            userName: 'Kiran',
        };
        this.playerPosition = {
            x: generateRandoNumberBetweenNumber(1600, 100),
            y: generateRandoNumberBetweenNumber(1600, 100),
        };
        this.ratio = window.devicePixelRatio || 1;
    }

    componentDidMount(): void {
        this.ctx = this.canvasRef?.getContext('2d');
        this.handleKeysUp = this.handleKeys.bind(this, false);
        window.addEventListener('keyup', this.handleKeysUp);
        this.handleKeysDown = this.handleKeys.bind(this, true);
        window.addEventListener('keydown', this.handleKeysDown);
        this.setState(
            (prevState): IState => {
                return {
                    ...prevState,
                    context: this.ctx as CanvasRenderingContext2D,
                };
            },
            () => {
                this.startGame();
            }
        );
    }

    componentWillUnmount(): void {
        window.removeEventListener('keyup', this.handleKeysUp);
        window.removeEventListener('keydown', this.handleKeysDown);
        window.cancelAnimationFrame(this.animationFrame);
    }

    getPlayerPosition(): IPosition {
        return this.playerPosition;
    }

    setPlayerPosition(pos: IPosition): void {
        this.playerPosition = pos;
    }

    getOffset(): IPosition {
        return this.offSet;
    }

    setOffset(pos: IPosition): void {
        this.offSet = pos;
    }

    getKey(): IKey {
        return this.key;
    }

    finishGame(snake: Snake): void {
        this.setState((prevState: IState) => {
            return {
                ...prevState,
                gameOver: true,
                overAt: snake.score,
                userName: snake.name,
            };
        });
    }

    // eslint-disable-next-line class-methods-use-this
    checkCollision(item1: ElementType, item2: ElementType): boolean {
        const vx = item1.position.x - item2.position.x;
        const vy = item1.position.y - item2.position.y;

        const length = Math.sqrt(vx * vx + vy * vy);
        if (length < item1.radius + item2.radius) {
            return true;
        }

        return false;
    }

    checkCollisionWith(
        items1: Array<ElementType>,
        items2: Array<ElementType>
    ): void {
        let a = items1.length - 1;
        for (a; a > -1; a -= 1) {
            let b = items2.length - 1;
            for (b; b > -1; b -= 1) {
                const item1 = items1[a];
                const item2 = items2[b];
                if (this.checkCollision(item1, item2)) {
                    item2.delete = true;
                    (item1 as Snake).addScore(2);
                }
            }
        }
    }

    checkSnakeCollisionWithBoundary(): void {
        this.snakes.forEach((snake: Snake) => {
            if (snake.position.x < 30 || snake.position.y < 30) {
                snake.destroy();
            } else if (snake.position.x > 2000 || snake.position.y > 2000) {
                snake.destroy();
            }
        });
    }

    recalculateScores(): void {
        const scores = this.snakes.map((snake: Snake) => {
            return {
                name: snake.name,
                score: snake.score,
            };
        });

        this.setState((prevState: IState) => {
            return {
                ...prevState,
                scores,
            };
        });
    }

    handleKeys(status: boolean, e: any): void {
        if (e.key === 'ArrowLeft' || e.key === 'A') this.key.left = status;
        if (e.key === 'ArrowRight' || e.key === 'D') this.key.right = status;
        if (e.key === 'ArrowUp' || e.key === 'W') this.key.up = status;
        if (e.key === 'ArrowDown' || e.key === 'S') this.key.down = status;
    }

    generateImageData(): Promise<unknown> {
        const img = new Image();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = new Promise((resolve: any, reject: any) => {
            img.onload = () => {
                this.imageData = img;
                resolve(img);
            };

            img.onerror = () => {
                reject(new Error('Could not load image'));
            };
        });

        img.src = tile.default;
        return d;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async startGame() {
        await this.generateImageData();
        this.renderUniverse();
        this.renderSnake();
        this.renderEgg();
        this.update();
    }

    update(): void {
        if (!this.ctx) {
            return;
        }
        this.ctx.save();
        this.ctx.scale(this.ratio, this.ratio);
        this.ctx.fillStyle = '#9fd0b0';
        this.ctx.fillRect(0, 0, 2000, 2000);
        this.ctx.globalAlpha = 1;
        this.checkCollisionWith(this.snakes, this.eggs);
        this.checkSnakeCollisionWithBoundary();
        this.recalculateScores();
        this.addMoreEggs();
        this.renderElement(this.universe);
        this.eggs = this.renderElement(this.eggs) as Array<Egg>;
        this.snakes = this.renderElement(this.snakes) as Array<Snake>;
        this.ctx.restore();
        // Next frame
        this.animationFrame = requestAnimationFrame(() => {
            this.update();
        });
    }

    addMoreEggs(): void {
        if (this.eggs.length < 50) {
            this.renderEgg();
        }
    }

    renderEgg(): void {
        const totalEggs = generateRandoNumberBetweenNumber(100, 0);
        for (let i = 0; i < totalEggs; i += 1) {
            const egg = new Egg({
                getPlayerPos: this.getPlayerPosition.bind(this),
                setPlayerPos: this.setPlayerPosition.bind(this),
                getOffset: this.getOffset.bind(this),
                setOffset: this.setOffset.bind(this),
                getKey: this.getKey.bind(this),
                position: {
                    x: generateRandoNumberBetweenNumber(1950, 80),
                    y: generateRandoNumberBetweenNumber(1950, 80),
                },
            });
            this.eggs.push(egg);
        }
    }

    renderSnake(): void {
        const context = this.canvasRef?.getContext('2d');
        if (context) {
            const snake = new Snake({
                length: 10,
                radius: 10,
                getPlayerPos: this.getPlayerPosition.bind(this),
                setPlayerPos: this.setPlayerPosition.bind(this),
                getOffset: this.getOffset.bind(this),
                setOffset: this.setOffset.bind(this),
                inertia: 0.99,
                getKey: this.getKey.bind(this),
                name: 'Kiran',
                finishGame: this.finishGame.bind(this),
            });
            this.snakes.push(snake);
            this.snakes = this.renderElement(this.snakes) as Array<Snake>;
        }
    }

    renderUniverse(): void {
        const uni = new Universe({
            getPlayerPos: this.getPlayerPosition.bind(this),
            setPlayerPos: this.setPlayerPosition.bind(this),
            getOffset: this.getOffset.bind(this),
            setOffset: this.setOffset.bind(this),
            size: {
                height: 2000,
                width: 2000,
            },
            imageData: this.imageData as HTMLImageElement,
        });
        this.universe.push(uni);
        const context = this.canvasRef?.getContext('2d');
        if (context) {
            this.renderElement(this.universe);
        }
    }

    renderElement(
        elem: Array<Snake | Universe | Egg>
    ): Array<Snake | Universe | Egg> {
        const elems = elem.filter((ele: Snake | Universe | Egg) => {
            if (ele.delete) {
                return false;
            }
            return true;
        });

        elems.forEach((ele: Snake | Universe | Egg) => {
            ele.render(this.state);
        });

        return elems;
    }

    render(): RenderType {
        const { name, scores, gameOver, userName, overAt } = this.state;
        return (
            <div className="bg-lightCyan h-screen w-screen overflow-hidden">
                <div className="absolute text-xl">{name}</div>
                <ScoresBoard scores={scores} />
                <GameOVer
                    isGameOver={gameOver}
                    name={userName}
                    score={overAt}
                />
                <canvas
                    ref={(ele) => {
                        this.canvasRef = ele;
                    }}
                    width={window.innerWidth * this.ratio}
                    height={window.innerHeight * this.ratio}
                />
            </div>
        );
    }
}
