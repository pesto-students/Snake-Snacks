import {
    IFinishGame,
    IGet,
    IGetKey,
    IPosition,
    ISet,
    ISnake,
    IState,
} from './interfaces';

export default class Snake {
    length: number;

    name: string;

    radius: number;

    points: Array<IPosition> = [];

    inertia: number;

    rotation = 0;

    speed = 0.25;

    velocity = {
        x: 0,
        y: 0,
    };

    position: IPosition;

    score = 0;

    delete = false;

    setPlayerPosition: ISet;

    getPlayerPosition: IGet;

    setOffset: ISet;

    getOffset: IGet;

    getKey: IGetKey;

    finishGame: IFinishGame;

    constructor(snake: ISnake) {
        this.length = snake.length;
        this.radius = snake.radius;
        this.inertia = snake.inertia;
        this.name = snake.name;
        this.setPlayerPosition = snake.setPlayerPos;
        this.getPlayerPosition = snake.getPlayerPos;
        this.setOffset = snake.setOffset;
        this.getOffset = snake.getOffset;
        this.generatePoints();
        this.getKey = snake.getKey;
        this.position = this.getPlayerPosition();
        this.finishGame = snake.finishGame;
    }

    generatePoints(): void {
        const { x, y } = this.getPlayerPosition();
        let tmpY = y;
        const len = this.radius;
        for (let i = 0; i < this.length; i += 1) {
            this.points.push({ x, y: tmpY + len });
            tmpY += this.radius;
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
        context.translate(
            head.x - this.getOffset().x,
            head.y - this.getOffset().y
        );
        context.rotate((this.rotation * Math.PI) / 180);
        context.arc(0, 0, this.radius * 1.25, 0, Math.PI * 2, true);
        context.fillStyle = '#CD384B';
        context.fill();
        context.closePath();

        const anticlockwise = true;
        context.beginPath();
        context.arc(
            0 - (this.radius * 1.25) / 2,
            0,
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
            0 + (this.radius * 1.25) / 2,
            0,
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
        context.restore();
    }

    renderSnakeBody(context: CanvasRenderingContext2D): void {
        let radiusGrad = this.radius;
        const minRadius = 5;
        const diff = (this.radius - minRadius) / this.length;
        this.points.forEach((point: IPosition) => {
            context.save();
            context.translate(
                point.x - this.getOffset().x,
                point.y - this.getOffset().y
            );
            context.beginPath();
            context.arc(0, 0, radiusGrad, 0, Math.PI * 2, true);
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

    accelerate(): void {
        if (Math.abs(this.velocity.x) < 4) {
            this.velocity.x -= this.speed;
        }
        if (Math.abs(this.velocity.y) < 4) {
            this.velocity.y -= this.speed;
        }
    }

    rotateSnake(direction: string): void {
        if (direction === 'left') {
            this.rotation -= 6;
        }
        if (direction === 'right') {
            this.rotation += 6;
        }
    }

    addScore(s: number): void {
        this.score += s;

        if (this.score % 10 === 0) {
            const last = this.points[this.length - 1];
            this.length += 1;
            this.points.push(last);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    destroy(): void {
        this.delete = true;
        this.finishGame(this);
    }

    render(state: IState): void {
        const { context } = state;
        if (!context) {
            return;
        }

        const key = this.getKey();

        if (key.up) {
            this.accelerate();
        }

        if (key.left) {
            this.rotateSnake('left');
        }

        if (key.right) {
            this.rotateSnake('right');
        }

        // Move
        const { x, y } = this.velocity;
        this.setPlayerPosition({
            x:
                this.getPlayerPosition().x +
                this.velocity.x * Math.sin(-(this.rotation * Math.PI) / 180),
            y:
                this.getPlayerPosition().y +
                this.velocity.y * Math.cos(-(this.rotation * Math.PI) / 180),
        });
        this.velocity.x = x * this.inertia;
        this.velocity.y = y * this.inertia;

        this.position = this.getPlayerPosition();

        const newHead = this.points[0];
        newHead.x = this.getPlayerPosition().x;
        newHead.y = this.getPlayerPosition().y;

        const [head, ...remaining] = this.points;
        this.points = [newHead, ...remaining];

        this.generateLinkConstraint();
        this.renderSnakeBody(context);
        this.renderSnakeHead(context);
    }
}
