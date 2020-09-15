export default class PreloadScene extends Phaser.Scene {

	constructor() {
		super('PreloadScene');
	}

	// Progress bar provided by an open tutorial by Zenva
	// https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
	preload() {

		// create progress bar
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);

		// create loading text
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		// create percent text
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		// create asset text
		var assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);

		// when something is loaded, update percent and bar
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);
		});

		// when a file is loaded, update asset text
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
			console.log('Loading asset: ' + file.key);
		});

		// destroy when complete
		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			console.log('Loading complete');
		});

		// load all assets here
		this.load.image('title_background', '/src/assets/backgrounds/title_background.png');
		// player assests
		this.load.image('player', 'src/assets/Adventurer/adventurer.png');
		this.load.spritesheet('adventurer', 'src/assets/Adventurer/adventurer-Sheet.png', { frameWidth: 50, frameHeight: 37, endFrame: 72 });

		//tile assets
		this.load.image('tile', 'src/assets/tile.png');
		this.load.spritesheet('coin', 'src/assets/coin.png', { frameWidth: 32, frameHeight: 32, endFrame: 6});

		//button assets
		this.load.image('button_play', 'src/assets/buttons/buttons_play.png');
		this.load.image('button_quit', 'src/assets/buttons/buttons_quit.png');
		this.load.image('button_volume', 'src/assets/buttons/buttons_volume.png');
		this.load.image('button_gear', 'src/assets/buttons/buttons_gear.png');
		this.load.image('button_pause', 'src/assets/buttons/buttons_pause.png');

		// temporary loop just to extend loading time for demo purposes
		for (var i = 0; i < 100; i++) {
			this.load.image('title_background'+i, '/src/assets/backgrounds/title_background.png');
		}
	}

	// when finished loading, display logo and shift to TitleScene
	create() {
		var logo = this.add.image(400, 300, 'logo');
		logo.alpha = 0;
		this.logotween = this.tweens.add({
			targets: logo,
			alpha: { from: 0, to: 1 },
			ease: 'Linear',
			delay: 750,
			duration: 1000,
			repeat: 0,
			hold: 2000,
			yoyo: true,
			completeDelay: 750,
			onCompleteScope: this,
			onComplete: function() { this.scene.start('TitleScene'); }
		});
	}

	/*
	// let user skip logo scene by clicking
	update() {
		if(this.input.activePointer.isDown) {
			this.logotween.stop;
			this.scene.start('TitleScene');
		}
	}
	*/

}
