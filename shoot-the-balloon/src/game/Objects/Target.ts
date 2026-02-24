import Bullet from './Bullet';
import { DARK_THEME } from './consts';
import RenderableObject from './renderable-object';
import { distance } from './utils';

class Target extends RenderableObject {

	x: number;
	y: number;
	radius: number;
	ang: number;
	dx: number;
	dy: number;
	strokeColor: string;
	fillColor: string;
	isHit: boolean = false;
	inFrame: boolean = true;
	bulletInd: number = -1;

	constructor(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D, private theme: string) {
		super(canvas, c);
		const spawnLeft = Math.random() > 0.5;
		this.radius = Math.random() * 100 + 10;
		this.x = spawnLeft ? -this.radius : canvas.width + this.radius;
		this.y = Math.random() * (canvas.height / 2) + canvas.height / 4;
		this.ang = 0;
		this.dx = (spawnLeft ? 1 : -1) * (Math.random() * 5 + 2);
		this.dy = (Math.random() - 0.5) * 4;
		const colors = ['#FF4136', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9', '#FF851B', '#39CCCC']; // Vibrant balloon colors
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		this.strokeColor = theme === DARK_THEME ? "#111" : "#FFF";
		this.fillColor = theme === DARK_THEME ? '#ABA' : randomColor;
	}

	draw(): void {
		this.c.save();
		this.c.beginPath();
		this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.c.fillStyle = this.fillColor;
		this.c.strokeStyle = this.strokeColor;
		this.c.shadowColor = this.fillColor;
		this.c.shadowBlur = 10;
		this.c.stroke();
		this.c.fill();
		this.c.closePath();
		this.c.restore();
	}

	update(bullets: Bullet[]): void {
		this.draw();

		for (let i = 0; i < bullets.length; i++) {
			if (distance(this.x, this.y, bullets[i].x, bullets[i].y) < (this.radius + bullets[i].radius)) {
				this.bulletInd = i;
				this.isHit = true;
				return;
			}
		}

		this.x += this.dx;
		this.y += this.dy;
		// if the target goes out the frame safely, delete the target from the array
		if ((this.dx < 0 && this.x + this.radius < 0) ||
			(this.dx > 0 && this.x - this.radius > this.canvas.width) ||
			(this.y + this.radius < 0) ||
			(this.y - this.radius > this.canvas.height)) {
			this.inFrame = false;
		}
	}

}

export default Target;