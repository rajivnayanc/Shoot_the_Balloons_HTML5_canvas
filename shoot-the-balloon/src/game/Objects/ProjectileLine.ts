import { BulletPosition } from './Bullet';
import { Position2D } from './common-intf';
import { LIGHT_THEME } from './consts';
import RenderableObject from './renderable-object';
import { distance, getQuadraticRoots } from './utils';

class ProjectileLine extends RenderableObject {
	start:Position2D;
	end:Position2D;
	controlPoints:Position2D;
	gravity:number;
	color: string;
	constructor(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D, theme:string){
		super(canvas, c);
		this.start = {x:0,y:0};
		this.end = {x:0,y:0};
		this.controlPoints = {x:0,y:0};
		this.gravity = 0.3;
		this.color = theme===LIGHT_THEME?"black":"gray";
	}
	draw(): void {
		this.c.save();
		this.c.lineWidth = 1;
		this.c.beginPath();
		this.c.setLineDash([10,15])
		this.c.moveTo(this.start.x, this.start.y);
		this.c.quadraticCurveTo(this.controlPoints.x, this.controlPoints.y, this.end.x, this.end.y);
		this.c.strokeStyle = this.color;
		this.c.stroke();
		this.c.restore();
	}
	update(bull_start:BulletPosition): void {
		this.start.x = bull_start.x;
		this.start.y = bull_start.y;
		const dist = bull_start.dist/distance(0,0,this.canvas.width, this.canvas.height);
		const velocity = Math.min(150 * dist,40);
		let ux = Math.cos(bull_start.angle) * velocity;
		let uy = Math.sin(bull_start.angle) * velocity;
		
		let t_x = (this.canvas.width-this.start.x)/ux;
		let t_y = getQuadraticRoots(this.gravity, 2*uy, -2 * (this.canvas.height - this.start.y));

		let t_y_top = getQuadraticRoots(this.gravity, 2*uy, -2 * (0 - this.start.y));
		let timeArray = [t_x, t_y, t_y_top].filter(a=>a!=null) as number[];
		let min_time = Math.min(...timeArray);
		this.end.x = this.start.x + ux*min_time;
		this.end.y = this.start.y + uy*min_time +  (this.gravity * min_time * min_time)/2;
		const a = this.gravity/(2*ux*ux);
		const b = uy/ux - (this.gravity*this.start.x)/(ux*ux);
		const c = this.start.y - uy*this.start.x/ux + this.gravity*this.start.x*this.start.x/(2*ux*ux);
		this.controlPoints = this.getQuadraticBezierControlPoints( a, b, c );
		this.draw();
	}

	getQuadraticBezierControlPoints(a:number, b:number, c:number):Position2D{
		let out:Position2D = {x:0,y:0};
		out.x = (this.start.x+this.end.x)/2;
		out.y = ((this.end.x-this.start.x)/2) * (2*a*this.start.x + b) + (a*this.start.x*this.start.x + b*this.start.x + c);
		return out;
	}

}

export default ProjectileLine;