export abstract class AnimationAction {
    c!: (CanvasRenderingContext2D);
    constructor(protected canvas:HTMLCanvasElement){
        const context = canvas.getContext('2d');
        if(context === null)
            throw Error("Context is Null");
        this.c = context;
    }
    abstract addEventListeners():void ;
    abstract update():void ;
    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.update();
    }

    start = () => {
        this.addEventListeners();
        this.animate();
    }
}