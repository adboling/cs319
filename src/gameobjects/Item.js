export default class Item {
	name;
	type;
	cost;
	modifiers;
	use; // function( obj )
}

export const DamageType = {
	PHYSICAL: 'physical',
	SLASH: 'slash',
	CRUSH: 'crush',
	PIERCE: 'pierce',
	FIRE: 'fire',
	ICE: 'ice',
	DARK: 'dark',
	DEMON: 'demon'
}

export const Type = {
	//weapon types
	SWORD: 'sword',
	MACE: 'mace',
	CROSSBOW: 'crossbow',
	BOW: 'bow',
	SHIELD: 'shield',
	WAND: 'wand',
	STAFF: 'staff',
	// non weapon
	SHOES: 'shoes',
	PANTS: 'pants',
	GLOVES: 'gloves',
	SHIRT: 'shirt',
	HELMET: 'helmet',
	// consumables
	POTION: 'potion',
	FOOD: 'food',
	MONEY: 'gold'
}
