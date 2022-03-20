import { LIGHT_THEME } from "./consts";
import RenderableObject from "./renderable-object";

export interface Score{
	score:number
}

class ScoreBoard extends RenderableObject{
	x: number;
	y: number;
	score: number;
	color: string;
	constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D, theme:string){
		super(canvas, c);
		this.x = canvas.width * 0.8;
		this.y = canvas.height * 0.1;
		this.score = 0;
		this.color = theme === LIGHT_THEME ? "black" : "white";
	}
	draw(): void {
		this.c.font = "30px Arial";
		this.c.fillText(`Score: ${this.score}`, this.x, this.y);
		this.c.fillStyle = this.color;
	}
	update(score: Score): void {
		this.score = score.score;
		this.draw();
	}
}

export default ScoreBoard;