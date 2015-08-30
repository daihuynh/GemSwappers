

// items: one-dimension array
var SwapLogic = function (items, rows, columns) {
	this._items = items;
	this._rows = rows;
	this._columns = columns;
	
	//
	// Find all gems that matched in line
	// Results: 
	//	[
	//		[{x, y},...] matched in line
	//	]
	this.findMatched = function () {
		var x = 0, y = 0;
		var currentItem;
		var matched = [];
		var matchedCount = 0;
		
		// Horizontal check
		while (y < this._rows) {
			while (x < this._columns) {
				currentItem = this._items[y * this._columns + x];
				matchedCount = 0;
				for (var i = x + 1; i < this._columns; i++) {
					if (this._items[y * this._columns + i] == currentItem) {
						matchedCount++;
					} else {
						break;
					}
				}
				
				if (matchedCount < 2) {
					x++;
				} else {
					var cellMatched = [];
					for	(var i = x; i <= x + matchedCount; i++) {
						cellMatched.push({x : i, y: y});
					}
					matched.push(cellMatched);
					x += matchedCount + 1;
				}
			}
			x = 0;
			y++;
		}
		
		while (x < this._columns) {
			while (y < this._rows) {
				currentItem = this._items[y * this._columns + x];
				matchedCount = 0;
				for (var i = y + 1; i < this._rows; i++) {
					if (this._items[i * this._columns + x] == currentItem) {
						matchedCount++;
					} else {
						break;
					}
				}
				
				if (matchedCount < 2) {
					y++;
				} else {
					var cellMatched = [];
					for	(var i = y; i <= y + matchedCount; i++) {
						cellMatched.push({x : x, y: i});
					}
					matched.push(cellMatched);
					y += matchedCount + 1;
				}
			}
			y = 0;
			x++;
		}
		
		return matched;
	}
	
	this.print = function () {
		var text = "";
		for (var row = 0; row < this._rows; row++) {
			text = "";
			for (var col = 0; col < this._columns; col++) {
				text += this._items[row * this._columns + col] + " ";
			}
			console.log(text);
		}
	}
	
	//
	// Use: check that game need reshuffle or not
	//
	this.hasAvailableMove = function() {
		for (var row = 0; row < this._rows; row ++) {
			for (var col = 0; col < this._columns; col++) {
				if (this.canMatchedAround(row, col)) return true;
			}
		}
		return false;
	}
	
	//
	// Try swap this cell to 4 neighbours: left, right, top, bottom
	// break when true immediately
	// Use: check whether game can have any moves 
	//
	// Result: true or false
	this.canMatchedAround = function (row, col) {
		// right
		if (col + 1 < this._columns) {
			if (this.trySwap(row, col, row, col + 1).length > 0) return true;
		}
		//left 
		if (col - 1 >= 0) {
			if (this.trySwap(row, col, row, col - 1).length > 0) return true;
		}
		// bottom
		if (row + 1 < this._rows) {
			if (this.trySwap(row + 1, col, row, col).length > 0) return true;
		}
		// top
		if (row - 1 >= 0) {
			if (this.trySwap(row - 1, col, row, col).length > 0) return true;
		}
		
		return false;
	}
	
	//
	// Try swap 2 cell
	//
	// Return matched cells
	this.trySwap = function (startRow, startCol, destRow, destCol) {
		var clone = this._items.slice();
		
		var tmp = clone[startRow * this._columns + startCol];
		clone[startRow * this._columns + startCol] = clone[destRow * this._columns + destCol];
		clone[destRow * this._columns + destCol] = tmp;
		
		var row, col;
		var item;
		
		// Check start cell
		// Check horizontal
		row = startRow;
		col = 0;
		var startHorizontalMatched;
		while (col < this._columns) {
			item = clone[row * this._columns + col];
			startHorizontalMatched = [{x : col, y : row}];
			for (var i = col + 1; i < this._columns; i++) {
				if (clone[row * this._columns + i] == item) {
					startHorizontalMatched.push({x: i, y: row});
				} else {
					break;
				}
			}
			
			if (startHorizontalMatched.length >= 3) {
				break;
			} else {
				startHorizontalMatched = [];
			}
			
			col++;
		}
		
		// Check vertical
		row = 0;
		col = startCol;
		var startVerticalMatched;
		while (row < this._rows) {
			item = clone[row * this._columns + col];
			startVerticalMatched = [{x : col, y : row}];
			for (var i = row + 1; i < this._rows; i++) {
				if (clone[i * this._columns + col] == item) {
					startVerticalMatched.push({x: col, y: i});
				} else {
					break;
				}
			}
			
			if (startVerticalMatched.length >= 3) {
				break;
			} else {
				startVerticalMatched = [];
			}
			
			row++;
		}
		
		var startMatched = startHorizontalMatched.concat(startVerticalMatched);
		
		// Check dest cell
		// Check horizontal
		row = destRow;
		col = 0;
		var destHorizontalMatched;
		while (col < this._columns) {
			item = clone[row * this._columns + col];
			destHorizontalMatched = [{x : col, y : row}];
			for (var i = col + 1; i < this._columns; i++) {
				if (clone[row * this._columns + i] == item) {
					destHorizontalMatched.push({x: i, y: row});
				} else {
					break;
				}
			}
			
			if (destHorizontalMatched.length >= 3) {
				break;
			} else {
				destHorizontalMatched = [];
			}
			
			col++;
		}
		
		// Check vertical
		row = 0;
		col = destCol;
		var destVerticalMatched;
		while (row < this._rows) {
			item = clone[row * this._columns + col];
			destVerticalMatched = [{x : col, y : row}];
			for (var i = row + 1; i < this._rows; i++) {
				if (clone[i * this._columns + col] == item) {
					destVerticalMatched.push({x: col, y: i});
				} else {
					break;
				}
			}
			
			if (destVerticalMatched.length >= 3) {
				break;
			} else {
				destVerticalMatched = [];
			}
			
			row++;
		}
		
		var destMatched = destHorizontalMatched.concat(destVerticalMatched);
		
		var matched = [];
		if (startMatched.length > 0) {
			matched.push(startMatched);
		}
		if (destMatched.length > 0) {
			matched.push(destMatched);
		}
		
		return matched;
	}
	
	this.giveSuggestion = function () {
		var suggestion = [];
		
		for (var row = 0; row < this._rows; row ++) {
			for (var col = 0; col < this._columns; col++) {
				// right
				if (col + 1 < this._columns) {
					suggestion = this.trySwap(row, col, row, col + 1);
					if (suggestion.length > 0) {
						for (var groupCounter = 0; groupCounter < suggestion.length; groupCounter++) {
							for (var i = 0; i < suggestion[groupCounter].length; i++) {
								if (suggestion[groupCounter][i].x == col && suggestion[groupCounter][i].y == row) {
									suggestion[groupCounter][i].x = col + 1;
									break;
								} else if (suggestion[groupCounter][i].x == col + 1 && suggestion[groupCounter][i].y == row) {
									suggestion[groupCounter][i].x = col;
									break;
								}
							}
						}
						return suggestion;
					}
				}
				//left 
				if (col - 1 >= 0) {
					suggestion = this.trySwap(row, col, row, col - 1);
					if (suggestion.length > 0) {
						for (var groupCounter = 0; groupCounter < suggestion.length; groupCounter++) {
							for (var i = 0; i < suggestion[groupCounter].length; i++) {
								if (suggestion[groupCounter][i].x == col && suggestion[groupCounter][i].y == row) {
									suggestion[groupCounter][i].x = col - 1;
									break;
								} else if (suggestion[groupCounter][i].x == col - 1 && suggestion[groupCounter][i].y == row) {
									suggestion[groupCounter][i].x = col;
									break;
								}
							}
						}
						return suggestion;
					}
				}
				// bottom
				if (row + 1 < this._rows) {
					suggestion = this.trySwap(row + 1, col, row, col);
					if (suggestion.length > 0) {
						for (var groupCounter = 0; groupCounter < suggestion.length; groupCounter++) {
							for (var i = 0; i < suggestion[groupCounter].length; i++) {
								if (suggestion[groupCounter][i].x == col && suggestion[groupCounter][i].y == row) {
									suggestion[groupCounter][i].y = row + 1;
									break;
								} else if (suggestion[groupCounter][i].x == col && suggestion[groupCounter][i].y == row + 1) {
									suggestion[groupCounter][i].y = row;
									break;
								}
							}
						}
						return suggestion;
					}
				}
				// top
				if (row - 1 >= 0) {
					suggestion = this.trySwap(row - 1, col, row, col);
					if (suggestion.length > 0) {
						for (var groupCounter = 0; groupCounter < suggestion.length; groupCounter++) {
							for (var i = 0; i < suggestion[groupCounter].length; i++) {
								if (suggestion[groupCounter][i].x == col && suggestion[groupCounter][i].y == row) {
									suggestion[groupCounter][i].y = row - 1;
									break;
								} else if (suggestion[groupCounter][i].x == col && suggestion[groupCounter][i].y == row - 1) {
									suggestion[groupCounter][i].y = row;
									break;
								}
							}
						}
						return suggestion;
					}
				}
			}
		}
		return suggestion;
	}
	
	//
	// Check matched from left to right
	//
	// Return array
	this.checkMatchedRight = function(items, currentRow, currentCol) {
		
		var matchedCells = [];
		
		var item = items[currentRow * this._columns + currentCol];
		
		// To right
		for	(var col = currentCol + 1; col < this._columns; col++) {
			if (items[currentRow * this._columns + col] == item) {
				matchedCells.push({x: col, y: currentRow});
			} else {
				break;
			}
		}
		
		if (matchedCells.length > 1) {
			return matchedCells;
		}
		
		return [];
	}
	
	
	//
	// Check matched from right to left
	//
	// Return array
	this.checkMatchedLeft = function(items, currentRow, currentCol) {
		
		var matchedCells = [];
		
		var item = items[currentRow * this._columns + currentCol];
		
		// To right
		for	(var col = currentRow - 1; col >= 0; col--) {
			if (items[currentRow * this._columns + col] == item) {
				matchedCells.push({x: col, y: currentRow});
			} else {
				break;
			}
		}
		
		if (matchedCells.length > 1) {
			return matchedCells;
		}
		
		return [];
	}
	
	//
	// Check matched from top to bottom
	//
	// Return array
	this.checkMatchedBottom = function(items, currentRow, currentCol) {
		var matchedCells = [];
		
		var item = items[currentRow * this._columns + currentCol];
		
		// To right
		for	(var row = currentRow + 1; row < this._rows; row++) {
			if (items[row * this._columns + currentCol] == item) {
				matchedCells.push({x: currentCol, y: row});
			} else {
				break;
			}
		}
		
		if (matchedCells.length > 1) {
			return matchedCells;
		}
		
		return [];
	}
	
	
	//
	// Check matched from bottom to top
	//
	// Return array
	this.checkMatchedTop = function(items, currentRow, currentCol) {
		
		var matchedCells = [];
		
		var item = items[currentRow * this._columns + currentCol];
		
		// To right
		for	(var row = currentRow - 1; row >= 0; row--) {
			if (items[row * this._columns + currentCol] == item) {
				matchedCells.push({x: currentCol, y: row});
			} else {
				break;
			}
		}
		
		if (matchedCells.length > 1) {
			return matchedCells;
		}
		
		return [];
	}
	
	this.countEmptyRowAtCol = function (col) {
		var count = 0;
		for (var i = 0; i < this._rows; i++) {
			if (this._items[i * this._columns + col] == -1) {
				count++;
			}
		}
		return count;
	}
}

exports = SwapLogic;