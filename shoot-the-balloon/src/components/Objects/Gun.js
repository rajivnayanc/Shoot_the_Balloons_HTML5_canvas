import { distance } from './utils';
function Gun(canvas, c){ //Class for Gun
	this.x = 20;
	this.y = canvas.height-20;
	this.length = 200;
	this.color = "black"
	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.color;
		c.strokeStyle = this.color;
		c.moveTo(10,canvas.height-10);
		c.lineTo(this.x, this.y);
		c.lineWidth = 20;
		c.fill();
		c.stroke();
		c.closePath();
	}
	
	this.update = function(bull_start, mouse){ //Constantly update the bullet start position at the end of the nozel. The angle is angle made by 
		const angle = - Math.atan2(canvas.height - mouse.y, mouse.x); // nozel from the horizontal
		this.x = 35 + Math.cos(angle)*this.length;
		this.y = canvas.height-35+ Math.sin(angle)*this.length;
		bull_start.x = this.x;
		bull_start.y = this.y;
		bull_start.angle = angle;
		bull_start.dist = distance(mouse.x, mouse.y, bull_start.x, bull_start.y)
		this.draw()
	}
}

export default Gun;