export type Rarity = "common" | "uncommon" | "rare" | "veryrare" | "legendary"

export type Consumable = {
  uuid?: string,
  name: string,
  type: string,
  rarity: Rarity,
  description?: string,
	charges?: number,
}
