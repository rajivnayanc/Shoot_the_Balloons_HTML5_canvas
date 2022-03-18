import { BulletPosition } from './Bullet';
import { Position2D } from './common-intf';
import RenderableObject from './renderable-object';
import { distance } from './utils';
class Gun extends RenderableObject{
	x: number;
	y: number;
	length: number;
	color: string;
	constructor(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D) {
		super(canvas, c);
		this.x = 20;
		this.y = canvas.height-20;
		this.length = 200;;
		this.color = "black";
	}

	draw():void{
		this.c.beginPath();
		this.c.fillStyle = this.color;
		this.c.strokeStyle = this.color;
		this.c.moveTo(10, this.canvas.height-10);
		this.c.lineTo(this.x, this.y);
		this.c.lineWidth = 20;
		this.c.fill();
		this.c.stroke();
		this.c.closePath();
	}
	
	update(bull_start:BulletPosition, mouse:Position2D):void { //Constantly update the bullet start position at the end of the nozel. The angle is angle made by 
		const angle = - Math.atan2(this.canvas.height - mouse.y, mouse.x); // nozel from the horizontal
		this.x = 35 + Math.cos(angle)*this.length;
		this.y = this.canvas.height-35+ Math.sin(angle)*this.length;
		bull_start.x = this.x;
		bull_start.y = this.y;
		bull_start.angle = angle;
		bull_start.dist = distance(mouse.x, mouse.y, bull_start.x, bull_start.y)
		this.draw()
	}
}

export default Gun;