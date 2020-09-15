export default class quitsScene extends Phaser.Scene {

  constructor() {
    super('OptionsScene');
  }

  preload() {
    console.log("started options scene");
    this.events.emit('pause');
  }

  create() {
    var width = this.cameras.main.width;
		var height = this.cameras.main.height;

    var optionsBox = this.add.graphics();
    optionsBox.fillStyle(0x222222, 0.95);
    optionsBox.fillRect((width-(width*0.35))/2, (height-(height*0.7))/2, width*0.35, height*0.7);

    var closeButton = this.add.sprite((width/2)+123, (height/2)-192, 'button_gear');
    closeButton.setScale(1);
    closeButton.setInteractive({ useHandCursor: true });
		closeButton.on('pointerdown', () => this.closeOptions());
    closeButton.on('pointerover', function(pointer) {
			closeButton.setScale(1.1);
		});
		closeButton.on('pointerout', function(pointer) {
			closeButton.setScale(1);
		});

    var volumeBar = this.add.graphics();
    volumeBar.fillStyle(0xffffff, 0.7);
    volumeBar.fillRect((width/2)-100, (height/2)+100, 200, 4);

    var volumeSlider = this.add.sprite((width/2)+100, (height/2)+102, 'button_pause');
    volumeSlider.setScale(1);
    volumeSlider.setInteractive({ useHandCursor: true});
    //volumeSlider.on('pointerdown', startDrag(volumeSlider));

    var quitButton = this.add.sprite(width/2, height/2, 'button_quit');
		quitButton.setScale(1);
		quitButton.setInteractive({ useHandCursor: true });
		quitButton.on('pointerover', function(pointer) {
			quitButton.setScale(1.1);
		});
		quitButton.on('pointerout', function(pointer) {
			quitButton.setScale(1);
		});
		quitButton.on('pointerdown', () => this.quitButton());

    //add other buttons here

  }
/*
  startDrag(pointer, slider) {
    slider.off('pointerdown', this.startDrag(pointer, slider));
    slider.on('pointermove', this.doDrag(pointer, slider));
    slider.on('pointerup', this.stopDrag(pointer, slider));
  }

  doDrag(pointer, slider) {
    slider.x = pointer.x;
  }

  stopDrag(pointer, slider) {
    slider.on('pointerdown', this.startDrag(pointer, slider));
    slider.off('pointermove', this.doDrag(pointer, slider));
    slider.off('pointerup', this.stopDrag(pointer, slider));
  }
*/

  quitButton() {
		console.log("clicked quit");
    this.events.emit('quit');
    //this.scene.stop('GameScene');
    this.scene.start('TitleScene');
	}

  closeOptions() {
    console.log("closed options");
    this.events.emit('resume');
    //this.scene.resume('TitleScene');
    //this.scene.resume('GameScene');
    this.scene.stop();
  }
}
