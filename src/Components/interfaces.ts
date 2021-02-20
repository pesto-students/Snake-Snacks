export interface ISnake {
    length: number;
    radius: number;
    getOffset: IGet;
    setOffset: ISet;
    getPlayerPos: IGet;
    setPlayerPos: ISet;
}

export interface IPosition {
    x: number;
    y: number;
}

export interface IState {
    context: CanvasRenderingContext2D | null;
    position: IPosition;
    name: string;
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

export interface ISet {
    (pos: IPosition): void;
}
