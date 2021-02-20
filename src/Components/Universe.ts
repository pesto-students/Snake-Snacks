import { IGet, ISet, ISize, IState, IUniverse } from './interfaces';

export default class Universe {
    size: ISize;

    tileMap: Array<Array<number>> = [];

    tileWidth = 64;

    tileHeight = 64;

    setPlayerPosition: ISet;

    getPlayerPosition: IGet;

    setOffset: ISet;

    getOffset: IGet;

    imageData: HTMLImageElement;

    maxRows = 0;

    maxCols = 0;

    ratio = 1;

    delete = false;

    constructor(args: IUniverse) {
        this.size = args.size;
        this.setOffset = args.setOffset;
        this.getOffset = args.getOffset;
        this.setPlayerPosition = args.setPlayerPos;
        this.getPlayerPosition = args.getPlayerPos;
        this.imageData = args.imageData;
        this.generateTiles();
        this.ratio = window.devicePixelRatio || 1;
    }

    generateTiles(): void {
        this.maxRows = Math.ceil(
            (this.size.width * this.ratio) / this.tileWidth
        );
        this.maxCols = Math.ceil(
            (this.size.height * this.ratio) / this.tileWidth
        );
        for (let r = 0; r < this.maxRows; r += 1) {
            const col = [];
            for (let c = 0; c < this.maxCols; c += 1) {
                if (c === 0 || r === 0) {
                    col.push(3);
                } else if (c === this.maxCols - 1 || r === this.maxRows - 1) {
                    col.push(3);
                } else {
                    col.push(1);
                }
            }
            this.tileMap.push(col);
        }
    }

    render(state: IState): void {
        let viewStartX = this.getPlayerPosition().x - window.innerWidth / 2;
        let viewStartY = this.getPlayerPosition().y - window.innerHeight / 2;

        if (viewStartX < 0) {
            viewStartX = 0;
        }

        if (viewStartY < 0) {
            viewStartY = 0;
        }

        if (viewStartX > this.size.width * this.ratio - window.innerWidth) {
            viewStartX = this.size.width * this.ratio - window.innerWidth;
        }

        if (viewStartY > this.size.height * this.ratio - window.innerHeight) {
            viewStartY = this.size.width * this.ratio - window.innerHeight;
        }

        let startCol = Math.floor(viewStartX / this.tileWidth);
        let startRow = Math.floor(viewStartY / this.tileHeight);
        let endCol =
            startCol +
            Math.ceil((window.innerWidth + viewStartX) / this.tileWidth);
        let endRow =
            startRow +
            Math.ceil((window.innerHeight + viewStartY) / this.tileHeight);

        if (startCol < 0) {
            startCol = 0;
        }

        if (startRow < 0) {
            startRow = 0;
        }

        if (endRow > this.maxRows) {
            endRow = this.maxRows;
        }

        if (endCol > this.maxCols) {
            endCol = this.maxCols;
        }

        const { context } = state;

        if (!context) {
            throw new Error('No Context Provided');
        }

        context.save();
        for (let r = startRow; r < endRow; r += 1) {
            const colTiles = this.tileMap[r];
            for (let c = startCol; c < endCol; c += 1) {
                const offsetX = c * 64 - viewStartX;
                const offsetY = r * 64 - viewStartY;
                const tile = colTiles[c];
                context.drawImage(
                    this.imageData as HTMLImageElement,
                    (tile - 1) * 64,
                    0,
                    64,
                    64,
                    Math.round(offsetX),
                    Math.round(offsetY),
                    64,
                    64
                );
            }
        }
        context.restore();

        this.setOffset({ x: viewStartX, y: viewStartY });
    }
}
