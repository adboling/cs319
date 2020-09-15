export default class Encounter extends Phaser.Scene {

	constructor(difficulty) {
		super();
		console.log(this);
		this.difficulty = difficulty;
		this.encounterComplete = false;
	};

	getRandEncounter = function(){};
	addDisplayScreen = function( player, scene ){};
	displayActive = function(){};

	resumeGame(scene) {
		scene.scene.resume('GameScene');
	}
}
