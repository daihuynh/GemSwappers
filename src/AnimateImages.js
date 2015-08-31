import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import animate;

var AnimateImage = Class(ImageView, function(supr) {
	this.init = function (opts) {
		this._images = opts.images;
		this._fps = opts.fps;
		this._isResetSize = opts.isResetSize || false;
		this._makeCenter = opts.makeCenter || false;
		
		this._timeStep = 1000 / this._fps;
		this._currentFrame = 0;
		this._ellapsedFrameTime = 0;
		this._isPlay = false;
		this._isLoop = false;
		this._x = opts.x;
		this._y = opts.y;
		
		opts.image = this._images[0];
		if (this._isResetSize) {
			opts.width = this._images[0].getSourceW();
			opts.height = this._images[0].getSourceH();
		}
		if (this._makeCenter) {
			opts.x = this._x - this._images[0].getSourceW() / 2;
			opts.y = this._y - this._images[0].getSourceH() / 2;
		}
		
		supr(this, "init", [opts]);
	};
			
	this.play = function (isLoop) {
		this.reset();
		this._isLoop = isLoop;
		this._isPlay = true;
	}
	
	this.stop = function() {
		this._isPlay = false;
		this.reset();
	}
	
	this.reset = function () {
		this._isLoop = false;
		this._ellapsedFrameTime = 0;
		this._currentFrame = 0;
	}
	
	this.tick = function (dt) {
		if (this._isPlay) {
			this._ellapsedFrameTime += dt;
			if (this._ellapsedFrameTime >= this._timeStep) {
				this._ellapsedFrameTime -= this._timeStep;
				
				this._currentFrame ++;
				
				if (this._currentFrame == this._images.length) {
					this._currentFrame = 0;
					
					this.emit("complete");
					
					if (!this._isLoop) {
						this.stop();
						
						this.setImage(this._images[this._currentFrame]);
						if (this._isResetSize) {
							this.updateOpts({
								width : this._images[this._currentFrame].getSourceW(),
								height : this._images[this._currentFrame].getSourceH(),
							});
						}
						if (this._makeCenter) {
							this.updateOpts({
								x : this._x - this._images[this._currentFrame].getSourceW() / 2,
								y: this._y - this._images[this._currentFrame].getSourceH() / 2
							});
						}
						return;
					}
				}
				
				this.setImage(this._images[this._currentFrame]);
				if (this._isResetSize) {
					this.updateOpts({
						width : this._images[this._currentFrame].getSourceW(),
						height : this._images[this._currentFrame].getSourceH(),
					});
				}
				if (this._makeCenter) {
					this.updateOpts({
						x : this._x - this._images[this._currentFrame].getSourceW() / 2,
						y: this._y - this._images[this._currentFrame].getSourceH() / 2
					});
				}
			}
		}
	}
});

// keyFrames = <string, Image>
var KeyFrameImage = Class(ImageView, function(supr) {
	this.init = function(opts) {
		this._fps = opts.fps;
		this._keyFrames = opts.keyFrames;
		this._makeCenter = opts.makeCenter || false;
		
		this._timeStep = 1000 / this._fps;
		this._currentFrame = 0;
		this._ellapsedFrameTime = 0;
		this._isPlay = false;
		this._isLoop = false;
		this._keyName = "";
		
		var firstKey = null;
		for (var k in this._keyFrames) {
			firstKey = k;
			break;
		}
		var firstImage = this._keyFrames[firstKey][0];
		
		opts.image = firstImage;
		opts.width = firstImage.getSourceW();
		opts.height = firstImage.getSourceH();
		
		supr(this, "init", [opts]);
	}
			
	this.play = function(keyName, isLoop) {
		this.reset();
		this._isLoop = isLoop;
		this._isPlay = true;
		this._keyName = keyName;
	}
	
	this.stop = function() {
		this._isPlay = false;
		this.reset();
	}
	
	this.reset = function () {
		this._isLoop = false;
		this._ellapsedFrameTime = 0;
		this._currentFrame = 0;
	}
	
	this.tick = function (dt) {
		if (this._isPlay) {
			this._ellapsedFrameTime += dt;
			if (this._ellapsedFrameTime >= this._timeStep) {
				this._ellapsedFrameTime -= this._timeStep;
				
				this._currentFrame ++;
				
				if (this._currentFrame == this._keyFrames[this._keyName].length) {
					this._currentFrame = 0;
					
					this.emit("complete");
					
					if (!this._isLoop) {
						this.stop();
						
						this.setImage(this._keyFrames[this._keyName][this._currentFrame]);
						this.updateOpts({
							width : this._keyFrames[this._keyName][this._currentFrame].getSourceW(),
							height : this._keyFrames[this._keyName][this._currentFrame].getSourceH(),
						});
						return;
					}
				}
				
				this.setImage(this._keyFrames[this._keyName][this._currentFrame]);
				this.updateOpts({
					width : this._keyFrames[this._keyName][this._currentFrame].getSourceW(),
					height : this._keyFrames[this._keyName][this._currentFrame].getSourceH(),
				});
				if (this._makeCenter) {
					this.updateOpts({
						offsetX : this._keyFrames[this._keyName][this._currentFrame].getSourceW() / 2,
						offsetY : this._keyFrames[this._keyName][this._currentFrame].getSourceH() / 2,
					});
				}
			}
		}
	}
});

exports.AnimateImage = AnimateImage;
exports.KeyFrameImage = KeyFrameImage;