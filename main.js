var canvas = document.getElementById("mycanvas");
var score = document.getElementById("score");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var score_get = 0;

let bullets = [];
let targets = [];

//At every 800ms, a new Target( Balloon is inserted)
setInterval(function(){
	targets.push(new Target());
},800);


window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})

function distance(x1,y1,x2,y2){ //Function to find Euclidian Distance Between Two Points on Screen
	let x_d = x2-x1;
	let y_d = y2-y1;
	
	return (Math.sqrt(Math.pow(x_d,2)+Math.pow(y_d,2)));
}

var mouse = { //variable to store the mouse cursor's coordinates
	x: canvas.width/2,
	y: canvas.height/2
};

var bull_start = { //variable to store the bullet's initial position and angle of velocity
	x: undefined, 
	y: undefined,
	angle: undefined,
	dist: undefined
};

canvas.addEventListener('click', function(){ //Whenever we click a mouse button, new bullet is generated
	bullets.push(new Bullet());
})

canvas.addEventListener('mousemove', function(event){ //On moving the mouse, the mouse variable gets updated with
	mouse.x = event.clientX; 						  // current mouse position
	mouse.y = event.clientY;
})

function Target(){ //Class for Targets or Balloons
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
	
	this.update = function(bullets,targets){
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
				score_get+=20; //Increase the score by 20
				continue;
			}
		}
		
		this.x+=this.dx;
		this.y = this.ang * this.x + canvas.height/4;
		if(this.x<0){ // if the target goes out the frame, delete the target from the array
			targets.splice(target_index,1);
			score_get-=10;
		}
		this.draw();
	}
}


function Bullet(){ // Class for the bullets
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
	
	this.update = function(bullets){
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
			score_get-=5; // deduct the score by 5
			bullets.splice(bullet_index,1);
		}
		this.draw();
	}
}

function Gun(){ //Class for Gun
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
	
	this.update = function(){ //Constantly update the bullet start position at the end of the nozel. The angle is angle made by 
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

function ScoreBoard(){
	this.x = canvas.width * 0.8;
	this.y = canvas.height * 0.1;
	this.score = 0;
	this.draw = function(){
		c.font = "30px Arial";
		c.fillText("Score: "+this.score, this.x, this.y);
	}
	this.update = function(){
		this.score = score_get;
		this.draw();
	}
}

function getQuadraticRoots(a,b,c){
	let deteminant = b*b - 4*a*c;
	if(deteminant < 0) return null;
	deteminant = Math.sqrt(deteminant);

	const root1 = (-b - deteminant)/(2*a);
	const root2 = (-b + deteminant)/(2*a);
	if(root1 >=0) return root1;
	if(root2 >=0) return root2;
}

function ProjectileLine(){
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

	this.update = function() {
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

let g;
let scoreBoard;
let projectileLine;

function init(){
	bullets = [];
	g = new Gun();
	scoreBoard = new ScoreBoard();
	projectileLine = new ProjectileLine();
}

function animate(){ //Animation Loop
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width, canvas.height);
	g.update();
	scoreBoard.update();
	projectileLine.update();
	c.beginPath();
	c.arc(0,canvas.height,150,0,2 * Math.PI, false);
	c.fillStyle = "black";
	c.fill();
	c.closePath();
	
	for(var i = 0; i< bullets.length; i++){
		bullets[i].update(bullets);
	}
	
	for(var i = 0; i< targets.length; i++){
		targets[i].update(bullets,targets);
	}
}
function start(){
	init();
    animate();
}

start();

