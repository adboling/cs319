import Encounter from '../gameobjects/Encounter.js'
import ItemEncounter from '../gameobjects/ItemEncounter.js'

export default class EncounterTile extends Phaser.GameObjects.Sprite {

	static initStaticVar() {
		EncounterTile.boardoffset = { x:0, y:50 };
		EncounterTile.tileSize = { xsize:64, ysize:64, xpad:5, ypad:5};
		EncounterTile.getmaxTileRows = function (width) {
			return Math.floor((width - EncounterTile.boardoffset.x) / (EncounterTile.tileSize.xsize + EncounterTile.tileSize.xpad)) - 1;
		}
		EncounterTile.getmaxTileCols = function (height) {
			return Math.floor((height - EncounterTile.boardoffset.y) / (EncounterTile.tileSize.ysize + EncounterTile.tileSize.ypad)) - 1;
		}
		EncounterTile.getRawx = function(col) {
			return (col * (EncounterTile.tileSize.xsize + EncounterTile.tileSize.xpad)) + EncounterTile.tileSize.xpad + EncounterTile.boardoffset.x;
		}
		EncounterTile.getRawy = function (row) {
			return (row * (EncounterTile.tileSize.ysize + EncounterTile.tileSize.ypad)) + EncounterTile.tileSize.ypad + EncounterTile.boardoffset.y;
		}
	}

	constructor (scene, gridr, gridc, depth)
    {
        super(scene);
		this.setOrigin(0,0);

		this.gridCol = gridc;
		this.gridRow = gridr;
		this.depth = depth;
		this.isDown = false;
		this.encounter = new ItemEncounter(2, 2);

        this.setTexture('tile');
        this.setPosition(EncounterTile.getRawx(this.gridCol), EncounterTile.getRawy(this.gridRow));
	}

	reachableByCharacter(player) {
		// console.log("reachableByCharacter function");
		return this.withinATile(player);
	}

	withinATile(sprite) {
		var outsideTile = this.spriteOutsideTile(sprite);
		// console.log("testing with in a tile outsideTile result::" + outsideTile);
		// console.log("tile:: x:" + this.x + " y:" + this.y);
		// console.log("sprite:: x:" + sprite.x + " y:" + sprite.y);
		if(outsideTile) {
			// console.log("outside current tile");
			if((sprite.x < (this.x + 2 * EncounterTile.tileSize.xsize + EncounterTile.tileSize.xpad) && sprite.x > (this.x - EncounterTile.tileSize.xsize - EncounterTile.tileSize.xpad)) && (sprite.y < (this.y + 2 * EncounterTile.tileSize.ysize + EncounterTile.tileSize.ypad) && sprite.y > (this.y - EncounterTile.tileSize.ysize - EncounterTile.tileSize.ypad))) {
				if(sprite.x == this.getCenterx() || sprite.y == this.getCentery()) {
					// console.log("within a tile");
					return true;
				}
			}
		}
		return false;
	}

	spriteOutsideTile(sprite) {
		console.log("testing if outside current tile");
		return (((sprite.x < this.x) || (sprite.x > (this.x + EncounterTile.tileSize.xsize))) || ((sprite.y < this.y) || (sprite.y > (this.y + EncounterTile.tileSize.ysize))));
	}

	getCenterx() {
		return EncounterTile.getRawx(this.gridCol) + (EncounterTile.tileSize.xsize/2);
	}

	getCentery() {
		return EncounterTile.getRawy(this.gridRow) + (EncounterTile.tileSize.ysize/2);
	}
	// moveCharacterHere(player, animate) {
	// 	this.scene.tweens.
	// 	player.destTile = this;
	// 	// player.setPosition(this.getCenterx(), this.getCentery());
	// }

	getEncounter() {
		return this.encounter;
	}

	setCharacterHere(player) {
		player.moveToLocation(this.getCenterx(), this.getCentery());
	}

	moveSpriteHere(sprite) {
		sprite.setPosition(this.getCenterx(), this.getCentery());
	}
}
