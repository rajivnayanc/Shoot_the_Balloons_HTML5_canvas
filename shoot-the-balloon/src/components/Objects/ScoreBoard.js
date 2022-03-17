function ScoreBoard(canvas, c){
	this.x = canvas.width * 0.8;
	this.y = canvas.height * 0.1;
	this.score = 0;
	this.draw = function(){
		c.font = "30px Arial";
		c.fillText("Score: "+this.score, this.x, this.y);
	}
	this.update = function( score_get ){
		this.score = score_get;
		this.draw();
	}
}

export default ScoreBoard;