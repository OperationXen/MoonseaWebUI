export type Rarity = "common" | "uncommon" | "rare" | "veryrare" | "legendary"

export type Consumable = {
  uuid?: string,
  name: string,
  type: string,
  rarity: Rarity,
  description?: string,
	charges?: number,
  equipped: boolean,
}

export type MagicItem = {
  uuid: string,
  owner_uuid?: string,
  owner_name?: string, 
  name: string,
  rarity: Rarity,
  source_event_type?:string,
  attunement: boolean,
  equipped: boolean,
  market: boolean,
  description?: string,
  flavour?: string,  
}
