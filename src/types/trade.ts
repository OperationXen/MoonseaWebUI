import type { UUID } from "./uuid";
import type { Rarity, MagicItem } from "./items";

export type Advert = {
  uuid: UUID;
  name: string;
  description: string;
  offers: any;
  item: MagicItem;
};

export type TradeOfferDirection = "in" | "out";

export type TradeOffer = {
  uuid: UUID;
  advert: Advert;
  datetime: Date;
  direction: TradeOfferDirection;
  description?: string;
  rarity: Rarity;
  item: MagicItem;
};
