// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// load asset files for the game
gameScene.preload = function() {

  // load images
  this.load.image('sword', 'assets/8bitsword.PNG');
};

gameScene.init = function () {
  this.keyW = this.input.keyboard.addKey('W');
  this.keyA = this.input.keyboard.addKey('A');
  this.keyS = this.input.keyboard.addKey('S');
  this.keyD = this.input.keyboard.addKey('D');
  this.swordSpeed = 1;
  this.collided = false;
};

// create sprites - executed once, after assets are loaded
gameScene.create = function() {

  // sword image
  this.sword = this.add.sprite(80, this.sys.game.config.height / 2, 'sword');
  //this.sword2 = this.add.sprite(240, 10, 'sword');

  // change origin to the top-left of the sprite
  this.sword.setOrigin(0, 0);
  //this.sword2.setOrigin(0, 0);

  //scale down
  this.sword.setScale(0.25);
  //this.sword2.setScale(0.25);
};

gameScene.update = function() {

  // collision
  //if(Phaser.Geom.Intersects.RectangleToRectangle(this.sword.getBounds(), this.sword2.getBounds())) {
  //  this.collided = true;
  //}

  // check for active input and move sword
  if(this.keyW.isDown ) {
    this.sword.y -= this.swordSpeed;
  }

  if(this.keyA.isDown) {
    this.sword.x -= this.swordSpeed;
  }

  if(this.keyS.isDown) {
    this.sword.y += this.swordSpeed;
  }

  if(this.keyD.isDown) {
    this.sword.x += this.swordSpeed;
  }

  //this.collided = false;
};

// our game's configuration
let config = {
  type: Phaser.AUTO, //Let Phaser decide how to render (WebGL/Canvas)
  width: 480, // game width
  height: 480, // game height
  scene: gameScene // our new scene
}

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
