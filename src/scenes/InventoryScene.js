export default class InventoryScene extends Phaser.Scene {

	constructor() {
		super('InventoryScene');
	}

	init(data) {
		this.player = data.player;
		this.yOffset = data.y;
	}

	create(data) {
		if(this.player != null) {
			this.player = data.player;
		}
		if(this.yOffset != null) {
			this.yOffset = data.y;
		}
		this.container = this.add.container(0, this.yOffset);
		this.fillScene();

		var _this = this;
		let optionScene = this.scene.get('OptionsScene')
		optionScene.events.on('pause', function() {
			_this.scene.pause('InventoryScene');
		});
		optionScene.events.on('quit', function() {
			_this.scene.stop('InventoryScene');
		});
		optionScene.events.on('resume', function() {
			_this.scene.resume('InventoryScene');
		});
	}

	update() {
		this.fillScene();
	}

	fillScene() {
		if(this.container != null) {
			// for(var i = 0; i < this.container.children.length; i++) {
			// 	this.container.children[i].destory();
			// }
			this.container.removeAll();
		}
		var itemsList = [];
		console.log('items list size = ' + itemsList.length);
		var _this = this;
		var dynamicY = 0;
		for(var i = 0; i < this.player.inventory.weapons.length; i++) {
			let tempItem = this.add.text(0, dynamicY, this.player.inventory.weapons[i].name + " :: " + this.player.inventory.weapons[i].damageType);
			dynamicY += tempItem.displayHeight;
			itemsList.push(tempItem);
		}
		for(var i = 0; i < this.player.inventory.items.length; i++) {
			let tempItem = this.add.text(0, dynamicY, this.player.inventory.items[i].name + ':: Costs: ' + this.player.inventory.items[i].cost);
			dynamicY += tempItem.displayHeight;
			itemsList.push(tempItem);
		}
		if(itemsList.length < 1) {
			let tempItem = this.add.text(0, dynamicY, "No Items");
			dynamicY += tempItem.displayHeight;
			itemsList.push(tempItem);
		}
		this.container.add(itemsList);
		var maxWidth = 0;
		for(var i = 0; i < itemsList.length; i++) {
			maxWidth = itemsList[i].displayWidth > maxWidth ? itemsList[i].displayWidth : maxWidth;
		}
		this.container.setPosition(this.sys.game.config.width - (maxWidth + 5), this.yOffset);
	}
}
