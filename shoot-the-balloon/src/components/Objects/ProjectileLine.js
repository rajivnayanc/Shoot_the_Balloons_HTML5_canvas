import { distance, getQuadraticRoots } from './utils';

function ProjectileLine(canvas, c){
	this.start = {x:0,y:0};
	this.end = {x:0,y:0};
	this.controlPoints = {x:0,y:0};
	this.gravity = 0.3;
	this.draw = function() {
		c.save();
		c.lineWidth = 1;
		c.beginPath();
		c.setLineDash([10,15])
		c.moveTo(this.start.x, this.start.y);
		c.quadraticCurveTo(this.controlPoints.x, this.controlPoints.y, this.end.x, this.end.y);
		c.strokeStyle = "red";
		c.stroke();
		c.restore();
	}
	this.getControlPoints  = function(a, b, c){
		let out = {x:0,y:0};
		out.x = (this.start.x+this.end.x)/2;
		out.y = ((this.end.x-this.start.x)/2) * (2*a*this.start.x + b) + (a*this.start.x*this.start.x + b*this.start.x + c);
		return out;
	}

	this.update = function( bull_start ) {
		this.start.x = bull_start.x;
		this.start.y = bull_start.y;
		const dist = bull_start.dist/distance(0,0,canvas.width, canvas.height);
		const velocity = Math.min(150 * dist,40);
		let ux = Math.cos(bull_start.angle) * velocity;
		let uy = Math.sin(bull_start.angle) * velocity;
		
		let t_x = (canvas.width-this.start.x)/ux;
		let t_y = getQuadraticRoots(this.gravity, 2*uy, -2 * (canvas.height - this.start.y));
		let t_y_top = getQuadraticRoots(this.gravity, 2*uy, -2 * (0 - this.start.y));
		let timeArray = [t_x, t_y, t_y_top].filter(a=>a!=null)
		let min_time = Math.min(...timeArray);
		this.end.x = this.start.x + ux*min_time;
		this.end.y = this.start.y + uy*min_time +  (this.gravity * min_time * min_time)/2;
		const a = this.gravity/(2*ux*ux);
		const b = uy/ux - (this.gravity*this.start.x)/(ux*ux);
		const c = this.start.y - uy*this.start.x/ux + this.gravity*this.start.x*this.start.x/(2*ux*ux);
		this.controlPoints = this.getControlPoints( a, b, c );
		this.draw();
	}
}

export default ProjectileLine;