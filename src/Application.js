import device;
import animate;
import ui.resource.loader as loader;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import ui.ScoreView as ScoreView;
import ui.widget.ButtonView as ButtonView;
import ui.resource.Image as Image;
import src.SpriteInfo as SpriteInfo;
import src.AnimateImages as AnimateImages;
import src.Logic.SwapLogic as SwapLogic;
import src.GameObjects.Gem as Gem;
import src.Configs.GameConfig as GameConfig;
import event.input.drag as drag;


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
		
		this._gemData = new Array(16);
		
		this._swapLogic = new SwapLogic(this._gemData, ROW, COLUMN);
						
		this._idleTime = 0;
						
		this._gems = new Array(16);
		
		this.imgBgView = new ImageView({
			superview: this.view,
			width: boundsWidth,
			height: boundsHeight,
			image : "resources/images/bkgd_table.png"
		});
		
		
		this.imgScoreBoard = SpriteInfo.getImageViewByName(this.imgBgView, "mainSpriteInfo", "header_score_small.png");
		this.imgScoreBoard.updateOpts({
			x: boundsWidth / 2 - this.imgScoreBoard.getImage().getSourceW() / 2,
			y: boundsHeight - 160,
		});
		
		//this.initScoreView();
		
		this.timerAnimateImage = new AnimateImage({
			superview : this.imgBgView,
			x: 200,
			y: 0,
			isResetSize : true,
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
		
		this.initButtons();
		
		this.shuffleData();
		
		this._swapLogic.print();
		
		this.init_gems();
		
		this.suggest();
		
		this.sync_gems();
	};
	
	this.initScoreView = function() {
		this.scoreView = new ScoreView({
			superview: this.view,
			x: 20,
			y: 70,
			width: 70,
			height: 35,
			blockEvents: true,
			characterData: {
				"0": { "image": "resources/images/numbers/score_0.png"},
				"1": { "image": "resources/images/numbers/score_1.png"},
				"2": { "image": "resources/images/numbers/score_2.png"},
				"3": { "image": "resources/images/numbers/score_3.png"},
				"4": { "image": "resources/images/numbers/score_4.png"},
				"5": { "image": "resources/images/numbers/score_5.png"},
				"6": { "image": "resources/images/numbers/score_6.png"},
				"7": { "image": "resources/images/numbers/score_7.png"},
				"8": { "image": "resources/images/numbers/score_8.png"},
				"8": { "image": "resources/images/numbers/score_9.png"},
				"9": { "image": "resources/images/numbers/score_comma.png"}
			},
			text: "123123"
		});
	}
	
	this.initButtons = function() {
		this.btnPause = new ButtonView({
			superview: this.imgBgView,
			x: 1,
			y: 1,
			images: {
				up: "resources/images/button_pause.png",
				down: "resources/images/button_pause_pressed.png"
			},
			on: {
				up: function() {
					
				}
			}
		});
	}
	
	this.initFairy = function () {
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
		
		this.fairy = new KeyFrameImage({
			superview : this.imgBgView,
			fps: 12,
			keyFrames :
				{ 
					"blink" : fairyBlink,
					"idle" : fairyIdle,
					"power_start" : fairyPowerStart,
					"power_end" : fairyPowerEnd
				}
		});
		this.fairy.play("blink", true);
		var that = this;
		setTimeout(function() {
			that.fairy.play("idle", true);
		}, 5000);
		setTimeout(function() {
			that.fairy.play("power_start", true);
			that.fairy.on("complete", function() {
				that.fairy.on("complete", function(){});
				that.fairy.play("power_end", true);
			});
		}, 5000);
	}
	
	this.shuffleData = function() {
		do {
			for (var counter = 0; counter < TOTAL_CELLS; counter++) {
				this._gemData[counter] = parseInt(Math.random() * GEM_COUNT);
			}
		} while (this._swapLogic.findMatched().length > 0 || !this._swapLogic.hasAvailableMove());
	};
	
	this.init_gems = function() {
		var col = 0, row  = 0;
		for (var counter = 0; counter < TOTAL_CELLS; counter++) {
			col = parseInt(counter % COLUMN);
			row = parseInt(counter / ROW);
			
			var gem = new Gem({
				superview: this.imgBgView,
				x: START_X + (GameConfig["gem_size"] + SPACING) * col,
				y: START_Y + (GameConfig["gem_size"] + SPACING) * row,
				width: GameConfig["gem_size"],
				height: GameConfig["gem_size"]
			});
			this._gems[counter] = gem;
			
			this.initGemInput(gem);
		}
	}
	
	this.initGemInput = function (gem) {
		var that = this;
		gem.on("InputSelect", function () {
			if (that.lastSelectedGemView != gem){
				if (that.lastSelectedGemView) {
					that.lastSelectedGemView.stopShine();
					
					var startIndex = that._gems.indexOf(that.lastSelectedGemView);
					var destIndex = that._gems.indexOf(gem);
					
					// Make sure they are neighbour
					if (Math.abs(startIndex - destIndex) == 1 || Math.abs(startIndex - destIndex) == COLUMN) {
						// Check matched with last selected gem
						
						var startX = that.lastSelectedGemView.style.x;
						var startY = that.lastSelectedGemView.style.y;
						var destX = gem.style.x;
						var destY = gem.style.y;
						
						
						var startRow = parseInt(startIndex / COLUMN);
						var startCol = parseInt(startIndex % COLUMN);
						var destRow = parseInt(destIndex / COLUMN);
						var destCol = parseInt(destIndex % COLUMN);
						
						// try swap and see can match or not
						var matched = that._swapLogic.trySwap(startRow, startCol, destRow, destCol);
						
						animate(gem).now({
							x : startX,
							y : startY
						}, 500).then(function () {
							// Match
							if (matched.length > 0) {
								
								// swap data
								var tmp = that._gemData[startIndex];
								that._gemData[startIndex] = that._gemData[destIndex];
								that._gemData[destIndex] = tmp;
								
								// swap gem
								tmp = that._gems[startIndex];
								that._gems[startIndex] = that._gems[destIndex];
								that._gems[destIndex] = tmp;
								
								that.handleMatched(matched);
							} else {
								animate(gem).now({
									x: destX,
									y: destY,
								}, 500);
							}
						});
						
						var lastSelectedGem = that.lastSelectedGemView;
						
						animate(lastSelectedGem).now({
							x : destX,
							y: destY
						}, 500).then(function () {
							if (matched.length == 0) {
								animate(lastSelectedGem).now({
									x: startX,
									y: startY,
								}, 500);
							}
						});
						
						that.lastSelectedGemView = null;
					} else {
						that.lastSelectedGemView = gem;
						gem.shine();
					}
				} else {				
					that.lastSelectedGemView = gem;
					gem.shine();
				}
			}
		});	
	}
	
	this.handleMatched = function (matched) {
		for	(var groupCounter = 0; groupCounter < matched.length; groupCounter++)  {
			for	(var i = 0; i < matched[groupCounter].length; i++) {
				// Destroy matched gems
				this._gems[matched[groupCounter][i].y * COLUMN + matched[groupCounter][i].x].blast();
				// Even clear data
				this._gemData[matched[groupCounter][i].y * COLUMN + matched[groupCounter][i].x] = -1;
			}
		}
		
		var that = this;
		animate(this.view)
			.wait(500).then(function () {
				that.handleDropDown();
				that.generateNewGems();
			})
			.wait(500).then(function () {
				var matchedAfterGenerate = that._swapLogic.findMatched();
				if (matchedAfterGenerate.length > 0) {
					that.handleMatched(matchedAfterGenerate);
				}
			}); 
	}
	
	this.handleDropDown = function () {
		var tmp;
		for (var col = 0; col < COLUMN; col ++) {
			for (var row = ROW - 1; row >= 0; row--) {
				// Empty cell data
				if (this._gemData[row * COLUMN + col] == -1) {
					for (var i = row - 1; i >= 0; i--) {
						if (this._gemData[i * COLUMN + col] > -1) {
							// Swap data first
							tmp = this._gemData[i * COLUMN + col];
							this._gemData[i * COLUMN + col] = this._gemData[row * COLUMN + col];
							this._gemData[row * COLUMN + col] = tmp;
							
							// Animate
							animate(this._gems[i * COLUMN + col]).now({
								x: START_X + (GameConfig["gem_size"] + SPACING) * col,
								y: START_Y + (GameConfig["gem_size"] + SPACING) * row, 
							}, 500);
							
							// Swap gem
							tmp = this._gems[i * COLUMN + col];
							this._gems[i * COLUMN + col] = this._gems[row * COLUMN + col];
							this._gems[row * COLUMN + col] = tmp;
							
							break;
						}
					}
				}
			}
		}
	}
	
	this.generateNewGems = function () {
		var that = this;
		var emptyCount;
		for (var col = 0; col < COLUMN; col ++) {
			emptyCount = this._swapLogic.countEmptyRowAtCol(col);
			for (var row = ROW - 1; row >= 0; row--) {
				// Empty cell data
				if (this._gemData[row * COLUMN + col] == -1) {
					// Generate data
					var value = parseInt(Math.random() * GEM_COUNT);
					this._gemData[row * COLUMN + col] = value;
					
					var gem = new Gem({
						superview: this.imgBgView,
						x: START_X + (GameConfig["gem_size"] + SPACING) * col,
						y: START_Y + (GameConfig["gem_size"] + SPACING) * (row - emptyCount),
						width: GameConfig["gem_size"],
						height: GameConfig["gem_size"]
					});
					this._gems[row * COLUMN + col] = gem;
					this._gems[row * COLUMN + col].showType(value);
					this.initGemInput(gem);
					
					animate(gem).then({
						x: START_X + (GameConfig["gem_size"] + SPACING) * col,
						y: START_Y + (GameConfig["gem_size"] + SPACING) * row,
					}, 500);
				}
			}
		}
	}
	
	this.sync_gems = function() {
		var value;
		for (var counter = 0; counter < TOTAL_CELLS; counter++) {
			value = this._gemData[counter];
			this._gems[counter].showType(value);
		}
	}
	
	
	this.suggest = function () {
		this._suggestion = this._swapLogic.giveSuggestion();
		if (this._suggestion.length > 0) {
			for (var i = 0; i < this._suggestion[0].length; i++) {
				this._gems[this._suggestion[0][i].y * COLUMN + this._suggestion[0][i].x].shine();
			}
		}
	}

	this.launchUI = function () {
	};
	
	this.tick = function (dt) {
	}
});
