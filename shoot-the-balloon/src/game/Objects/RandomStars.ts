import { Position2D } from "./common-intf";
import RenderableObject from "./renderable-object"
export class RandomStars extends RenderableObject{
    points:Position2D[] = [];
    constructor(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D, private numOfStars:number){
        super(canvas,c);
        for(let cnt = 0; cnt<numOfStars; cnt++){
            let x = Math.floor( Math.random()*canvas.width );
            let y = Math.floor( Math.random()*canvas.height );
            while(this.points.some( point => point.x===x && point.y===y) ){
                x = Math.floor(Math.random()*canvas.width);
                y = Math.floor(Math.random()*canvas.height);
            }
            this.points.push({x,y});
        }
    }
    draw(): void {
        this.c.save();

        for(let point of this.points){
            this.c.beginPath();
            this.c.arc(point.x, point.y, 2, 0, 2*Math.PI);
            this.c.fillStyle = 'white';
            this.c.fill();
            this.c.closePath();
        }
        
        this.c.restore();
    }
    update(): void {
        this.draw();
    }

}