import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import animate;

var resourcePath = "resources/images/";

exports.findSpriteInfoByName = function(spriteSheetName, name) {
	var sprites = exports[spriteSheetName]["frames"];
	var result = sprites.filter(function(s) {
		return s.filename == name;
	});
	return result.length > 0 ? result[0] : null;
}

exports.findImageByName = function(spriteSheetName, name) {
	var spriteInfo = exports.findSpriteInfoByName(spriteSheetName, name);
	if (spriteInfo == null) return null;
	
	var image = new Image({
					url: resourcePath + exports[spriteSheetName]["meta"]["image"],
					sourceW: spriteInfo.rotated ? spriteInfo.frame.h : spriteInfo.frame.w,
					sourceH: spriteInfo.rotated ? spriteInfo.frame.w : spriteInfo.frame.h,
					sourceX: spriteInfo.frame.x,
					sourceY: spriteInfo.frame.y
				});
			
	return image;
}

exports.createImageBySpriteInfo = function(spriteSheetName, spriteInfo) {
	var image = new Image({
					url: resourcePath + exports[spriteSheetName]["meta"]["image"],
					sourceW: spriteInfo.rotated ? spriteInfo.frame.h : spriteInfo.frame.w,
					sourceH: spriteInfo.rotated ? spriteInfo.frame.w : spriteInfo.frame.h,
					sourceX: spriteInfo.frame.x,
					sourceY: spriteInfo.frame.y
				});
				
	return image;
}

exports.getImageViewByName = function(view, spriteSheetName, name) {
	var spriteInfo = exports.findSpriteInfoByName(spriteSheetName, name);
	if (spriteInfo == null) return null;
	
	var img = exports.createImageBySpriteInfo(spriteSheetName, spriteInfo);
	
	var imageView = new ImageView({
				superview: view,
				width: img.getSourceW(),
				height: img.getSourceH(),
				image: img
			});	
			
	return imageView;
}

exports.mainSpriteInfo = {
    "frames": [
        {
            "filename": "1.png",
            "frame": { "x": 1988, "y": 1428, "w": 52, "h": 177 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 52, "h": 177 },
            "sourceSize": { "w": 52, "h": 177 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "2.png",
            "frame": { "x": 1823, "y": 705, "w": 113, "h": 181 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 113, "h": 181 },
            "sourceSize": { "w": 113, "h": 181 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "3.png",
            "frame": { "x": 1772, "y": 530, "w": 122, "h": 173 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 122, "h": 173 },
            "sourceSize": { "w": 122, "h": 173 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "block_03_pop_0001.png",
            "frame": { "x": 1628, "y": 1690, "w": 53, "h": 53 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 37, "y": 37, "w": 53, "h": 53 },
            "sourceSize": { "w": 128, "h": 128 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "block_03_pop_0002.png",
            "frame": { "x": 1144, "y": 1623, "w": 120, "h": 120 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 4, "y": 4, "w": 120, "h": 120 },
            "sourceSize": { "w": 128, "h": 128 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "block_03_pop_0003.png",
            "frame": { "x": 1828, "y": 888, "w": 128, "h": 128 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 128, "h": 128 },
            "sourceSize": { "w": 128, "h": 128 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb.png",
            "frame": { "x": 1266, "y": 1618, "w": 78, "h": 89 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 78, "h": 89 },
            "sourceSize": { "w": 78, "h": 89 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0001.png",
            "frame": { "x": 1938, "y": 701, "w": 61, "h": 61 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 9, "y": 9, "w": 61, "h": 61 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0002.png",
            "frame": { "x": 1980, "y": 1145, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 8, "y": 8, "w": 63, "h": 63 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0003.png",
            "frame": { "x": 1660, "y": 1615, "w": 69, "h": 69 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 5, "y": 5, "w": 69, "h": 69 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0004.png",
            "frame": { "x": 1427, "y": 1618, "w": 77, "h": 77 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 1, "w": 77, "h": 77 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0005.png",
            "frame": { "x": 1346, "y": 1618, "w": 79, "h": 79 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 79 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0006.png",
            "frame": { "x": 1506, "y": 1618, "w": 77, "h": 77 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 1, "w": 77, "h": 77 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0007.png",
            "frame": { "x": 1585, "y": 1615, "w": 73, "h": 73 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 3, "w": 73, "h": 73 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bomb_icon_0008.png",
            "frame": { "x": 1853, "y": 321, "w": 65, "h": 65 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 7, "y": 7, "w": 65, "h": 65 },
            "sourceSize": { "w": 79, "h": 79 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "bubble_icon_0001.png",
            "frame": { "x": 1958, "y": 926, "w": 52, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 52, "h": 52 },
            "sourceSize": { "w": 52, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "button_pause.png",
            "frame": { "x": 869, "y": 1625, "w": 95, "h": 94 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 2, "w": 95, "h": 94 },
            "sourceSize": { "w": 95, "h": 96 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "button_pause_pressed.png",
            "frame": { "x": 772, "y": 1647, "w": 95, "h": 96 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 95, "h": 96 },
            "sourceSize": { "w": 95, "h": 96 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "button_replay.png",
            "frame": { "x": 966, "y": 1624, "w": 87, "h": 88 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 87, "h": 88 },
            "sourceSize": { "w": 87, "h": 88 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "button_replay_pressed.png",
            "frame": { "x": 1055, "y": 1624, "w": 87, "h": 87 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 1, "w": 87, "h": 87 },
            "sourceSize": { "w": 87, "h": 88 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "check_icon.png",
            "frame": { "x": 1960, "y": 583, "w": 60, "h": 61 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 60, "h": 61 },
            "sourceSize": { "w": 62, "h": 65 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0001.png",
            "frame": { "x": 1783, "y": 348, "w": 68, "h": 68 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 1, "w": 68, "h": 68 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0002.png",
            "frame": { "x": 1731, "y": 1613, "w": 69, "h": 69 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 69, "h": 69 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0003.png",
            "frame": { "x": 1783, "y": 418, "w": 68, "h": 68 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 1, "w": 68, "h": 68 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0004.png",
            "frame": { "x": 1798, "y": 181, "w": 68, "h": 68 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 1, "w": 68, "h": 68 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0005.png",
            "frame": { "x": 1935, "y": 1657, "w": 69, "h": 69 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 69, "h": 69 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0006.png",
            "frame": { "x": 1798, "y": 251, "w": 68, "h": 68 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 1, "w": 68, "h": 68 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0007.png",
            "frame": { "x": 1838, "y": 1072, "w": 69, "h": 69 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 69, "h": 69 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0008.png",
            "frame": { "x": 1909, "y": 1072, "w": 69, "h": 68 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 1, "w": 69, "h": 68 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0009.png",
            "frame": { "x": 1909, "y": 1142, "w": 69, "h": 68 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 1, "w": 69, "h": 68 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "coin_icon_0010.png",
            "frame": { "x": 1838, "y": 1143, "w": 69, "h": 69 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 69, "h": 69 },
            "sourceSize": { "w": 69, "h": 69 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "colorbomb_icon.png",
            "frame": { "x": 1980, "y": 1072, "w": 60, "h": 71 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 60, "h": 71 },
            "sourceSize": { "w": 60, "h": 71 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "frame-coins.png",
            "frame": { "x": 336, "y": 1685, "w": 162, "h": 47 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 162, "h": 47 },
            "sourceSize": { "w": 162, "h": 47 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "frame_char.png",
            "frame": { "x": 1499, "y": 1697, "w": 81, "h": 42 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 81, "h": 42 },
            "sourceSize": { "w": 81, "h": 42 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "gameboard_glow.png",
            "frame": { "x": 2, "y": 2, "w": 572, "h": 573 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 572, "h": 573 },
            "sourceSize": { "w": 572, "h": 573 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "go.png",
            "frame": { "x": 2, "y": 577, "w": 250, "h": 183 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 250, "h": 183 },
            "sourceSize": { "w": 250, "h": 183 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "header_score_small.png",
            "frame": { "x": 500, "y": 1654, "w": 270, "h": 89 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 270, "h": 89 },
            "sourceSize": { "w": 270, "h": 89 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "icon_block_01.png",
            "frame": { "x": 1920, "y": 311, "w": 62, "h": 62 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 62, "h": 62 },
            "sourceSize": { "w": 62, "h": 62 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "icon_block_02.png",
            "frame": { "x": 1933, "y": 181, "w": 62, "h": 62 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 62, "h": 62 },
            "sourceSize": { "w": 62, "h": 62 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "icon_block_03.png",
            "frame": { "x": 1933, "y": 245, "w": 62, "h": 62 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 62, "h": 62 },
            "sourceSize": { "w": 62, "h": 62 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "icon_block_04.png",
            "frame": { "x": 1896, "y": 583, "w": 62, "h": 62 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 62, "h": 62 },
            "sourceSize": { "w": 62, "h": 62 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "icon_block_05.png",
            "frame": { "x": 1934, "y": 2, "w": 62, "h": 62 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 62, "h": 62 },
            "sourceSize": { "w": 62, "h": 62 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "icon_block_clear.png",
            "frame": { "x": 1934, "y": 66, "w": 62, "h": 62 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 62, "h": 62 },
            "sourceSize": { "w": 62, "h": 62 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0001.png",
            "frame": { "x": 1934, "y": 130, "w": 50, "h": 49 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 4, "w": 50, "h": 49 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0002.png",
            "frame": { "x": 1986, "y": 130, "w": 50, "h": 49 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 4, "w": 50, "h": 49 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0003.png",
            "frame": { "x": 1994, "y": 764, "w": 50, "h": 49 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 4, "w": 50, "h": 49 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0004.png",
            "frame": { "x": 1994, "y": 815, "w": 50, "h": 49 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 4, "w": 50, "h": 49 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0005.png",
            "frame": { "x": 1683, "y": 1686, "w": 57, "h": 57 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 57, "h": 57 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0006.png",
            "frame": { "x": 1742, "y": 1684, "w": 57, "h": 57 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 57, "h": 57 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0007.png",
            "frame": { "x": 1961, "y": 518, "w": 57, "h": 57 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 57, "h": 57 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_icon_0008.png",
            "frame": { "x": 1983, "y": 375, "w": 57, "h": 57 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 57, "h": 57 },
            "sourceSize": { "w": 57, "h": 57 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_power_0001.png",
            "frame": { "x": 2, "y": 762, "w": 79, "h": 569 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 569 },
            "sourceSize": { "w": 79, "h": 569 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_power_0002.png",
            "frame": { "x": 83, "y": 762, "w": 79, "h": 569 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 569 },
            "sourceSize": { "w": 79, "h": 569 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_power_0003.png",
            "frame": { "x": 164, "y": 762, "w": 79, "h": 569 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 569 },
            "sourceSize": { "w": 79, "h": 569 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_power_0004.png",
            "frame": { "x": 245, "y": 762, "w": 79, "h": 569 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 569 },
            "sourceSize": { "w": 79, "h": 569 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "lightning_power_glow.png",
            "frame": { "x": 1802, "y": 1613, "w": 131, "h": 130 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 131, "h": 130 },
            "sourceSize": { "w": 131, "h": 130 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0001.png",
            "frame": { "x": 1389, "y": 900, "w": 147, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0002.png",
            "frame": { "x": 1390, "y": 721, "w": 147, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0003.png",
            "frame": { "x": 1634, "y": 351, "w": 147, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0004.png",
            "frame": { "x": 1692, "y": 1435, "w": 147, "h": 176 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 176 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0005.png",
            "frame": { "x": 1635, "y": 2, "w": 148, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 12, "w": 148, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0006.png",
            "frame": { "x": 1238, "y": 1081, "w": 148, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 11, "w": 148, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0007.png",
            "frame": { "x": 1183, "y": 182, "w": 149, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0008.png",
            "frame": { "x": 1484, "y": 2, "w": 149, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0009.png",
            "frame": { "x": 880, "y": 362, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0010.png",
            "frame": { "x": 883, "y": 542, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0011.png",
            "frame": { "x": 880, "y": 183, "w": 150, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 9, "w": 150, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0012.png",
            "frame": { "x": 579, "y": 545, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0013.png",
            "frame": { "x": 633, "y": 725, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0014.png",
            "frame": { "x": 783, "y": 905, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0015.png",
            "frame": { "x": 783, "y": 1085, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0016.png",
            "frame": { "x": 788, "y": 1265, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0017.png",
            "frame": { "x": 793, "y": 1445, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0018.png",
            "frame": { "x": 326, "y": 1111, "w": 151, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 18, "y": 7, "w": 151, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0019.png",
            "frame": { "x": 728, "y": 2, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 18, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0020.png",
            "frame": { "x": 479, "y": 930, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 18, "y": 7, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0021.png",
            "frame": { "x": 940, "y": 1262, "w": 149, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 149, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0022.png",
            "frame": { "x": 481, "y": 742, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0023.png",
            "frame": { "x": 479, "y": 1111, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0024.png",
            "frame": { "x": 484, "y": 1292, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0025.png",
            "frame": { "x": 489, "y": 1473, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0026.png",
            "frame": { "x": 631, "y": 923, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0027.png",
            "frame": { "x": 1031, "y": 362, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0028.png",
            "frame": { "x": 1032, "y": 181, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0029.png",
            "frame": { "x": 937, "y": 722, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0030.png",
            "frame": { "x": 1034, "y": 542, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0031.png",
            "frame": { "x": 945, "y": 1443, "w": 149, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0032.png",
            "frame": { "x": 1182, "y": 361, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 11, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0033.png",
            "frame": { "x": 1096, "y": 1442, "w": 148, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 11, "w": 148, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0034.png",
            "frame": { "x": 1336, "y": 541, "w": 148, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 12, "w": 148, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_blink_0035.png",
            "frame": { "x": 1785, "y": 2, "w": 147, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0001.png",
            "frame": { "x": 1389, "y": 900, "w": 147, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0002.png",
            "frame": { "x": 1246, "y": 1439, "w": 147, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0003.png",
            "frame": { "x": 1392, "y": 1260, "w": 147, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0004.png",
            "frame": { "x": 1679, "y": 898, "w": 147, "h": 176 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 176 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0005.png",
            "frame": { "x": 1242, "y": 1260, "w": 148, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 12, "w": 148, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0006.png",
            "frame": { "x": 1388, "y": 1081, "w": 148, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 11, "w": 148, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0007.png",
            "frame": { "x": 1238, "y": 902, "w": 149, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0008.png",
            "frame": { "x": 1239, "y": 721, "w": 149, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0009.png",
            "frame": { "x": 1183, "y": 2, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0010.png",
            "frame": { "x": 1087, "y": 902, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0011.png",
            "frame": { "x": 1031, "y": 2, "w": 150, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 9, "w": 150, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0012.png",
            "frame": { "x": 728, "y": 182, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0013.png",
            "frame": { "x": 728, "y": 362, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0014.png",
            "frame": { "x": 731, "y": 542, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0015.png",
            "frame": { "x": 785, "y": 722, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0016.png",
            "frame": { "x": 935, "y": 902, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0017.png",
            "frame": { "x": 935, "y": 1082, "w": 150, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0018.png",
            "frame": { "x": 331, "y": 1325, "w": 151, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 18, "y": 7, "w": 151, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0019.png",
            "frame": { "x": 336, "y": 1505, "w": 151, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 18, "y": 7, "w": 151, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0020.png",
            "frame": { "x": 326, "y": 930, "w": 151, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 18, "y": 7, "w": 151, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0021.png",
            "frame": { "x": 631, "y": 1104, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0022.png",
            "frame": { "x": 636, "y": 1285, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0023.png",
            "frame": { "x": 641, "y": 1466, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 7, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0024.png",
            "frame": { "x": 576, "y": 2, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0025.png",
            "frame": { "x": 576, "y": 183, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0026.png",
            "frame": { "x": 576, "y": 364, "w": 150, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 19, "y": 8, "w": 150, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0027.png",
            "frame": { "x": 1088, "y": 722, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0028.png",
            "frame": { "x": 1185, "y": 541, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 9, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0029.png",
            "frame": { "x": 1333, "y": 361, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0030.png",
            "frame": { "x": 1087, "y": 1082, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0031.png",
            "frame": { "x": 880, "y": 2, "w": 149, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 10, "w": 149, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0032.png",
            "frame": { "x": 1091, "y": 1262, "w": 149, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 11, "w": 149, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0033.png",
            "frame": { "x": 1334, "y": 2, "w": 148, "h": 179 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 11, "w": 148, "h": 179 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0034.png",
            "frame": { "x": 1484, "y": 353, "w": 148, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 21, "y": 12, "w": 148, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_idle_0035.png",
            "frame": { "x": 1395, "y": 1439, "w": 147, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0001.png",
            "frame": { "x": 427, "y": 577, "w": 150, "h": 163 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 19, "w": 150, "h": 163 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0002.png",
            "frame": { "x": 1538, "y": 1089, "w": 150, "h": 164 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 21, "w": 150, "h": 164 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0003.png",
            "frame": { "x": 1646, "y": 181, "w": 150, "h": 165 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 22, "w": 150, "h": 165 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0004.png",
            "frame": { "x": 1491, "y": 181, "w": 153, "h": 168 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 8, "y": 19, "w": 153, "h": 168 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0005.png",
            "frame": { "x": 1837, "y": 1255, "w": 151, "h": 171 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 16, "y": 16, "w": 151, "h": 171 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0006.png",
            "frame": { "x": 1841, "y": 1428, "w": 145, "h": 174 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 24, "y": 13, "w": 145, "h": 174 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0007.png",
            "frame": { "x": 1690, "y": 1076, "w": 146, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 23, "y": 13, "w": 146, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0008.png",
            "frame": { "x": 1541, "y": 1255, "w": 146, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 23, "y": 13, "w": 146, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0009.png",
            "frame": { "x": 1544, "y": 1435, "w": 146, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 23, "y": 13, "w": 146, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerend_0010.png",
            "frame": { "x": 1689, "y": 1255, "w": 146, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 23, "y": 13, "w": 146, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0001.png",
            "frame": { "x": 1486, "y": 533, "w": 147, "h": 178 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 22, "y": 13, "w": 147, "h": 178 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0002.png",
            "frame": { "x": 172, "y": 1333, "w": 157, "h": 185 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 15, "y": 15, "w": 157, "h": 185 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0003.png",
            "frame": { "x": 171, "y": 1530, "w": 163, "h": 190 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 12, "y": 15, "w": 163, "h": 190 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0004.png",
            "frame": { "x": 2, "y": 1530, "w": 167, "h": 193 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 9, "y": 15, "w": 167, "h": 193 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0005.png",
            "frame": { "x": 2, "y": 1333, "w": 168, "h": 195 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 9, "y": 15, "w": 168, "h": 195 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0006.png",
            "frame": { "x": 326, "y": 742, "w": 153, "h": 186 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 20, "y": 11, "w": 153, "h": 186 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0007.png",
            "frame": { "x": 1539, "y": 713, "w": 142, "h": 183 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 29, "y": 6, "w": 142, "h": 183 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0008.png",
            "frame": { "x": 1538, "y": 900, "w": 139, "h": 187 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 31, "y": 0, "w": 139, "h": 187 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0009.png",
            "frame": { "x": 1635, "y": 530, "w": 135, "h": 177 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 23, "y": 4, "w": 135, "h": 177 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0010.png",
            "frame": { "x": 1683, "y": 709, "w": 138, "h": 172 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 15, "y": 9, "w": 138, "h": 172 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0011.png",
            "frame": { "x": 1334, "y": 183, "w": 155, "h": 168 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 7, "y": 13, "w": 155, "h": 168 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0012.png",
            "frame": { "x": 254, "y": 577, "w": 171, "h": 163 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 18, "w": 171, "h": 163 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "mermaid_powerstart_0019.png",
            "frame": { "x": 1683, "y": 709, "w": 138, "h": 172 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 15, "y": 9, "w": 138, "h": 172 },
            "sourceSize": { "w": 177, "h": 210 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "move_icon.png",
            "frame": { "x": 1988, "y": 1607, "w": 47, "h": 48 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 47, "h": 48 },
            "sourceSize": { "w": 47, "h": 48 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "powermeter_empty.png",
            "frame": { "x": 1350, "y": 1699, "w": 147, "h": 41 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 1, "w": 147, "h": 41 },
            "sourceSize": { "w": 147, "h": 42 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "powermeter_full.png",
            "frame": { "x": 2, "y": 1725, "w": 97, "h": 15 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 97, "h": 15 },
            "sourceSize": { "w": 97, "h": 15 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "shine_icon_0001.png",
            "frame": { "x": 121, "y": 1725, "w": 15, "h": 17 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 36, "y": 34, "w": 15, "h": 17 },
            "sourceSize": { "w": 51, "h": 51 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "shine_icon_0002.png",
            "frame": { "x": 326, "y": 1291, "w": 28, "h": 32 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 23, "y": 19, "w": 28, "h": 32 },
            "sourceSize": { "w": 51, "h": 51 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "shine_icon_0003.png",
            "frame": { "x": 1935, "y": 1604, "w": 51, "h": 51 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 51, "h": 51 },
            "sourceSize": { "w": 51, "h": 51 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "shine_icon_0004.png",
            "frame": { "x": 1582, "y": 1697, "w": 44, "h": 42 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 2, "w": 44, "h": 42 },
            "sourceSize": { "w": 51, "h": 51 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "shine_icon_0005.png",
            "frame": { "x": 101, "y": 1725, "w": 18, "h": 17 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 2, "w": 18, "h": 17 },
            "sourceSize": { "w": 51, "h": 51 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "shine_icon_0006.png",
            "frame": { "x": 138, "y": 1725, "w": 5, "h": 5 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 5, "h": 5 },
            "sourceSize": { "w": 51, "h": 51 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparkly.png",
            "frame": { "x": 1868, "y": 181, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparklyBlue.png",
            "frame": { "x": 1868, "y": 246, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparklyGreen.png",
            "frame": { "x": 1853, "y": 388, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparklyOrange.png",
            "frame": { "x": 1853, "y": 453, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparklyPink.png",
            "frame": { "x": 1896, "y": 518, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparklyRed.png",
            "frame": { "x": 1918, "y": 388, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "sparklyWhite.png",
            "frame": { "x": 1918, "y": 453, "w": 63, "h": 63 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 63, "h": 63 },
            "sourceSize": { "w": 63, "h": 63 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0001.png",
            "frame": { "x": 1828, "y": 1018, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0002.png",
            "frame": { "x": 1884, "y": 1018, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0003.png",
            "frame": { "x": 1940, "y": 1018, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0004.png",
            "frame": { "x": 1990, "y": 1210, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0005.png",
            "frame": { "x": 1990, "y": 1264, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0006.png",
            "frame": { "x": 1990, "y": 1318, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0007.png",
            "frame": { "x": 1990, "y": 1372, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0008.png",
            "frame": { "x": 1896, "y": 647, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0009.png",
            "frame": { "x": 1952, "y": 647, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0010.png",
            "frame": { "x": 1984, "y": 309, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0011.png",
            "frame": { "x": 1983, "y": 434, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0012.png",
            "frame": { "x": 1938, "y": 764, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0013.png",
            "frame": { "x": 1938, "y": 818, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "time_icon_0014.png",
            "frame": { "x": 1958, "y": 872, "w": 54, "h": 52 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 54, "h": 52 },
            "sourceSize": { "w": 54, "h": 52 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_0.png",
            "frame": { "x": 1266, "y": 1709, "w": 20, "h": 33 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 20, "h": 33 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_1.png",
            "frame": { "x": 439, "y": 1291, "w": 12, "h": 32 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 6, "y": 2, "w": 12, "h": 32 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_2.png",
            "frame": { "x": 399, "y": 1291, "w": 18, "h": 32 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 2, "w": 18, "h": 32 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_3.png",
            "frame": { "x": 1330, "y": 1709, "w": 18, "h": 33 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 2, "w": 18, "h": 33 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_4.png",
            "frame": { "x": 356, "y": 1291, "w": 20, "h": 32 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 20, "h": 32 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_5.png",
            "frame": { "x": 419, "y": 1291, "w": 18, "h": 32 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 3, "w": 18, "h": 32 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_6.png",
            "frame": { "x": 1288, "y": 1709, "w": 19, "h": 33 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 19, "h": 33 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_7.png",
            "frame": { "x": 378, "y": 1291, "w": 19, "h": 32 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 19, "h": 32 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_8.png",
            "frame": { "x": 2006, "y": 1657, "w": 18, "h": 33 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 2, "w": 18, "h": 33 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "timer_9.png",
            "frame": { "x": 1309, "y": 1709, "w": 19, "h": 33 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 2, "w": 19, "h": 33 },
            "sourceSize": { "w": 24, "h": 36 },
            "pivot": { "x": 0.5, "y": 0.5 }
        }
    ],
    "meta": {
        "app": "http://www.codeandweb.com/texturepacker",
        "version": "1.0",
        "image": "main.png",
        "format": "RGBA8888",
        "size": { "w": 2046, "h": 1745 },
        "scale": "1",
        "smartupdate": "$TexturePacker:SmartUpdate:db02640cce66a04aa3e3a2b87f597215:4a5c78746b7aaf63a52e6e2ed870a9be:03f91ab73e0f4667800419161e658c40$"
    }
}
