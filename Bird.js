// 使用沙箱模式，将小鸟封装起来
// 因为，游戏中的角色有很多个，每一个角色都对应了一个对象
// 如果，直接将代码 通过 window 暴露到全局环境中，还是会造成全局污染的问题
// 
// 解决方式： 使用命名空间
(function(Fly) {

var Bird = function(options) {
	// 绘制的上下文
	this.ctx = options.ctx;
	// 当前游戏对象的 图片
	this.img = options.img;

	this.imgW = this.img.width / 3;
	this.imgH = this.img.height;

	// 用来控制当前绘制到哪一帧了
	this.frameIndex = 0;
	this.speed = 0;	// 速度
	this.a = 0.0005; // 加速度
	// 小鸟 垂直方向的初始位置
	this.y = options.x || 100;
	this.x = options.y || 100;
	this.maxSpeed = 0.5; // 用来控制小鸟旋转角度的 速度最大值
	this.maxAngle = 45;	// 用来控制小鸟旋转的最大角度
};

Bird.prototype = {
	constructor: Bird,

	// 时间是 世界对象 告诉游戏中的每一个角色的！
	draw: function(delta) {
		// 计算速度 ，经过时间delta后的 当前速度
		// Vt = V0 + at
		this.speed = this.speed + this.a * delta;
		// console.log(speed);
		// 计算经过时间 delta 之后的，走的路程
		// s = V0t + 1/2at^2
		this.y = this.y + this.speed * delta + 1/2 * this.a * delta * delta;

		// 小鸟当前速度对应的角度
		var curAngle = 0;

		// 根据速度来计算的角度
		curAngle = this.speed / this.maxSpeed * this.maxAngle;

		// 改变小鸟头的方向
		// 思路：根据速度来控制小鸟旋转的角度
		// if(speed >= maxSpeed) {
		if(curAngle >= this.maxAngle) {
			curAngle = this.maxAngle;
		}
		
		// 进行平移和旋转, 一定要将当前的状态保存起来
		this.ctx.save();
		
		// 先平移
		this.ctx.translate(this.x, this.y);
		// 在寻转
		this.ctx.rotate( curAngle/180 * Math.PI );
		// 最后，绘制
		this.ctx.drawImage(this.img, this.imgW * this.frameIndex, 0, this.imgW, this.imgH, -1/2*this.imgW, -1/2*this.imgH, this.imgW, this.imgH);

		this.ctx.restore();

		this.frameIndex++;
		this.frameIndex %= 3;
	}
};

// 作用：赋值操作的执行顺序是：从右向左
// 右边的Bird 就是：构造函数（变量）
// 左边的Bird 是：Fly对象的一个属性
// 因为 Bird 是在一个沙箱中声明的，但是我们需要在全局环境中使用Bird
// 此时，将Bird 赋值给 Fly 的一个属性，又因为Fly是一个全局对象，
// 所以，就可以在全局环境中使用Bird 了
Fly.Bird = Bird;

// 因为 Fly 是给window添加的属性，所以，直接可以获取到 Fly 对象
})(Fly);

// 使用：
// var b = new Fly.Bird();
// var b = new Sky.Bird();
// var b = new Land.Bird();
// var b = new Pipe.Bird();