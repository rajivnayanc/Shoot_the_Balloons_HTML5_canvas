import Bullet from "./Objects/Bullet";
import Gun from "./Objects/Gun";
import Target from "./Objects/Target";
import ScoreBoard from "./Objects/ScoreBoard";
import ProjectileLine from "./Objects/ProjectileLine";


// window.addEventListener('resize', function(){
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	init();
// })

function Game(canvasEl){
    this.canvas = canvasEl;
    this.c = canvasEl.getContext('2d');
    this.score_get = 0;

    this.bullets = [];
    this.targets = [];
    this.mouse = {};
    this.bull_start = {};

    this.g = null;
    this.scoreBoard = null;
    this.projectileLine = null;

    this.addEventListeners = function () {
        setInterval(function(){
            this.targets.push(new Target(this.canvas, this.c));
        }, 800);

        this.canvas.addEventListener('click', function(){ //Whenever we click a mouse button, new bullet is generated
            this.bullets.push(new Bullet(this.canvas, this.c));
        })
        
        this.canvas.addEventListener('mousemove', function(event){ //On moving the mouse, the mouse variable gets updated with
            this.mouse.x = event.clientX; 						  // current mouse position
            this.mouse.y = event.clientY;
        })
    }
    this.init = function(){
        this.bullets = [];
        this.g = new Gun(this.canvas, this.c);
        this.scoreBoard = new ScoreBoard(this.canvas, this.c);
        this.projectileLine = new ProjectileLine(this.canvas, this.c);
        
        this.mouse = { //variable to store the mouse cursor's coordinates
            x: this.canvas.width/2,
            y: this.canvas.height/2
        };
        this.bull_start = { //variable to store the bullet's initial position and angle of velocity
            x: undefined, 
            y: undefined,
            angle: undefined,
            dist: undefined
        };
    }
    
    this.animate = function(){ //Animation Loop
        requestAnimationFrame(this.animate);
        this.c.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.g.update();
        this.scoreBoard.update();
        this.projectileLine.update();
        this.c.beginPath();
        this.c.arc(0,this.canvas.height,150,0,2 * Math.PI, false);
        this.c.fillStyle = "black";
        this.c.fill();
        this.c.closePath();
        
        for(let i = 0; i< this.bullets.length; i++){
            this.bullets[i].update(this.bullets);
        }
        
        for(let i = 0; i< this.targets.length; i++){
            this.targets[i].update(this.bullets,this.targets);
        }
    }

    this.start = function () {
        this.init();
        this.addEventListeners();
        this.animate();
    }
	
}

export default Game;