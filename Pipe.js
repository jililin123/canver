(function(Fly) {
// 管道的结构
var Pipe = function(options) {
	this.ctx = options.ctx;

	this.imgUp = options.imgUp;
	this.imgDown = options.imgDown;

	this.imgW = this.imgUp.width;
	this.imgH = this.imgUp.height;

	this.x = options.x;
	// 管道的高度是随机生成的
	this.upY = 0;
	this.downY = 0;
	this.speed = 0.15;
	this.pipeSpace = 150;

	this.initPipeY();
};

Pipe.prototype.draw = function(delta) {
	var ctx = this.ctx;

	this.x = this.x - this.speed * delta;
	if(this.x <= -this.imgW) {
		// *3 是因为每两个管道之间的距离为：当前管道的3倍
		// *6 是因为需要绘制6个管道
		this.x += this.imgW * 3 * 6;

		// 重新生成管道的y坐标
		this.initPipeY();
	}

	ctx.drawImage(this.imgUp, 0, 0, this.imgW, this.imgH, this.x, this.upY, this.imgW, this.imgH);
	ctx.drawImage(this.imgDown, 0, 0, this.imgW, this.imgH, this.x, this.downY, this.imgW, this.imgH);

	// 描绘管道的路径
	this.initPath();
};

// 初始化上下管道的高度，计算出上下管道的y坐标
Pipe.prototype.initPipeY = function() {
	// 保证管道的最大高度 和 最小高度
	var pipeTopHeight = Math.floor( Math.random() * 200 ) + 50;

	this.upY = pipeTopHeight - this.imgH;
	this.downY = pipeTopHeight + this.pipeSpace;

	// this.initPath();
};

// 绘制路径，目的：为了检测小鸟有没有碰到管道
Pipe.prototype.initPath = function() {
	ctx.rect(this.x, this.upY, this.imgW, this.imgH);
	ctx.rect(this.x, this.downY, this.imgW, this.imgH);

	// ctx.fill();
};

Fly.Pipe = Pipe;

})(Fly);