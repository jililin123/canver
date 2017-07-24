(function(Fly) {

var Land = function(options) {
	this.ctx = options.ctx;
	this.img = options.img;
	this.imgW = this.img.width;
	this.imgH = this.img.height;

	this.x = options.x;
	this.y = options.y;

	this.speed = 0.15;
};

Land.prototype.draw = function(delta) {
	var ctx = this.ctx;

	this.x = this.x - this.speed * delta;
	if(this.x <= -this.imgW) {
		this.x += this.imgW * 4;
	}

	ctx.drawImage(this.img, 0, 0, this.imgW, this.imgH, this.x, this.y, this.imgW, this.imgH);
};

Fly.Land = Land;

})(Fly);