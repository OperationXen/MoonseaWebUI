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
  uuid: UUID;
  owner_uuid?: string;
  owner_name?: string;
  name: string;
  rarity: Rarity;
  source_event_type?: ItemOrigin;
  datetime_obtained: Date;
  attunement: boolean;
  equipped: boolean;
  market: boolean;
  description?: string;
  flavour?: string;
  image: string;
  editable: boolean;
};
