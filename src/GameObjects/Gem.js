import ui.TextView as TextView;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import src.SpriteInfo as SpriteInfo;
import src.AnimateImages as AnimateImages;
import src.Configs.GameConfig as GameConfig;

var AnimateImage = AnimateImages.AnimateImage;
var KeyFrameImage = AnimateImages.KeyFrameImage;


var Gem = Class(ImageView, function(supr) {
	this.init = function (opts) {
		this._gemImages = 	[SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_01.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_02.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_03.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_04.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_05.png")];
		
		this._type = 0;
		
		supr(this, "init", [opts]);
		
		this._shine = new AnimateImage({
			superview : this,
			fps: 6,
			width: GameConfig["gem_size"],
			height: GameConfig["gem_size"],
			images: [
				SpriteInfo.findImageByName("mainSpriteInfo", "shine_icon_0001.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "shine_icon_0002.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "shine_icon_0003.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "shine_icon_0004.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "shine_icon_0005.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "shine_icon_0006.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "sparklyWhite.png")
			]
		});
		this._shine.hide();
		
		this._explosion = new AnimateImage({
			superview : this,
			fps: 6,
			isResetSize: true,
			x : GameConfig["gem_size"] / 10,
			y : GameConfig["gem_size"] / 10,
			images: [
				SpriteInfo.findImageByName("mainSpriteInfo", "block_03_pop_0001.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "block_03_pop_0002.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "block_03_pop_0003.png")
			]
		});
		this._explosion.hide();
	}
	
	this.showType = function (type) {
		this._type = type;
		
		this.setImage(this._gemImages[type]);
	}
	
	this.shine = function () {
		var that = this;
		
		this._shineAction = setInterval(function() {
			that._shine.show();
			that._shine.play(false);
		}, 2000);
		
		this._shine.on("complete", function () {
			that._shine.hide();
		});
		this._shine.play(false);
		this._shine.show();
	}
	
	this.stopShine = function () {
		clearInterval(this._shineAction);
		this._shine.removeListener("oncomplete");
		this._shine.stop();
		this._shine.hide();
	}
	
	this.blast = function () {
		this._explosion.show();
		this.style.zIndex = -1;
		
		// remove input
		this.removeListener("onInputSelect");
		
		var that = this;
		this._explosion.on("complete", function () {
			that._explosion.removeListener("oncomplete");
			that._explosion.hide();
			that.hide();
		});
		
		this.stopShine();
		this._explosion.play(false);
	}
});

exports = Gem;