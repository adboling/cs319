import Player from '../gameobjects/Player.js';
import EncounterTile from '../gameobjects/EncounterTile.js';
import EncounterScene from '../scenes/EncounterScene.js';
import Board from '../gameobjects/Board.js';
import InventoryScene from '../scenes/InventoryScene.js';

export default class GameScene extends Phaser.Scene {

	constructor() {
		super("GameScene");
		console.log("constructed gamescene");
	}

	init() {
		EncounterTile.initStaticVar();
	}

	create() {
		console.log("created game scene");

		var _this = this;
		let optionsScene = this.scene.get('OptionsScene');
		optionsScene.events.on('pause', function() {
			_this.scene.pause();
		});
		optionsScene.events.on('resume', function() {
			_this.scene.resume();
		});
		optionsScene.events.on('quit', function() {
			_this.scene.stop();
		});

		var frate = 20;
		var _this = this;

		// create animations
		this.anims.create({key:'idle-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 0, end: 3, first: 0}), frameRate: frate, repeat: -1});
		this.anims.create({key:'crouch-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 4, end: 7, first: 4}), frameRate: frate, repeat: -1});
		this.anims.create({key:'run-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 8, end: 13, first: 8}), frameRate: frate, repeat: -1});
		this.anims.create({key:'jump-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 14, end: 17, first: 14}), frameRate: frate, repeat: -1});
		this.anims.create({key:'somersault-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 18, end: 21, first: 18}), frameRate:frate, repeat: -1});
		this.anims.create({key:'fall-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 22, end: 23, first: 22}), frameRate: frate, repeat: -1});
		this.anims.create({key:'slide-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 24, end: 25, first: 24}), frameRate: frate, repeat: -1});
		this.anims.create({key:'stand-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 26, end: 28, first: 26}), frameRate: frate, repeat: -1});
		this.anims.create({key:'grad-corner-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 29, end: 31, first: 29}), frameRate:frate, repeat: -1});
		this.anims.create({key:'climb-corner-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 32, end: 36, first: 32}), frameRate:frate, repeat: -1});
		this.anims.create({key:'idle-sword-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 37, end: 40, first: 37}), frameRate:frate, repeat: -1});
		this.anims.create({key:'attack1-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 41, end: 45, first: 41}), frameRate:frate, repeat: -1});
		this.anims.create({key:'attack2-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 46, end: 51, first: 46}), frameRate:frate, repeat: -1});
		this.anims.create({key:'attack3-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 52, end: 57, first: 52}), frameRate:frate, repeat: -1});
		this.anims.create({key:'hurt-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 58, end: 60, first: 58}), frameRate:frate, repeat: -1});
		this.anims.create({key:'die-adventurer', frames: this.anims.generateFrameNumbers('adventurer', {start: 61, end: 69, first: 61}), frameRate:frate, repeat: -1});
		this.anims.create({key:'jump-corner', frames: this.anims.generateFrameNumbers('adventurer', {start: 70, end: 72, first: 70}), frameRate:frate, repeat: -1});
		this.anims.create({key:'coin-anim', frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 5, first: 0}), frameRate:10, repeat: -1});
		this.anims.create({key:'coin-anim-bk', frames: this.anims.generateFrameNumbers('coin-bk', {start: 0, end: 5, first: 0}), frameRate:10, repeat: -1});

		// initialize player
		this.player = this.add.existing(new Player(this, 200, this.sys.game.config.height / 2)).setInteractive();
		this.player.depth = 2;

		// create board which will initialize things
		// this.tiles = this.add.existing(new Board(this, EncounterTile.getmaxTileRows(this.sys.game.config.width), EncounterTile.getmaxTileCols(this.sys.game.config.height), 20));
		this.tiles = this.add.existing(new Board(this, 6, 6, 30));

		// create rotating coin icon
		this.coinIcon = this.add.sprite(0 , 0, 'coin', 0);
		this.coinIcon.setOrigin(0, 0);
		this.coinIcon.anims.play('coin-anim');

		// create coin counter
		this.coinCount = this.add.text(this.coinIcon.displayWidth, this.coinIcon.displayHeight / 2, ": " + this.player.inventory.currency);
		this.coinCount.align = 'left';
    	this.coinCount.boundsAlignH = 'left';
    	this.coinCount.boundsAlignV = 'middle';
		console.log("coin size width:: " + this.coinIcon.displayWidth + " height:: " + this.coinIcon.displayHeight);

		// create coin display container with coin icon and count
		this.coinDisplay = this.add.container(0, this.sys.game.config.height - this.coinIcon.displayHeight);
		this.coinDisplay.add([this.coinIcon, this.coinCount]);

		// create show inventory button
		this.showInventory = this.add.text(0, 0, 'Show Inventory').setInteractive();
		this.showInventory.input.cursor = 'pointer';
		this.showInventory.setPosition(this.sys.game.config.width - (this.showInventory.displayWidth + 5), 5);
		this.showInventory.setOrigin(0, 0);
		this.showInventory.on('pointerdown', function(pointer) {
			console.log("pointer down on showInventory");
			this.isDown = true;
		});
		this.showInventory.on('pointerup', function(pointer) {
			console.log("pointer up on showInventory");
			if(this.isDown) {
				console.log("pointer was down");
				if(_this.scene.isVisible('InventoryScene') && _this.scene.isActive('InventoryScene')) {
					_this.showInventory.setText('Show Inventory');
					_this.scene.stop('InventoryScene');
				} else {
					_this.showInventory.setText('Close Inventory');
					_this.scene.launch('InventoryScene', {y: (_this.showInventory.displayHeight + _this.showInventory.y), player: _this.player});
				}
			}
		});

		this.showInventory.on('pointerout', function(pointer) {
			this.isDown = false;
			console.log("moved cursor off showInventory");
		});
		this.showInventory.boundsAlignH = 'right';
		this.showInventory.align = 'right';
		this.showInventory.boundsAlignV = 'middle';

		this.tiles.updateMoveableTiles( this.player );
		this.scene.add('EncounterScene', new EncounterScene(), false, {});
		this.scene.add('InventoryScene', new InventoryScene(), false, {y: this.showInventory.displayHeight, player: this.player});
	}

	update() {
		// this.player.update();
		this.showInventory.setPosition(this.sys.game.config.width - (this.showInventory.displayWidth + 5), 5);
		this.updateCoinDisplay();
	}

	updateCoinDisplay() {
		this.coinCount.setText(": " + this.player.inventory.currency);
	}



	moveCharacter(tile, animate) {
		console.log("trying tween animation");
		// var tween x= this.add.tween(this.player).to({ x:tile.getCenterx(), y:tile.getCentery()}, 1000);
		if(animate)
			this.player.anims.play('run-adventurer');
		if(tile.getCenterx() < this.player.x) {
			this.player.flipX = true;
		} else {
			this.player.flipX = false;
		}
		var _this = this;
		this.tweens.add({
			targets: this.player,
			x: { from: this.player.x, to: tile.getCenterx() },
			y: { from: this.player.y, to: tile.getCentery() },
			ease: 'Linear',
			duration: 1000,
			onCompleteScope: this,
			onComplete: function () {
				console.log('complete tween');
				this.player.setNoMovement();
				this.tiles.updateMoveableTiles( this.player );
				if(!tile.encounter.encounterComplete){
					this.scene.launch('EncounterScene', {encounter: tile.encounter, player: this.player, board: this.tiles});
					this.scene.pause('GameScene');
				}
				// tile.reachedTile(this.player, _this);
				// _this.add
			}
		});
	}
}
