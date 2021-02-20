/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISnake {
    length: number;
    radius: number;
    inertia: number;
    name: string;
    getOffset: IGet;
    setOffset: ISet;
    getPlayerPos: IGet;
    setPlayerPos: ISet;
    getKey: IGetKey;
    finishGame: IFinishGame;
}

export interface IFinishGame {
    (snake: any): void;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IState {
    context: CanvasRenderingContext2D | null;
    position: IPosition;
    name: string;
    scores: Array<IScores>;
    gameOver: boolean;
    overAt: number;
    userName: string;
}

export interface ISize {
    width: number;
    height: number;
}

export interface IUniverse {
    size: ISize;
    imageData: HTMLImageElement;
    getOffset: IGet;
    setOffset: ISet;
    getPlayerPos: IGet;
    setPlayerPos: ISet;
}

export interface IGet {
    (): IPosition;
}

export interface IGetKey {
    (): IKey;
}

export interface ISet {
    (pos: IPosition): void;
}

export interface IKey {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
}

export interface IEgg {
    getOffset: IGet;
    setOffset: ISet;
    getPlayerPos: IGet;
    setPlayerPos: ISet;
    getKey: IGetKey;
    position: IPosition;
}

export interface IScores {
    name: string;
    score: number;
}
