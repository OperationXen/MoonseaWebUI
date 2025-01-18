import type { Rarity } from "./items";

export type DMServiceReward = {
  name: string;
  downtime: number;
  rewards: string[];
  rarity: Rarity;
  level: number;
  cost: number;
};
