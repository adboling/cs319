export default class BootScene extends Phaser.Scene {

	constructor() {
		super('BootScene');
	}

	// preload logo for the preload scene
	preload() {
		this.load.image('logo', '/src/assets/logo.png');
	}

	// go to the preload scene when preload function is complete
	create() {
		this.scene.start("PreloadScene");
	}

}
