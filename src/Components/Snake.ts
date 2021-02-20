import { IGet, IPosition, ISet, ISnake, IState } from './interfaces';

export default class Snake {
    length: number;

    radius: number;

    points: Array<IPosition> = [];

    setPlayerPosition: ISet;

    getPlayerPosition: IGet;

    setOffset: ISet;

    getOffset: IGet;

    constructor(snake: ISnake) {
        this.length = snake.length;
        this.radius = snake.radius;
        this.setPlayerPosition = snake.setPlayerPos;
        this.getPlayerPosition = snake.getPlayerPos;
        this.setOffset = snake.setOffset;
        this.getOffset = snake.getOffset;
        this.generatePoints();
    }

    generatePoints(): void {
        const { x, y } = this.getPlayerPosition();
        let tmpY = y;
        const len = this.radius;
        for (let i = 0; i < this.length; i += 1) {
            this.points.push({ x, y: tmpY + len });
            tmpY += this.radius / 2;
        }
    }

    generateLinkConstraint(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [newHead, ...remaining] = this.points;
        const newPoints = [newHead];
        const len = this.radius;
        for (let i = 1; i < this.points.length; i += 1) {
            // satisfy distance constraint here
            const a = newPoints[i - 1];
            const b = this.points[i];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);
            const vba = { x: dx / distance || 0, y: dy / distance || 0 };
            const x = a.x - len * vba.x;
            const y = a.y - len * vba.y;
            newPoints.push({ x, y });
        }
        this.points = newPoints;
    }

    renderSnakeHead(context: CanvasRenderingContext2D): void {
        const head = this.points[0];
        context.save();
        context.beginPath();
        context.arc(
            head.x - this.getOffset().x,
            head.y - this.getOffset().y,
            this.radius * 1.25,
            0,
            Math.PI * 2,
            true
        );
        context.fillStyle = '#CD384B';
        context.fill();
        context.closePath();
        context.restore();

        const anticlockwise = true;
        context.beginPath();
        context.arc(
            head.x - this.getOffset().x - (this.radius * 1.25) / 2,
            head.y - this.getOffset().y,
            3,
            0,
            Math.PI * 2,
            anticlockwise
        );
        context.fillStyle = '#000000';
        context.fill();
        context.strokeStyle = '#ffffff';
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(
            head.x - this.getOffset().x + (this.radius * 1.25) / 2,
            head.y - this.getOffset().y,
            3,
            0,
            Math.PI * 2,
            anticlockwise
        );
        context.fillStyle = '#000000';
        context.fill();
        context.strokeStyle = '#ffffff';
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
    }

    renderSnakeBody(context: CanvasRenderingContext2D): void {
        let radiusGrad = this.radius;
        const minRadius = 5;
        const diff = (this.radius - minRadius) / this.length;
        this.points.forEach((point: IPosition) => {
            context.save();
            context.beginPath();
            context.arc(
                point.x - this.getOffset().x,
                point.y - this.getOffset().y,
                radiusGrad,
                0,
                Math.PI * 2,
                true
            );
            context.fillStyle = '#CD384B';
            context.fill();
            context.lineWidth = 0.2;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 2;
            context.shadowBlur = 5;
            context.shadowColor = 'rgba(0,0,0,0.14)';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 1;
            context.shadowBlur = 10;
            context.shadowColor = 'rgba(0,0,0,0.12)';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 2;
            context.shadowBlur = 4;
            context.shadowColor = 'rgba(0,0,0,0.2)';
            context.stroke();
            context.closePath();
            context.restore();
            radiusGrad -= diff;
        });
    }

    render(state: IState): void {
        const { context } = state;
        if (!context) {
            return;
        }
        this.generateLinkConstraint();
        this.renderSnakeBody(context);
        this.renderSnakeHead(context);
    }
}
