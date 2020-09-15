export default class EncounterScene extends Phaser.Scene {

	constructor() {
		super('EncounterScene');
	}

	init(data) {
		console.log('init encounter scene');
		this.encounter = data.encounter;
		this.playerRef = data.player;
		this.board = data.board;
	}

	create(data) {
		if(data.encounter != null) {
			this.encounter = data.encounter;
		}
		if(data.player != null) {
			this.playerRef = data.player;
		}
		if(data.board != null) {
			this.board = data.board;
		}
		this.board.children.iterate(function(child) {
			child.tint = 0x666666;
		});
		this.encounter.addDisplayScreen(this.playerRef, this);

		var _this = this;
		let optionScene = this.scene.get('OptionsScene')
		optionScene.events.on('pause', function() {
			_this.scene.pause('EncounterScene');
		});
		optionScene.events.on('quit', function() {
			_this.scene.stop('EncounterScene');
		});
		optionScene.events.on('resume', function() {
			_this.scene.resume('EncounterScene');
		});
	};


}
