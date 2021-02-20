import { IGet, ISet, ISize, IState, IUniverse } from './interfaces';

export default class Universe {
    size: ISize;

    tileMap: Array<number> = [];

    tileWidth = 64;

    tileHeight = 64;

    setPlayerPosition: ISet;

    getPlayerPosition: IGet;

    setOffset: ISet;

    getOffset: IGet;

    imageData: HTMLImageElement;

    constructor(args: IUniverse) {
        this.size = args.size;
        this.setOffset = args.setOffset;
        this.getOffset = args.getOffset;
        this.setPlayerPosition = args.setPlayerPos;
        this.getPlayerPosition = args.getPlayerPos;
        this.imageData = args.imageData;
    }

    generateTiles(): void {
        const maxRows = Math.ceil(this.size.width / this.tileWidth);
        const maxCols = Math.ceil(this.size.height / this.tileWidth);
        for (let r = 0; r < maxRows; r += 1) {
            for (let c = 0; c < maxCols; c += 1) {
                this.tileMap.push(1);
            }
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

        const startCol = Math.ceil(viewStartX / this.tileWidth);
        const startRow = Math.ceil(viewStartY / this.tileHeight);
        const endCol =
            startCol +
            Math.ceil((window.innerWidth + viewStartX) / this.tileWidth);
        const endRow =
            startRow +
            Math.ceil((window.innerHeight + viewStartY) / this.tileHeight);

        const { context } = state;

        if (!context) {
            throw new Error('No Context Provided');
        }

        context.save();
        for (let c = startCol; c < endCol; c += 1) {
            for (let r = startRow; r < endRow; r += 1) {
                const offsetX = (c - startCol) * 64 - viewStartX;
                const offsetY = (r - startRow) * 64 - viewStartY;
                context.drawImage(
                    this.imageData as HTMLImageElement,
                    0,
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
