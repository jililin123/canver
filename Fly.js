(function(win) {

// 整个游戏的全局对象，所有其他的游戏角色
// 都作为 当前对象的一个属性
var Fly = {};

// 以后，如果再由构造函数 或者是 工具性的方法，都要放到当前对象中！

// 作用：用来加载多张图片
// 第一个参数：表示要加载的图片路径数组
// 第二个参数：是一个回调函数，等到所有的图片加载完成会调用该函数
Fly.loadImages = function(imgsSrcArr, callback) {
	// 用来记录当前加载完成的图片数量
	var count = 0,
		length = imgsSrcArr.length,
		// 用来存放所有的图片对象
		imgList = {};

	imgsSrcArr.forEach(function(imgSrc) {
		// 1 创建图片对象
		var img = new Image();
		img.src = "../imgs/" + imgSrc + ".png";

		// imgList["birds"] = img;
		imgList[imgSrc] = img;

		img.onload = function() {
			count++;

			if(count >= length) {
				// 此时，说明所有的图片都加载完成了，此时，需要调用回调函数
				// 因为回调函数中要使用所有的图片，所以，就将所有的图片对象
				// 当作参数传给了 callback
				callback(imgList);
			}
		};
	});
};

// 将全局对象暴露到全局环境中！
win.Fly = Fly;
})(window);