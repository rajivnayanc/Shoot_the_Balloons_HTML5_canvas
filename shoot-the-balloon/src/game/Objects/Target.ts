import Bullet from './Bullet';
import { DARK_THEME } from './consts';
import RenderableObject from './renderable-object';
import { Score } from './ScoreBoard';
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
	constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D, private theme:string){
		super( canvas, c);
		this.x = canvas.width;
		this.y = canvas.height;
		this.radius = Math.random() * 100 + 10;
		this.ang = (canvas.height/2)/canvas.width;
		
		this.dx = -Math.random() * 10 - 3;
		this.dy = 0;
		this.strokeColor = theme === DARK_THEME ? "white" : "yellow";
		this.fillColor = theme === DARK_THEME ? '#999' : '#111';
	}
	draw(): void {
		this.c.save();
		this.c.beginPath();
		this.c.arc(this.x, this.y,this.radius,0, Math.PI*2, false);
		this.c.fillStyle = this.fillColor;
		this.c.strokeStyle = this.strokeColor;
		this.c.lineWidth = 5;
		this.c.stroke();
		this.c.fill();
		this.c.closePath();
		this.c.restore();
	}
	update(bullets:Bullet[],targets:Target[], score:Score): void {
		let target_index = 0;
		for(let i = 0; i<targets.length;i++){
			if(this === targets[i]){
				target_index = i;
				break;
			}
		}
		for(let i = 0; i< bullets.length;i++){
			
			if(distance(this.x, this.y, bullets[i].x, bullets[i].y) < (this.radius + bullets[i].radius)){ 
				bullets.splice(i,1);
				targets.splice(target_index,1); 
				score.score += 20; //Increase the score by 20
				continue;
			}
		}
		
		this.x += this.dx;
		this.y = this.ang * this.x + this.canvas.height/4;
		if(this.x<0){ // if the target goes out the frame, delete the target from the array
			targets.splice(target_index,1);
			score.score -= 10;
		}
		this.draw();
	}
}

export default Target;