import device;
import ui.resource.loader as loader;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import src.SpriteInfo as SpriteInfo;
import src.AnimateImages as AnimateImages;


var AnimateImage = AnimateImages.AnimateImage;
var KeyFrameImage = AnimateImages.KeyFrameImage;

var boundsWidth = 576,
    boundsHeight = 1024,
    baseWidth = boundsWidth,
    baseHeight = device.screen.height * (boundsWidth / device.screen.width),
    scale = device.screen.width / baseWidth,
    rightBoundary = baseWidth,
    leftBoundary = 0,
    vx = 0;

// Preload assets first
loader.preload(['resources/images', 'resources/sounds'], function () {
	console.log("Preload complete!");
});

var GEM_COUNT = 5;
var GEM_SIZE = 65;
var COLUMN = 8;
var ROW = 8;
var TOTAL_CELLS = COLUMN * ROW;
var START_X = 17;
var START_Y = 313;
var SPACING = 3;
var ROUND_TIME = 10 * 1000;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		this.view.style.scale = scale;
		
		this.gemImages = 	[SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_01.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_02.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_03.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_04.png"),
							 SpriteInfo.findImageByName("mainSpriteInfo", "icon_block_05.png")]
		
		
		this.gemData = new Array(16);
						
		this.gemImageViews = new Array(16);
		
		this.imgBgView = new ImageView({
			superview: this.view,
			width: boundsWidth,
			height: boundsHeight,
			image : "resources/images/bkgd_table.png"
		});
		
		this.timerAnimateImage = new AnimateImage({
			superview : this.imgBgView,
			x: 200,
			y: 0,
			fps : (1000 / ROUND_TIME) * 14,
			images:  [
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0001.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0002.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0003.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0004.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0005.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0006.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0007.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0008.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0009.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0010.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0011.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0012.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0013.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "time_icon_0014.png")
					]
		});
		
		this.timerAnimateImage.play(false);
		this.timerAnimateImage.on("complete", function() {
			console.log("Timeout dude!");
		});
		
		var fairyBlink = [];
		var fairyIdle = [];
		var fairyPowerStart = [];
		var fairyPowerEnd = [];
		for (var counter = 0; counter < 35; counter++) {
			fairyBlink.push(SpriteInfo.findImageByName("mainSpriteInfo", "mermaid_blink_00" + ("0" + (counter + 1)).slice(-2) + ".png"));
			
			fairyIdle.push(SpriteInfo.findImageByName("mainSpriteInfo", "mermaid_idle_00" + ("0" + (counter + 1)).slice(-2) + ".png"));
			
			if (counter < 10) {
				fairyPowerEnd.push(SpriteInfo.findImageByName("mainSpriteInfo", "mermaid_powerend_00" + ("0" + (counter + 1)).slice(-2) + ".png"));
			}
				
			if (counter < 12) {
				fairyPowerStart.push(SpriteInfo.findImageByName("mainSpriteInfo", "mermaid_powerstart_00" + ("0" + (counter + 1)).slice(-2) + ".png"));
			}
		}
		
		this.fairy = new KeyFrameImage(this.imgBgView, 12, 
			{ 
				"blink" : fairyBlink,
				"idle" : fairyIdle,
				"power_start" : fairyPowerStart,
				"power_end" : fairyPowerEnd
			}	
		);
		this.fairy.play("blink", true);
		var that = this;
		setTimeout(function() {
			that.fairy.play("idle", true);
		}, 5000);
		setTimeout(function() {
			that.fairy.play("power_start", true);
			that.fairy.on("complete", function() {
				that.fairy.on("complete", null);
				that.fairy.play("power_end", true);
			});
		}, 5000);
		
		
		this.shuffleData();
		
		this.initGemImageViews();
		
		this.syncGemImageViews();
	};
	
	this.shuffleData = function() {
		for (var counter = 0; counter < TOTAL_CELLS; counter++) {
			this.gemData[counter] = parseInt(Math.random() * GEM_COUNT);
		}
	};
	
	this.initGemImageViews = function() {
		var col = 0, row  = 0;
		for (var counter = 0; counter < TOTAL_CELLS; counter++) {
			col = parseInt(counter % COLUMN);
			row = parseInt(counter / ROW);
			
			console.log((START_X + (GEM_SIZE + SPACING) * col) + " " + START_Y + (GEM_SIZE + SPACING) * row);
			
			this.gemImageViews[counter] = new ImageView({
				superview: this.imgBgView,
				x: START_X + (GEM_SIZE + SPACING) * col,
				y: START_Y + (GEM_SIZE + SPACING) * row,
				width: GEM_SIZE,
				height: GEM_SIZE
			});	
		}
	}
	
	this.syncGemImageViews = function() {
		var value;
		for (var counter = 0; counter < TOTAL_CELLS; counter++) {
			value = this.gemData[counter];
			this.gemImageViews[counter].setImage(this.gemImages[value]);
		}
	}

	this.launchUI = function () {
	};
});
