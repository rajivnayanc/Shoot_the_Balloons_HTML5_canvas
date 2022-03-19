
abstract class RenderableObject {

    constructor(protected canvas:HTMLCanvasElement, protected c:CanvasRenderingContext2D) { }
    abstract draw():void;
    abstract update(...args:any):void;
}

export default RenderableObject;