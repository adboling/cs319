import Encounter from '../gameobjects/Encounter.js'
import Item from '../gameobjects/Item.js'
import { Type, DamageType } from '../gameobjects/Item.js'

export default class ItemEncounter extends Encounter {
	constructor(difficulty, rarity) {
		super(difficulty);
		this.rarity = rarity;
		this.getRandItem(this.rarity);
	};

	addDisplayScreen = function ( player, scene ) {
		this.playerRef = player;
		this.scene = scene;
		var encounterScene = scene.add.container(5, 5);
		// encounterScene.depth = 0;

		var drawOn = encounterScene;
		console.log("encounter scene is :");
		// console.log(encounterScene);

		switch(this.item.type) {
			case Type.MONEY:
				console.log(drawOn);
				console.log(Type.MONEY);
				var _this = this;
				var content = scene.add.text(0, 0, 'You found ' + this.item.cost + ' gold.');
				var take = scene.add.text(0, 15, 'take money').setInteractive();
				take.input.cursor = 'pointer';
				take.on('pointerup', function () {
					_this.playerRef.inventory.currency += _this.item.cost;
					_this.remove();
				});
				var decline = scene.add.text(0, 30, 'decline money').setInteractive();
				decline.input.cursor = 'pointer';
				decline.on('pointerup', function () {
					_this.remove();
				});
				drawOn.add([content, take, decline]);
				break;
			case Type.SWORD:
				console.log(drawOn);
				console.log(Type.SWORD);
				var _this = this;
				var content = scene.add.text(0, 0, 'You found ' + this.item.damageType + 'ing ' + this.item.name + '.');
				var take = scene.add.text(0, 15, 'take ' + this.item.name).setInteractive();
				take.input.cursor = 'pointer';
				take.on('pointerup', function () {
					_this.playerRef.inventory.weapons.push(_this.item);
					_this.remove();
				});
				var decline = scene.add.text(0, 30, 'leave item').setInteractive();
				decline.input.cursor = 'pointer';
				decline.on('pointerup', function () {
					_this.remove();
				});
				drawOn.add([content, take, decline]);
				break;
			case Type.WAND:
				var _this = this;
				var content = scene.add.text(0, 0, 'You found ' + this.item.damageType + ' ' + this.item.name + '.');
				var take = scene.add.text(0, 15, 'take ' + this.item.name).setInteractive();
				take.input.cursor = 'pointer';
				take.on('pointerup', function () {
					_this.playerRef.inventory.weapons.push(_this.item);
					_this.remove();
				});
				var decline = scene.add.text(0, 30, 'leave item').setInteractive();
				decline.input.cursor = 'pointer';
				decline.on('pointerup', function () {
					_this.remove();
				});
				drawOn.add([content, take, decline]);
				break;
			default:
				var _this = this;
				var content = scene.add.text(0, 0, 'You found ' + this.item.name + '.');
				var take = scene.add.text(0, 15, 'take ' + this.item.name).setInteractive();
				take.input.cursor = 'pointer';
				take.on('pointerup', function () {
					_this.playerRef.inventory.weapons.push(_this.item);
					_this.remove();
				});
				var decline = scene.add.text(0, 30, 'leave item').setInteractive();
				decline.input.cursor = 'pointer';
				decline.on('pointerup', function () {
					_this.remove();
				});
				drawOn.add([content, take, decline]);
				break;
		}
	};

	remove() {
		this.encounterComplete = true;
		this.scene.scene.stop('EncounterScene');

		this.scene.board.updateMoveableTiles(this.playerRef);
		this.resumeGame(this.scene);
	}

	getRandItem(rarity) {
		var randNum = Math.floor(Math.random() * 100);
		if(randNum < 40) {
			console.log('rand item is gold');
			var goldCount = Math.floor(Math.random() * 10 * rarity);
			this.item = { name: 'gold', type: Type.MONEY,
			cost: goldCount }
		} else if(randNum < 75) {
			console.log('rand item is sword');
			this.item = { name: 'sword', type: Type.SWORD,
			cost: randNum + rarity,
			attack: randNum, damageType: DamageType.SLASH};
		} else {
			console.log('rand item is wand');
			this.item = { name: 'wand', type: Type.WAND,
			cost: randNum + rarity,
			attack: randNum, damageType: DamageType.ICE};
		}
	}

	getRandWeaponType() {
		Math.floor();
	}

	getRandDamageType( rarity ) {
		var randGen = Math.floor(Math.random() * 8);
		switch(randGen) {
			case 0:

		}
	}
}
