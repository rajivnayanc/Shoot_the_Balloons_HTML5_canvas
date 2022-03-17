import { distance } from './utils';

function Bullet(canvas, c, bull_start){ // Class for the bullets
	const dist = bull_start.dist/distance(0,0,canvas.width, canvas.height);
	const velocity = Math.min(150 * dist,40);
	this.x = bull_start.x; //initialize the position of bullet with the initial position of bullet(end of nozel of gun)
	this.y = bull_start.y;
	this.dx = Math.cos(bull_start.angle)*velocity; //Initialize components of velocity by angle of the nozel
	this.dy = Math.sin(bull_start.angle)*velocity; // Angle of nozel of gun is determined when a mouse is clicked
	this.color = "black";
	this.radius = 10;
	this.velocity = 5;
	this.gravity = 0.3;
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius, 0, Math.PI * 2,false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
	
	this.update = function(bullets, score ){
		var bullet_index = 0;
		for(var i = 0; i<bullets.length;i++){
			if(this === bullets[i]){
				bullet_index = i;
				break;
			}
		}
		this.x +=this.dx;
		this.y +=this.dy;
		this.dy+=this.gravity;
		if(this.x > canvas.width || this.y > canvas.height){//When  bullet goes out of the frame, delete it from array
			score.score -= 5; // deduct the score by 5
			bullets.splice(bullet_index,1);
		}
		this.draw();
	}
}

export default Bullet;