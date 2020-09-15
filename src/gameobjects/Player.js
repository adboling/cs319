export default class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);
		this.destX = x;
		this.destY = y;
		this.xspeed = 1;
		this.yspeed = 1;

		this.inventory = { currency: 0, weapons: [], items: [] };
        this.setNoMovement();
        this.setPosition(x, y);
    }

	moveToLocation (x, y) {
		this.setPosition(x, y);
		this.destX = x;
		this.destY = y;
	}

	setDesiredLocation (x, y) {
		console.log("set desired location");
		this.destX = x;
		this.destY = y;
		if(this.destY != this.y || this.destX != this.x) {
			console.log("set animation");
			this.anims.play('run-adventurer');

		}
	}

	setLocationNOANIM(x, y) {
		console.log("set desired location no animation");
		this.destX = x;
		this.destY = y;
	}

	setNoMovement() {
		this.anims.stop();
		// this.anims.play('stand-adventurer');
		this.setTexture('adventurer', 0);
	}
}
