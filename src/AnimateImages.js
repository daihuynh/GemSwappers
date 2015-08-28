import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import animate;

var AnimateImage = Class(ImageView, function(supr) {
	this.init = function (opts) {
		this._images = opts.images;
		this._fps = opts.fps;
		
		this._timeStep = 1000 / this._fps;
		this._currentFrame = 0;
		this._ellapsedFrameTime = 0;
		this._isPlay = false;
		this._isLoop = false;
		
		opts.image = this._images[0];
		opts.width = this._images[0].getSourceW();
		opts.height = this._images[0].getSourceH();
		
		supr(this, "init", [opts]);
	};
			
	this.play = function (isLoop) {
		this.reset();
		this._isLoop = isLoop;
		this._isPlay = true;
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
					
					if (!isLoop) {
						this.stop();
						return;
					}
				}
				this.setImage(this._images[this._currentFrame],
				{
					width : this._images[this._currentFrame].getSourceW(),
					height : this._images[this._currentFrame].getSourceH(),
				});
			}
		}
	}
	
	this.stop = function() {
		this._isPlay = false;
		this.reset();
	}
});

// keyFrames = <string, Image>
var KeyFrameImage = function(view, fps, keyFrames) {
	this.view = view;
	this.fps = fps;
	this.keyFrames = keyFrames;
	this.timeStep = 1000 / fps;
	this.loopIntervalID = null;
	this.currentFrame = 0;
	
	this.events = {};
	this.on = function(name, func) {
		this.events.name = func;
	}
	this.emit = function(name) {
		if (this.events.name) {
			this.events.name();
		}
	}
	
	
	var firstKey = null;
	for (var k in keyFrames) {
		firstKey = k;
		break;
	}
	var firstImage = keyFrames[firstKey][0];
	
	this.imgView = new ImageView({
				superview: this.view,
				x: 0,
				y: 0,
				width: firstImage.getSourceW(),
				height: firstImage.getSourceH(),
				image : firstImage
			});
			
	this.play = function(keyName, isLoop) {
		this.stop();
		this.currentFrame = 0;
		var that = this;
		var images = this.keyFrames[keyName];
		this.loopIntervalID = setInterval(function() {
			that.currentFrame ++;
			if (that.currentFrame == images.length) {
				that.currentFrame = 0;
				
				that.emit("complete");
				
				if (!isLoop) {
					that.stop();
					return;
				}
			}
			
			that.imgView.setImage(images[that.currentFrame]);
			that.imgView.updateOpts({
				width : images[that.currentFrame].getSourceW(),
				height : images[that.currentFrame].getSourceH(),
			});
		}, this.timeStep);
	}
	
	this.stop = function() {
		if (this.loopIntervalID == null) return;
		
		clearInterval(this.loopIntervalID);
	}
}

exports.AnimateImage = AnimateImage;
exports.KeyFrameImage = KeyFrameImage;