import Bullet from './Bullet';
import { DARK_THEME } from './consts';
import RenderableObject from './renderable-object';
import { distance } from './utils';

class Target extends RenderableObject{

	x: number;
	y: number;
	radius: number;
	ang: number;
	dx: number;
	dy: number;
	strokeColor: string;
	fillColor: string;
	isHit: boolean = false;
	inFrame:boolean = true;
	bulletInd:number = -1;

	constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D, private theme:string){
		super( canvas, c);
		this.x = canvas.width;
		this.radius = Math.random() * 100 + 10;
		this.ang = (canvas.height/2)/canvas.width;
		this.y = this.x * this.ang + + this.canvas.height/4;;
		this.dx = -Math.random() * 10 - 3;
		this.dy = 0;
		this.strokeColor = theme === DARK_THEME ? "#111" : "yellow";
		this.fillColor = theme === DARK_THEME ? '#ABA' : '#111';
	}

	draw(): void {
		this.c.save();
		this.c.beginPath();
		this.c.arc(this.x, this.y,this.radius,0, Math.PI*2, false);
		this.c.fillStyle = this.fillColor;
		this.c.strokeStyle = this.strokeColor;
		this.c.shadowColor = this.fillColor;
		this.c.shadowBlur = 10;
		this.c.stroke();
		this.c.fill();
		this.c.closePath();
		this.c.restore();
	}

	update( bullets:Bullet[] ): void {
		this.draw();

		for(let i = 0; i< bullets.length;i++){
			if(distance(this.x, this.y, bullets[i].x, bullets[i].y) < (this.radius + bullets[i].radius)){ 
				this.bulletInd = i;
				this.isHit = true;
				return;
			}
		}
		
		this.x += this.dx;
		this.y = this.ang * this.x + this.canvas.height/4;
		if(this.x < 0){ // if the target goes out the frame, delete the target from the array
			this.inFrame = false;
		}
	}

}

export default Target;