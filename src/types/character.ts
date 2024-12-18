import { UUID } from "./uuid";
import { MagicItem, Consumable } from "./items";

export type PlayerClass = {
  value: number;
  name: string;
  subclass: string;
};

export type Character = {
  uuid: UUID;
  name: string;
  editable: boolean;
  public: boolean;

  // TODO - types for artwork and token should be some kind of file type
  artwork: any;
  token: any;
  sheet: string;

  season: string;
  race: string;
  level: number;
  classes: PlayerClass[];

  items: MagicItem[];
  consumables: Consumable[];

  gold: number;
  downtime: number;
  ac: number;
  hp: number;
  pp: number;
  dc: number;
  init: number;
  vision: string;
  biography: string;
  dm_text: string;
};
