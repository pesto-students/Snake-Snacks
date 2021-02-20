import { IEgg, IGet, IPosition, IState } from './interfaces';

export default class Egg {
    getPlayerPosition: IGet;

    getOffset: IGet;

    position: IPosition;

    radius = 10;

    delete = false;

    constructor(args: IEgg) {
        this.getPlayerPosition = args.getPlayerPos;
        this.getOffset = args.getOffset;
        this.position = args.position;
    }

    render(state: IState): void {
        const { context } = state;
        if (!context) {
            return;
        }

        const { x, y } = this.position;

        context.save();
        context.translate(x - this.getOffset().x, y - this.getOffset().y);
        context.beginPath();
        context.strokeStyle = '#000';
        context.fillStyle = '#fff';
        context.bezierCurveTo(0, 0, 10, 20, 20, 0);
        context.bezierCurveTo(20, 0, 10, -30, 0, 0);
        context.fill();
        context.stroke();
        context.closePath();
        context.restore();
    }
}
