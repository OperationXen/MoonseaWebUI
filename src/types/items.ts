import type { UUID } from "./uuid";

export type Rarity = "common" | "uncommon" | "rare" | "veryrare" | "legendary";

export type ItemOrigin =
  | "game"
  | "dm_reward"
  | "trade"
  | "manual"
  | "bastion"
  | "event_reward";
export type ConsumableType = "potion" | "scroll" | "ammo" | "gear" | "other";

export type Consumable = {
  uuid: UUID;
  name: string;
  type: ConsumableType;
  rarity: Rarity;
  description?: string;
  charges?: number;
  equipped: boolean;
};

export type MagicItem = {
  // Common item elements
  uuid: UUID;
  editable: boolean;
  owner_uuid: string;
  owner_name: string;
  // mandatory
  name: string;
  rarity: Rarity;
  attunement: boolean;
  equipped: boolean;
  market: boolean;
  // optional
  rp_name?: string;
  minor_properties?: string;
  source_event_type?: ItemOrigin;
  datetime_obtained: Date;
  description?: string;
  flavour?: string;
  url?: string;
};
