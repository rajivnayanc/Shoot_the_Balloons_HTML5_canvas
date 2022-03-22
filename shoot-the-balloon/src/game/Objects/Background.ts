import { DARK_THEME } from "./consts";
import RenderableObject from "./renderable-object";

export class Background extends RenderableObject{
    backgroundGradient!:CanvasGradient;
    constructor(canvas:HTMLCanvasElement, c:CanvasRenderingContext2D, theme:string){
        super(canvas, c);
        this.backgroundGradient = this.c.createLinearGradient(0,0,0, this.canvas.height);
        if(theme === DARK_THEME){
            this.backgroundGradient.addColorStop(0,'#171e26');
            this.backgroundGradient.addColorStop(1,'#3f586b');
        }
        else{
            this.backgroundGradient.addColorStop(0, '#EFA');
        }
        
    }
    draw(): void {
        this.c.save();
        this.c.fillStyle = this.backgroundGradient;
        this.c.fillRect(0,0,this.canvas.width, this.canvas.height);
        this.c.fill();
        this.c.restore();
    }
    update(): void {
        this.draw();
    }

}