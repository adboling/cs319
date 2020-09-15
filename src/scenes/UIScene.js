export default class UIScene extends Phaser.Scene {

  constructor() {
    super('UIScene');
  }

  preload() {

  }

  create() {
    var width = this.cameras.main.width;
		var height = this.cameras.main.height;

    var optionButton = this.add.sprite(width-20, height-20, 'button_gear');
		optionButton.setScale(1.2);
		optionButton.setInteractive({ useHandCursor: true });
		optionButton.on('pointerover', function(pointer) {
			optionButton.setScale(1.35);
		});
		optionButton.on('pointerout', function(pointer) {
			optionButton.setScale(1.2);
		});
		optionButton.on('pointerdown', () => this.optionButton());

    //add other buttons here
    //dummy inventory button

  }

  optionButton() {
		console.log("clicked options");
    //this.scene.pause('TitleScene');
    //this.scene.pause('GameScene');
    this.scene.launch('OptionsScene');
	}
}
