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
import AudioManager;
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
var MAX_POWER = 30;
var SUGGESTION_TIME = 3000; // seconds

exports = Class(GC.Application, function () {

	this._isStartGame = false;
	this._suggestionEllapsedTime = 0;
	this._isShowSuggestion = false;
	this._isBombExplode = false;

	this._sound = new AudioManager({
		path: "resources/sounds/music/",
		files: {
			bg: {
				volume: 1.0,
				loop: true,
				background: true
			}
		}
	});
	this._sound.play("bg", {loop: true});
	
	this._sfx = new AudioManager({
		path: "resources/sounds/effect/",
		files: {
			swap_fail: {},
			swap_ok: {},
			count:{},
			go: {},
			bomb_sound1:{},
			combo_sound1:{},
			combo_sound2:{},
			combo_sound3:{},
			combo_sound4:{},
			combo_sound5:{},
			combo_sound6:{},
			combo_sound7:{},
			combo_sound8:{},
			combo_sound9:{},
			combo_sound10:{},
			combo_sound11:{},
			combo_sound12:{}
		}
	});
		
	
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
		
		this.imgBgOverlayView = new ImageView({
			superview: this.view,
			width: boundsWidth,
			height: boundsHeight,
			zIndex: 10000,
			canHandleEvents : false,
			image : "resources/images/bkgd_table_overlay.png"
		});
		
		this.imgScoreBoard = SpriteInfo.getImageViewByName(this.imgBgOverlayView, "mainSpriteInfo", "header_score_small.png");
		this.imgScoreBoard.updateOpts({
			x: boundsWidth / 2 - this.imgScoreBoard.getImage().getSourceW() / 2,
			y: boundsHeight - 160,
		});
		
		//this.initScoreView();
		
		this.initButtons();
		
		this.initFairy();
		
		this.initObjectives();
		
		this.initToolBar();
		
		this.shuffleData();
		
		this._swapLogic.print();
		
		this.init_gems();
		
		this.sync_gems();
		
		
		this.initCountDown();
		
		var that = this;
		this._sfx.play("count");
		setTimeout(function() {
			that._sfx.play("count");
		}, 1000);
		setTimeout(function() {
			that._sfx.play("count");
		}, 2000);
		setTimeout(function() {
			that._sfx.play("go");
		}, 3000);
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
		
		this._fairy = new KeyFrameImage({
			superview : this.imgBgOverlayView,
			fps: 12,
			x: 50,
			y: 80,
			keyFrames :
				{ 
					"blink" : fairyBlink,
					"idle" : fairyIdle,
					"power_start" : fairyPowerStart,
					"power_end" : fairyPowerEnd
				}
		});
		this._fairy.play("idle", true);
		/*var that = this;
		setTimeout(function() {
			that.fairy.play("idle", true);
		}, 5000);
		setTimeout(function() {
			that.fairy.play("power_start", true);
			that.fairy.on("complete", function() {
				that.fairy.on("complete", function(){});
				that.fairy.play("power_end", true);
			});
		}, 5000);*/
		
		var powerMeterBG = SpriteInfo.getImageViewByName(this.imgBgOverlayView, "mainSpriteInfo", "powermeter_empty.png");
		powerMeterBG.updateOpts({
			x: 20,
			y: 258
		});
		
		this._powerMeter = SpriteInfo.getImageViewByName(powerMeterBG, "mainSpriteInfo", "powermeter_full.png");
		this._powerMeter.updateOpts({
			x: 45,
			y: 24,
			width: 0,
		});
		
		var frame = SpriteInfo.getImageViewByName(powerMeterBG, "mainSpriteInfo", "frame_char.png");
		
		this._power = 0;
		
		this._bomb = SpriteInfo.getImageViewByName(this.imgBgOverlayView, "mainSpriteInfo", "bubble_icon_0001.png");
		this._bomb.updateOpts({
			x: 270,
			y: 100,
		});
		this._bomb.hide();
		
		this._glow = SpriteInfo.getImageViewByName(this.imgBgOverlayView, "mainSpriteInfo", "gameboard_glow.png");
		this._glow.updateOpts({
			x: 0,
			y: 295
		});
		this._glow.hide();
	}
	
	this.fairyThrowBomb = function () {
		var that = this;
		
		this._power = 0;
		this._isBombExplode = true;
		
		this._glow.show();
		
		this._fairy.play("power_start", false);
		this._fairy.once("complete", function () {
			that._fairy.play("power_end", true);
			that._bomb.show();
			animate(that._bomb).now({
				y : 600
			}, 2000).then(function () {
				that._sfx.play("bomb_sound1");
				
				that._power = 0;
				that._powerMeter.updateOpts({
					width: that._powerMeter.getImage().getSourceW() * that._power / MAX_POWER
				});
				
				that.explode();
				that._isBombExplode = false;
				
				that._fairy.stop();
				that._fairy.play("idle", true);
				that._glow.hide();
				
				that._bomb.updateOpts({
					x: 270,
					y: 100,
				});
				that._bomb.hide();
			});
		});
	}
	
	this.initObjectives = function () {
		this._coinAnim = new AnimateImage({
			superview : this.imgBgOverlayView,
			fps: 6,
			x: 60,
			y: boundsHeight - 75,
			isResetSize: true,
			images: [
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0001.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0002.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0003.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0004.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0005.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0006.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0007.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0008.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0009.png"),
				SpriteInfo.findImageByName("mainSpriteInfo", "coin_icon_0010.png")
			]
		});
		this._coinAnim.play(true);
		
		this._moveImageView = SpriteInfo.getImageViewByName(this.imgBgOverlayView, "mainSpriteInfo", "move_icon.png");
		this._moveImageView.updateOpts({
			x: 220,
			y: boundsHeight - 65
		});
		
		
		
		this._timerAnimateImage = new AnimateImage({
			superview : this.imgBgOverlayView,
			x: 400,
			y: boundsHeight - 70,
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
		
		this._timerAnimateImage.on("complete", function() {
			console.log("Timeout dude!");
		});
	}
	
	this.initCountDown = function () {
		var countDown = new AnimateImage({
			superview : this.imgBgOverlayView,
			canHandleEvents : false,
			x: boundsWidth / 2,
			y: 600,
			isResetSize : true,
			makeCenter: true,
			fps : 1,
			images:  [
						SpriteInfo.findImageByName("mainSpriteInfo", "1.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "2.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "3.png"),
						SpriteInfo.findImageByName("mainSpriteInfo", "go.png")
					]
		});
		
		var that = this;
		countDown.once("complete", function() {
			that._isStartGame = true;
			countDown.hide();
		});
		countDown.play(false);
	}
	
	this.initToolBar = function () {
		var frame = SpriteInfo.getImageViewByName(this.imgBgOverlayView, "mainSpriteInfo", "frame-coins.png");
		frame.updateOpts({
			x: boundsWidth - 162,
			y: 255
		});
		
		var colorBomb = SpriteInfo.getImageViewByName(frame, "mainSpriteInfo", "colorbomb_icon.png");
		colorBomb.updateOpts({
			x: 20,
			y: -20,
		});
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
			if (!that._isStartGame) return;
			
			if (that.lastSelectedGemView != gem){
				if (that.lastSelectedGemView) {
					that.lastSelectedGemView.stopShine();
					
					var startIndex = that._gems.indexOf(that.lastSelectedGemView);
					var destIndex = that._gems.indexOf(gem);
					
					// Make sure they are neighbour
					if (Math.abs(startIndex - destIndex) == 1 || Math.abs(startIndex - destIndex) == COLUMN) {
						
						that.hideAllSuggestion();
						
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
								that._sfx.play("swap_ok");
								
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
								that._sfx.play("swap_fail");
						
								animate(gem).now({
									x: destX,
									y: destY,
								}, 500);
								// Reset suggestion
								that._isShowSuggestion = false;
								that._suggestionEllapsedTime = 0;
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
	
	// When bomb drop
	this.explode = function() {
		var matched = [];
		for (var i = 0; i < TOTAL_CELLS; i++) {
			matched.push({x : parseInt(i % COLUMN), y: parseInt(i / COLUMN) });
		}
		this.handleMatched([matched]);
	}
	
	this.handleMatched = function (matched) {
		var that = this;
		
		this._fairy.play("blink", false);
		this._fairy.once("complete", function () {
			that._fairy.play("idle", true);
		});
		
		for	(var groupCounter = 0; groupCounter < matched.length; groupCounter++) {
			if (!this._isBombExplode) {
				this._power += matched[groupCounter].length - 2;
				if (this._power > MAX_POWER) {
					this._power = MAX_POWER;
				} 
				this._powerMeter.updateOpts({
					width: this._powerMeter.getImage().getSourceW() * this._power / MAX_POWER
				});
			}
			
			this._sfx.play("combo_sound" + (parseInt(groupCounter % 12) + 1));
			
			for	(var i = 0; i < matched[groupCounter].length; i++) {
				// Destroy matched gems
				this._gems[matched[groupCounter][i].y * COLUMN + matched[groupCounter][i].x].blast();
				// Even clear data
				this._gemData[matched[groupCounter][i].y * COLUMN + matched[groupCounter][i].x] = -1;
			}
		}
		
		if (this._power == MAX_POWER) {
			this._power = 0;
			this.fairyThrowBomb();
		}
		
		animate(this.view)
			.wait(500).then(function () {
				that.handleDropDown();
				that.generateNewGems();
			})
			.wait(500).then(function () {
				var matchedAfterGenerate = that._swapLogic.findMatched();
				if (matchedAfterGenerate.length > 0) {
					that.handleMatched(matchedAfterGenerate);
				} else {
					// Reset suggestion
					that._isShowSuggestion = false;
					that._suggestionEllapsedTime = 0;
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

	this.hideAllSuggestion = function () {
		for	(var i = 0; i < TOTAL_CELLS; i++) {
			this._gems[i].stopShine();
		}
	}
	
	this.tick = function (dt) {
		if (this._isStartGame) {
			this._suggestionEllapsedTime += dt;
			if (this._suggestionEllapsedTime >= SUGGESTION_TIME && !this._isShowSuggestion) {
				this._isShowSuggestion = true;
				this.suggest();
			}
		}
	}
});
