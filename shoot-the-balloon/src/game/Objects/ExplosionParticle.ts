import { Position2D } from "./common-intf";
import RenderableObject from "./renderable-object";
import { randomInRange } from "./utils";


export class ExplosionParticle extends RenderableObject {
    ttl:number = 100;
    opacity: number = 1;
    velocity: Position2D;
	gravity:number = 0.3;
    pos: Position2D;
    constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D, initpos: Position2D){
        super(canvas, c);
        this.velocity = {
            x: randomInRange(-5,5),
            y: randomInRange(-15,15)
        }
        this.pos = { x: initpos.x, y: initpos.y };
    }
    draw(): void {
        this.c.save();

        this.c.beginPath();
        this.c.arc(this.pos.x, this.pos.y, 3, 0, 2*Math.PI);
        this.c.fillStyle = `rgb(227, 234, 239, ${this.opacity})`;
        this.c.shadowColor = 'rgb(227, 234, 239 )';
        this.c.shadowBlur = 20;
        this.c.fill();
        this.c.closePath(); 
        
        this.c.restore();
    }
    update(): void {
        this.draw();
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.velocity.y += this.gravity;

        this.ttl -= 1;
        this.opacity -= 1/this.ttl;
    }
}
