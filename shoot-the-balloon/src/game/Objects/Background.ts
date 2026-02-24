import { DARK_THEME } from "./consts";
import RenderableObject from "./renderable-object";

export class Background extends RenderableObject {
    backgroundGradient!: CanvasGradient;
    theme: string;
    constructor(canvas: HTMLCanvasElement, c: CanvasRenderingContext2D, theme: string) {
        super(canvas, c);
        this.backgroundGradient = this.c.createLinearGradient(0, 0, 0, this.canvas.height);
        if (theme === DARK_THEME) {
            this.backgroundGradient.addColorStop(0, '#171e26');
            this.backgroundGradient.addColorStop(1, '#3f586b');
        }
        else {
            this.backgroundGradient.addColorStop(0, '#87CEEB'); // Sky blue
            this.backgroundGradient.addColorStop(1, '#E0F6FF'); // Lighter sky
        }
        this.theme = theme;
    }
    draw(): void {
        this.c.save();
        this.c.fillStyle = this.backgroundGradient;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.theme !== DARK_THEME) {
            // Draw Sun
            this.c.beginPath();
            this.c.arc(this.canvas.width * 0.8, this.canvas.height * 0.2, 80, 0, Math.PI * 2);
            this.c.fillStyle = '#FFD700';
            this.c.shadowColor = '#FFD700';
            this.c.shadowBlur = 50;
            this.c.fill();
            this.c.closePath();

            // Turn off shadow for the rest
            this.c.shadowBlur = 0;

            // Draw hills/ground
            this.c.beginPath();
            this.c.moveTo(0, this.canvas.height);
            this.c.lineTo(0, this.canvas.height * 0.7);
            this.c.quadraticCurveTo(this.canvas.width * 0.25, this.canvas.height * 0.6, this.canvas.width * 0.5, this.canvas.height * 0.75);
            this.c.quadraticCurveTo(this.canvas.width * 0.75, this.canvas.height * 0.9, this.canvas.width, this.canvas.height * 0.65);
            this.c.lineTo(this.canvas.width, this.canvas.height);
            this.c.fillStyle = '#8FBC8F'; // Dark sea green
            this.c.fill();
            this.c.closePath();

            this.c.beginPath();
            this.c.moveTo(0, this.canvas.height);
            this.c.lineTo(0, this.canvas.height * 0.8);
            this.c.quadraticCurveTo(this.canvas.width * 0.3, this.canvas.height * 0.9, this.canvas.width * 0.6, this.canvas.height * 0.75);
            this.c.quadraticCurveTo(this.canvas.width * 0.8, this.canvas.height * 0.6, this.canvas.width, this.canvas.height * 0.8);
            this.c.lineTo(this.canvas.width, this.canvas.height);
            this.c.fillStyle = '#228B22'; // Forest green
            this.c.fill();
            this.c.closePath();

            // Draw a basic tree on the right side
            const treeX = this.canvas.width * 0.85;
            const treeY = this.canvas.height * 0.75;

            // Trunk
            this.c.fillStyle = '#8B4513';
            this.c.fillRect(treeX - 15, treeY, 30, this.canvas.height - treeY);

            // Leaves
            this.c.beginPath();
            this.c.arc(treeX, treeY - 20, 60, 0, Math.PI * 2);
            this.c.arc(treeX - 40, treeY + 10, 50, 0, Math.PI * 2);
            this.c.arc(treeX + 40, treeY + 10, 50, 0, Math.PI * 2);
            this.c.arc(treeX, treeY + 40, 55, 0, Math.PI * 2);
            this.c.fillStyle = '#006400';
            this.c.fill();
            this.c.closePath();
        }

        this.c.restore();
    }
    update(): void {
        this.draw();
    }

}