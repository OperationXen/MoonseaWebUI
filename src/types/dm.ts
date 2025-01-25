import type { Rarity } from "./items";

export type DMServiceReward = {
  name: string;
  rewards: string[];
  rarity: Rarity;
  level: number;
  cost: number;
  gold?: number;
  downtime?: number;
};
