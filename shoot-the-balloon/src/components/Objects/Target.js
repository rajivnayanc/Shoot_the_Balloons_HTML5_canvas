import { distance } from './utils';

function Target(canvas, c){ //Class for Targets or Balloons
	this.x = canvas.width;
	this.y = canvas.height;
	this.radius = Math.random() * 100 + 10;
	this.ang = (canvas.height/2)/canvas.width;
	
	this.dx = -Math.random() * 10 - 3;
	this.dy = 0;
	this.color = 'red';
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y,this.radius,0, Math.PI*2, false);
		c.strokeStyle = this.color;
		c.lineWidth = 1;
		c.stroke();
		c.closePath();
		
	}
	
	this.update = function(bullets,targets, score){
		var target_index = 0;
		for(var i = 0; i<targets.length;i++){
			if(this === targets[i]){
				target_index = i;
				break;
			}
		}
		for(var i = 0; i< bullets.length;i++){
			
			if(distance(this.x, this.y, bullets[i].x, bullets[i].y) < (this.radius + bullets[i].radius)){ 
				var b = bullets[i]; //If bullets and target collide, delete both bullet and target
				bullets.splice(i,1);
				targets.splice(target_index,1); 
				score.score += 20; //Increase the score by 20
				continue;
			}
		}
		
		this.x+=this.dx;
		this.y = this.ang * this.x + canvas.height/4;
		if(this.x<0){ // if the target goes out the frame, delete the target from the array
			targets.splice(target_index,1);
			score.score -= 10;
		}
		this.draw();
	}
}

export default Target;