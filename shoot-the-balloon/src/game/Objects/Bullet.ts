import { LIGHT_THEME } from './consts';
import RenderableObject from './renderable-object';
import { distance } from './utils';

export interface BulletPosition { //variable to store the bullet's initial position and angle of velocity
	x: number; 
	y: number;
	angle: number;
	dist: number;
};

class Bullet extends RenderableObject{

	x:number = 0;
	y:number = 0;
	dx:number = 0;
	dy:number = 0;
	color:string = "black";
	radius:number = 10;
	gravity:number = 0.3;
	active:boolean = true;

	constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D, private bull_start:BulletPosition, theme:string){
		super(canvas, c);
		const dist = bull_start.dist/distance(0,0,canvas.width, canvas.height);
		const velocity = Math.min(150 * dist, 40);
		this.x = bull_start.x; //initialize the position of bullet with the initial position of bullet(end of nozel of gun)
		this.y = bull_start.y;
		this.dx = Math.cos(bull_start.angle)*velocity; //Initialize components of velocity by angle of the nozel
		this.dy = Math.sin(bull_start.angle)*velocity; // Angle of nozel of gun is determined when a mouse is clicked
		this.color = theme === LIGHT_THEME ? "black" : "yellow";
		this.radius = 10;
		this.gravity = 0.3;
		Object.setPrototypeOf(this, Bullet.prototype);
	}

	draw(): void {
		this.c.save();
		this.c.beginPath();
		this.c.arc(this.x,this.y,this.radius, 0, Math.PI * 2,false);
		this.c.fillStyle = this.color;
		this.c.shadowColor = this.color;
		this.c.shadowBlur = 15;
		this.c.lineWidth = 5;
		this.c.fill();
		this.c.closePath();
		this.c.restore();
	}

	update(): void {
		this.draw();
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.gravity;
		if(this.x > this.canvas.width || this.y > this.canvas.height){ //When  bullet goes out of the frame, delete it from array
			this.active = false;
		}
	}

}


export default Bullet;