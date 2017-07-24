(function(Fly) {

// 天空对象的 构造函数
var Sky = function(options) {
	this.ctx = options.ctx;
	this.img = options.img;
	this.imgW = this.img.width;
	this.imgH = this.img.height;

	// 天空背景的坐标：
	this.x = options.x;
	this.y = 0;
	// 天空对象移动的速度
	this.speed = 0.15;
};

// 天空对象的 原型
Sky.prototype = {
	constructor: Sky,
	draw: function(delta) {
		var ctx = this.ctx;
		
		// 第一张天空背景的x坐标
		this.x = this.x - this.speed * delta;

		if(this.x <= -this.imgW) {
			this.x += this.imgW * 2;
		}

		// 天空
		ctx.drawImage(this.img, 0, 0, this.imgW, this.imgH, this.x, this.y, this.imgW, this.imgH);
	}
};

Fly.Sky = Sky;
})(Fly);