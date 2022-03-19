import Bullet, { BulletPosition } from "./Objects/Bullet";
import { Gun, GunBody } from "./Objects/Gun";
import Target from "./Objects/Target";
import ScoreBoard, { Score } from "./Objects/ScoreBoard";
import ProjectileLine from "./Objects/ProjectileLine";
import { Position2D } from "./Objects/common-intf";
import { AnimationAction } from "./Animation";

class GameApp extends AnimationAction {
    score!: Score;
    bullets!: Bullet[];
    targets!: Target[];
    mouse!: Position2D;
    bull_start!: BulletPosition;
    gun!: Gun;
    gunBody!: GunBody;
    scoreBoard!: ScoreBoard;
    projectileLine!: ProjectileLine;

    constructor(  canvas:HTMLCanvasElement ) {
        super(canvas);
        const context = canvas.getContext('2d');
        if(context === null)
            throw Error("Context is Null");
        this.c = context;
        this.init();
    }

    init = () => {
        this.score = { score:0 };
        this.bullets = [];
        this.targets = [];
        this.gun = new Gun(this.canvas, this.c);
        this.scoreBoard = new ScoreBoard(this.canvas, this.c);
        this.projectileLine = new ProjectileLine(this.canvas, this.c);
        this.gunBody = new GunBody(this.canvas, this.c);
        this.mouse = { //variable to store the mouse cursor's coordinates
            x: this.canvas.width/2,
            y: this.canvas.height/2
        };
        this.bull_start = { //variable to store the bullet's initial position and angle of velocity
            x: -1, 
            y: -1,
            angle: -1,
            dist: -1
        };
    }
    
    addEventListeners = () => {
        setInterval( () => {
            this.targets.push(new Target(this.canvas, this.c));
        }, 800);

        this.canvas.addEventListener('click', () => { //Whenever we click a mouse button, new bullet is generated
            this.bullets.push(new Bullet(this.canvas, this.c, this.bull_start));
        });
        
        this.canvas.addEventListener('mousemove', (event)=>{ //On moving the mouse, the mouse variable gets updated with
            this.mouse.x = event.clientX; 						  // current mouse position
            this.mouse.y = event.clientY;
        });
    };

    update = () => { 
        this.c.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.gun.update(this.bull_start, this.mouse);
        this.scoreBoard.update( this.score );
        this.projectileLine.update( this.bull_start );
        this.gunBody.update();
        for(let i = 0; i< this.bullets.length; i++){
            this.bullets[i].update( this.bullets, this.score );
        }
        
        for(let i = 0; i< this.targets.length; i++){
            this.targets[i].update( this.bullets,this.targets, this.score );
        }
    };

}

export default GameApp;