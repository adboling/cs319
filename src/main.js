// import scenes
import BootScene from '/src/scenes/BootScene.js';
import PreloadScene from '/src/scenes/PreloadScene.js';
import TitleScene from '/src/scenes/TitleScene.js';
import GameScene from '/src/scenes/GameScene.js';
import UIScene from '/src/scenes/UIScene.js';
import OptionsScene from '/src/scenes/OptionsScene.js';

// initialize scenes
var bootScene = new BootScene();
var preloadScene = new PreloadScene();
var titleScene = new TitleScene();
var gameScene = new GameScene();
var uiScene = new UIScene();
var optionsScene = new OptionsScene();

// game scene
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('BootScene', bootScene);
game.scene.add('PreloadScene', preloadScene);
game.scene.add('TitleScene', titleScene);
game.scene.add('GameScene', gameScene);
game.scene.add('UIScene', uiScene);
game.scene.add('OptionsScene', optionsScene);

// start game (boot > preload > title > game/settings/etc)
game.scene.start('BootScene');
