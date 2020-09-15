import EncounterTile from '../gameobjects/EncounterTile.js';

export default class Board extends Phaser.GameObjects.Group {
	constructor(scene, rows, cols, maxTileCount){
		super(scene);
		this.colCount = cols;
		this.rowCount = rows;
		this.maxTiles = maxTileCount;
		this.board = [];
		this.constructBoard();
	}

	updateMoveableTiles( player ) {
		this.children.iterate( function (child) {
			if (child.reachableByCharacter( player )) {
				child.input.cursor = 'pointer';
				if(child.encounter.encounterComplete) {
					child.tint = 0xFFFF00;
				} else {
					child.tint = 0x00FF00;
				}
			} else {
				child.input.cursor = 'default';
				if(child.encounter.encounterComplete) {
					child.tint = 0xFF0000;
				} else {
					child.clearTint();
				}
			}
		});
	}

	constructBoard() {
		var randRow = Math.floor(Math.random() * this.rowCount);
		var randCol = Math.floor(Math.random() * this.colCount);
		var firsttile = this.scene.add.existing(new EncounterTile(this.scene, randRow, randCol, 0)).setInteractive({ useHandCursor: false });
		this.setTile(randRow, randCol, firsttile);
		this.add(firsttile);
		firsttile.setCharacterHere(this.scene.player);
		console.log("should be one child there is ==" + this.getLength());
		for(var i = 0; i < this.maxTiles; i++) {
			var randTile = this.getChildren()[Math.floor(Math.random() * this.getLength())];
			var dir = Math.floor(Math.random() * 4);
			console.log("adding to child ");
			console.log(randTile);
			console.log("in direction " + dir);
			console.log("location of randTile is r:" + randTile.gridRow + " c: " + randTile.gridCol);
			switch(dir) {
				//north
				case 0:
					console.log("north add");
					if(randTile.gridRow > 0) {
						if(this.getTile(randTile.gridRow - 1, randTile.gridCol) == undefined) {
							console.log("adding tile at r:" + (randTile.gridRow - 1) + " c:" + randTile.gridCol);
							var tile = this.scene.add.existing(new EncounterTile(this.scene, randTile.gridRow - 1, randTile.gridCol)).setInteractive();
							this.setTile(randTile.gridRow - 1, randTile.gridCol, tile);
							this.add(tile);
						}
					}
					break;
				//east
				case 1:
					console.log("east add");
					if(randTile.gridCol < this.colCount) {
						if(this.getTile(randTile.gridRow, randTile.gridCol + 1) == undefined) {
							console.log("adding tile at r:" + randTile.gridRow + " c:" + (randTile.gridCol + 1));
							var tile = this.scene.add.existing(new EncounterTile(this.scene, randTile.gridRow, randTile.gridCol + 1)).setInteractive();
							this.setTile(randTile.gridRow, randTile.gridCol + 1, tile);
							this.add(tile);
						}
					}
					break;
				//south
				case 2:
					console.log("south add");
					if(randTile.gridRow < this.rowCount) {
						if(this.getTile(randTile.gridRow + 1, randTile.gridCol) == undefined) {
							console.log("adding tile at r:" + (randTile.gridRow + 1) + " c:" + randTile.gridCol);
							var tile = this.scene.add.existing(new EncounterTile(this.scene, randTile.gridRow + 1, randTile.gridCol)).setInteractive();
							this.setTile(randTile.gridRow + 1, randTile.gridCol, tile);
							this.add(tile);
						}
					}
					break;
				//west
				case 3:
					console.log("west add");
					if(randTile.gridCol > 0) {
						if(this.getTile(randTile.gridRow, randTile.gridCol - 1) == undefined) {
							console.log("adding tile at r:" + randTile.gridRow + " c:" + (randTile.gridCol - 1));
							var tile = this.scene.add.existing(new EncounterTile(this.scene, randTile.gridRow, randTile.gridCol - 1)).setInteractive();
							this.setTile(randTile.gridRow, randTile.gridCol - 1, tile);
							this.add(tile);
						}
					}
					break;
				default:

			}

		}
		this.setupTileControl();
	}

	setupTileControl() {
		this.children.iterate( function(child) {
			child.on('pointerdown', function(pointer) {
				console.log("pointer down on a tile");
				this.isDown = true;
			});
			child.on('pointerup', function(pointer) {
				console.log("pointer up on a tile");
				if(this.isDown) {
					console.log("pointer was down");
					if(this.reachableByCharacter(this.scene.player)) {
						this.scene.moveCharacter(this, true);
					} else {
						this.scene.moveCharacter(this, false);
					}
				}
			});
			child.on('pointerout', function(pointer) {
				this.isDown = false;
				console.log("moved cursor off tile");
			});
		});
	}

	getTile(row, col) {
		return this.board[(row * this.colCount) + col];
		// return this.board[row][col];
	}

	setTile(row, col, tile) {
		this.board[(row * this.colCount) + col] = tile;
	}

}
