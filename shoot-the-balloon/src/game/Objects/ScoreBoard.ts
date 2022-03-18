import RenderableObject from "./renderable-object";

export interface Score{
	score:number
}

class ScoreBoard extends RenderableObject{
	x:number;
	y:number;
	score:number;
	constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D){
		super(canvas, c);
		this.x = canvas.width * 0.8;
		this.y = canvas.height * 0.1;
		this.score = 0;
	}
	draw(): void {
		this.c.font = "30px Arial";
		this.c.fillText(`Score: ${this.score}`, this.x, this.y);
	}
	update(score: Score): void {
		this.score = score.score;
		this.draw();
	}
}

export default ScoreBoard;