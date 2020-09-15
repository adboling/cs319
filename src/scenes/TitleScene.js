export default class TitleScene extends Phaser.Scene {

	constructor() {
		super("TitleScene");
	}

	preload() {

	}

	create() {
		var _this = this;
		let optionsScene = this.scene.get('OptionsScene');
		optionsScene.events.on('pause', function() {
			_this.scene.pause();
		});
		optionsScene.events.on('resume', function() {
			_this.scene.resume();
		});

		var width = this.cameras.main.width;
		var height = this.cameras.main.height;

		var bg = this.add.sprite(0,0,'title_background');
		bg.setOrigin(0,0);
		bg.displayWidth = width;
		bg.displayHeight = height;

		var startButton = this.add.sprite(width*0.5,height*0.75, 'button_play');
		startButton.setScale(1.5);
		startButton.setInteractive({ useHandCursor: true });
		startButton.on('pointerover', function(pointer) {
			startButton.setScale(1.6);
		});
		startButton.on('pointerout', function(pointer) {
			startButton.setScale(1.5);
		});
		startButton.on('pointerdown', () => this.startButton());

		this.scene.launch('UIScene');

		//var optionText = this.add.text(100,200, 'Instructions');
		//optionText.setInteractive({ useHandCursor: true });
		//optionText.on('pointerdown', () => this.instructionButton());
	}

	startButton() {
		console.log("starting ...");
		this.scene.start('GameScene');
	}

	//instructionButton() {
	//	console.log("instructions ...");
	//	this.scene.start('InstructionScene');
	//}

}
