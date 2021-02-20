/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import generateRandoNumberBetweenNumber from '../Utils/random';
import { IPosition, IState } from './interfaces';
import Snake from './Snake';
import Universe from './Universe';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tile = require('./tiles.png');

type RenderType = JSX.Element | null;

export default class Game extends Component<{ name: string }, IState> {
    canvasRef: HTMLCanvasElement | null;

    playerPosition: IPosition;

    offSet: IPosition = {
        x: 0,
        y: 0,
    };

    snakes: Array<Snake> = [];

    universe: Array<Universe> = [];

    imageData: HTMLImageElement | undefined;

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
        };
        this.playerPosition = {
            x: generateRandoNumberBetweenNumber(2000, 0),
            y: generateRandoNumberBetweenNumber(2000, 0),
        };
    }

    componentDidMount(): void {
        const context = this.canvasRef?.getContext('2d');
        this.setState(
            (prevState): IState => {
                return {
                    ...prevState,
                    context: context as CanvasRenderingContext2D,
                };
            },
            () => {
                this.startGame();
            }
        );
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
    }

    renderSnake(): void {
        const context = this.canvasRef?.getContext('2d');
        if (context) {
            const snake = new Snake({
                length: 10,
                radius: 10,
                getPlayerPos: this.getPlayerPosition.bind(this),
                setPlayerPos: this.getPlayerPosition.bind(this),
                getOffset: this.getOffset.bind(this),
                setOffset: this.setOffset.bind(this),
            });
            this.snakes.push(snake);
            this.renderElement(this.snakes);
        }
    }

    renderUniverse(): void {
        const uni = new Universe({
            getPlayerPos: this.getPlayerPosition.bind(this),
            setPlayerPos: this.getPlayerPosition.bind(this),
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

    renderElement(elem: Array<Snake | Universe>): void {
        elem.forEach((ele: Snake | Universe) => {
            ele.render(this.state);
        });
    }

    render(): RenderType {
        const { name } = this.state;
        return (
            <div className="bg-lightCyan">
                <div className="absolute text-xl">{name}</div>
                <canvas
                    ref={(ele) => {
                        this.canvasRef = ele;
                    }}
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            </div>
        );
    }
}
