import Bullet, { BulletPosition } from "./Objects/Bullet";
import { Gun, GunBody } from "./Objects/Gun";
import Target from "./Objects/Target";
import ScoreBoard, { Score } from "./Objects/ScoreBoard";
import ProjectileLine from "./Objects/ProjectileLine";
import { Position2D } from "./Objects/common-intf";
import { AnimationAction } from "./Animation";
import { DARK_THEME } from "./Objects/consts";
import { RandomStars } from "./Objects/RandomStars";
import { Background } from "./Objects/Background";
import { ExplosionParticle } from "./Objects/ExplosionParticle";

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
    randomStars!: RandomStars;
    background!: Background;
    explosionParticles! : ExplosionParticle[];

    constructor(  canvas:HTMLCanvasElement, private theme:string ) {
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
        this.explosionParticles = [];
        this.gun = new Gun(this.canvas, this.c, this.theme);
        this.scoreBoard = new ScoreBoard(this.canvas, this.c, this.theme);
        this.projectileLine = new ProjectileLine(this.canvas, this.c, this.theme);
        this.gunBody = new GunBody(this.canvas, this.c, this.theme);
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
        this.randomStars = new RandomStars(this.canvas, this.c, 100);
        this.background = new Background(this.canvas, this.c, this.theme);
    }
    
    addEventListeners = () => {
        setInterval( () => {
            this.targets.push(new Target(this.canvas, this.c, this.theme));
        }, 800);

        this.canvas.addEventListener('click', () => { //Whenever we click a mouse button, new bullet is generated
            this.bullets.push(new Bullet(this.canvas, this.c, this.bull_start, this.theme));
        });
        
        this.canvas.addEventListener('mousemove', (event)=>{ //On moving the mouse, the mouse variable gets updated with
            this.mouse.x = event.clientX; 						  // current mouse position
            this.mouse.y = event.clientY;
        });
    };

    update = () => { 
        this.c.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.background.update();
        this.theme === DARK_THEME  && this.randomStars.update();
        this.gun.update(this.bull_start, this.mouse);
        this.scoreBoard.update( this.score );
        this.gunBody.update();
        let targets2Remove:number[] = [];
        let bullets2Remove:number[] = [];

        this.bullets.forEach((bullet, index)=>{
            bullet.update();
            if( !bullet.active ){
                bullets2Remove.push( index );
                this.score.score -= 5;
            }
        });
        
        this.targets.forEach( (target, index)=>{
            const r2 = target.radius;
            const A:Position2D = {
                x: target.x,
                y: target.y
            };

            target.update( this.bullets );
            if(!target.inFrame ){
                targets2Remove.push(index);
                this.score.score -= 10;
            }
            if(target.isHit){
                targets2Remove.push(index);
                this.score.score += 20;
                bullets2Remove.push( target.bulletInd );
                const r1 = this.bullets[target.bulletInd].radius;
                const ratio = r1/(r1+r2);
                const B:Position2D = {
                    x: this.bullets[target.bulletInd].x,
                    y: this.bullets[target.bulletInd].y
                };

                const pos:Position2D = {
                    x: ( B.x - A.x )* ratio + A.x,
                    y: ( B.y - A.y )* ratio + A.y
                }
                for(let i=0;i<8;i++){
                    this.explosionParticles.push( new ExplosionParticle(this.canvas, this.c, pos) );
                }
            }
        });

        targets2Remove.forEach( target => this.targets.splice(target, 1));
        bullets2Remove.forEach( bullet => this.bullets.splice( bullet, 1));

        this.explosionParticles.forEach((particle, index) => {
            particle.update();
            if(particle.ttl <= 0)
                this.explosionParticles.splice(index,1);
        });

        this.projectileLine.update( this.bull_start );
    };

}

export default GameApp;